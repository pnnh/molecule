FROM node:21

ENV NODE_ENV production

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

CMD ["node", "server.js"]
