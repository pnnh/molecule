FROM node:21

EXPOSE 8000

ENV NODE_ENV production
ENV PORT 8000

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

CMD ["node", "server.js"]
