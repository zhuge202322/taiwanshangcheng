# 萃活世家 - Ubuntu 22.04 一键部署

## 0. 前置准备

### A. 域名 DNS

把你的域名（例如 `shop.example.com`）的 A 记录指到服务器公网 IP。等 DNS 生效后再继续。

```bash
# 验证（在服务器或本地）
dig +short shop.example.com
# 应输出你的服务器 IP
```

### B. 服务器防火墙

开放 80 / 443 端口（22 用于 SSH）。

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

---

## 1. 装 Docker

```bash
# 一键脚本（官方）
curl -fsSL https://get.docker.com | sudo sh

# 让当前用户免 sudo 用 docker
sudo usermod -aG docker $USER
newgrp docker

# 验证
docker --version
docker compose version
```

---

## 2. 拉代码 / 解压项目

### 方法 A：从 GitHub 拉

```bash
cd /opt
sudo git clone https://github.com/你的账号/taiwanshangcheng.git
sudo chown -R $USER:$USER taiwanshangcheng
cd taiwanshangcheng
```

### 方法 B：scp 上传

```bash
# 在本地
scp -r d:/kehu/taiwanshangcheng user@服务器IP:/opt/

# 在服务器
sudo chown -R $USER:$USER /opt/taiwanshangcheng
cd /opt/taiwanshangcheng
```

---

## 3. 编辑环境变量

```bash
cp .env.example .env
nano .env
```

把这几项改成你的：

```env
DOMAIN=shop.example.com
CERTBOT_EMAIL=admin@yourmail.com
LETSENCRYPT_STAGING=0
FRONTEND_ORIGINS=https://shop.example.com
NEXT_PUBLIC_VENDURE_SHOP_API_URL=https://shop.example.com/shop-api

# 数据库密码强烈建议改：
DB_PASSWORD=改成你的强密码
COOKIE_SECRET=改成 32 位随机字符串
```

---

## 4. 一键启动

```bash
chmod +x deploy.sh
./deploy.sh
```

脚本会：
1. 把 nginx 配置里的占位 `DOMAIN_PLACEHOLDER` 替换为你的真实域名
2. `docker compose build` 构建前后端镜像
3. `docker compose up -d` 启动 4 个容器：postgres / backend / frontend / nginx
4. nginx-certbot 自动用 Let's Encrypt 签发 HTTPS 证书（首次约 30 秒）

---

## 5. 访问与验证

| 入口 | 地址 |
|---|---|
| 商店前台 | https://shop.example.com |
| 顾客中心 | https://shop.example.com/account |
| 商家后台 | https://shop.example.com/admin |
| Shop API | https://shop.example.com/shop-api |

后台默认账号：**superadmin / superadmin**（请立刻登入后改密码）

---

## 6. 首次数据初始化（如果是空数据库）

容器全跑起来后，再做一次性的数据导入：

```bash
# 进入 backend 容器
docker compose exec backend sh

# 在容器内：
npm run setup:shop        # 建运费 + 支付方式
npm run import:products   # 导入 15 个产品（如果你已经把产品 JSON 放进 backend/scripts/data 里）

exit
```

数据库与上传图像分别持久化到宿主机的：
- `./postgres-data/`
- `./backend/static/assets/`

下次 `docker compose down && up -d` 数据不会丢。

---

## 7. 日常运维命令

```bash
# 查看运行状态
docker compose ps

# 查看实时日志
docker compose logs -f
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx

# 重启某服务
docker compose restart backend

# 全部停止 / 重启
docker compose down
docker compose up -d

# 更新代码后重新部署
git pull
./deploy.sh
```

---

## 8. 备份

最重要的两份数据：
- `./postgres-data/`（订单 / 客户 / 商品全在里面）
- `./backend/static/assets/`（产品图）

简单 cron 备份示例：

```bash
# 加到 crontab -e
0 3 * * * tar -czf /backup/tsc-$(date +\%F).tgz -C /opt/taiwanshangcheng postgres-data backend/static/assets
```

---

## 9. 故障排查

### 证书一直签不出来
- DNS 没生效：`dig +short shop.example.com` 是否指到本机
- 80 端口被占用：`sudo lsof -i :80`
- 触发了 Let's Encrypt 速率限制：把 `.env` 的 `LETSENCRYPT_STAGING=1` 暂存调试，成功后改回 0 重新签

### 前端 502 Bad Gateway
- backend 还没起来：`docker compose logs backend` 看错误
- 数据库连不上：检查 `.env` 的 `DB_PASSWORD` 与首次启动时是否一致

### 前端可以打开但加购报跨域
- `.env` 的 `FRONTEND_ORIGINS` 与 `NEXT_PUBLIC_VENDURE_SHOP_API_URL` 是否都用同一个 `https://你的域名`
- 改完跑 `docker compose up -d --build` 重新构建前端

### 改了代码要重新部署
```bash
git pull
./deploy.sh
```

---

## 10. 资源占用（参考）

跑满 3 服务在 2C/4G Ubuntu 22.04 上：
- 内存：~ 1.2 GB
- 磁盘：~ 1.5 GB（首次镜像 build 完）
- CPU：空闲 < 3%
