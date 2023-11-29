FROM node

ENV NODE_ENV production
ENV PORT 8100

# 指定RUN工作目录
WORKDIR /opt

# 拷贝程序
COPY . /opt

CMD ["npm", "run", "start"]