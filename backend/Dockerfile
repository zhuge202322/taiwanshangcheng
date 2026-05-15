# ============== Vendure 后端构建 ==============
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npx tsc

# ============== 运行时 ==============
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache tini
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
# scripts 与 static 默认通过 volume 挂载在外部，这里也复制一份兜底
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/static ./static

EXPOSE 7010
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/index.js"]
