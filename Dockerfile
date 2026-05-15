# ============== 前端 Next.js 构建 ==============
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 构建时不连后端：fetchProducts 失败会被 catch 返回 []，运行时 ISR 60s 会重取
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============== 运行时镜像 ==============
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next standalone 包含最小 node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# data 目录里有 reviews.json 等运行时读取的资源
COPY --from=builder /app/data ./data

EXPOSE 3000
CMD ["node", "server.js"]
