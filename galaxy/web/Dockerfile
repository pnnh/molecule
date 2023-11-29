FROM node:21

EXPOSE 8400

ENV ENV production
ENV PORT 8400

WORKDIR /data

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

CMD ["node", "server.js"]
