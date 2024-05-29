# Step 1: 使用Node.js官方镜像作为构建阶段的基础镜像
FROM node:18-alpine as builder


# 复制项目文件到工作目录
COPY . .

# 设置工作目录
WORKDIR ./

# 复制package.json和package-lock.json文件
# COPY package*.json ./

# 安装项目依赖
RUN npm install



# 构建应用
RUN npm run build

# Step 2: 使用Node.js官方镜像作为运行阶段的基础镜像
FROM node:18-alpine as runner

WORKDIR /app

# 从构建阶段复制构建好的文件到工作目录
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 指定运行时的环境变量
ENV NODE_ENV production

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["npm", "start"]
