FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run typecheck

CMD ["npm", "test"]
