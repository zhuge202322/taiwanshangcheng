#!/usr/bin/env bash
set -euo pipefail

# 一键部署 / 更新脚本（在服务器项目目录下运行）
# 用法:  ./deploy.sh

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "✗ 未找到 .env，请先：cp .env.example .env  然后编辑 DOMAIN/CERTBOT_EMAIL 等"
  exit 1
fi

# 读取 DOMAIN
source .env
: "${DOMAIN:?DOMAIN 未在 .env 中设置}"
: "${CERTBOT_EMAIL:?CERTBOT_EMAIL 未在 .env 中设置}"

echo "==> 生成 nginx 配置（DOMAIN=$DOMAIN）"
mkdir -p nginx/user_conf.d
sed "s|DOMAIN_PLACEHOLDER|$DOMAIN|g" nginx/site.conf.template > nginx/user_conf.d/site.conf

echo "==> git pull (如果是仓库)"
if [ -d .git ]; then
  git pull --ff-only || true
fi

echo "==> docker compose build"
docker compose build

echo "==> docker compose up -d"
docker compose up -d

echo
echo "✓ 部署完成。等待 ~30 秒首次签发证书，然后访问： https://$DOMAIN"
echo "✓ 后台： https://$DOMAIN/admin   （superadmin / superadmin）"
echo
echo "查看日志:  docker compose logs -f"
echo "重启服务:  docker compose restart"
echo "停止服务:  docker compose down"
