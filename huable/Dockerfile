FROM node:21

ENV NODE_ENV production
ENV PORT 8800

# 指定RUN工作目录
WORKDIR /data

# 拷贝程序
COPY . /data

CMD ["npm", "run", "start"]