FROM node:21

EXPOSE 8100

ENV ENV production
ENV PORT 8100

WORKDIR /data

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

CMD ["node", "server.js"]
