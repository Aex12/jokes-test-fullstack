FROM node:lts-slim AS frontend-deps
WORKDIR /app/frontend
COPY ./frontend/package*.json ./
RUN npm install

FROM node:lts-slim AS frontend-builder
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY ./frontend .
RUN npm run build

FROM node:lts-slim AS backend-deps
WORKDIR /app/backend
COPY ./backend/package*.json ./
RUN npm install

FROM node:lts-slim AS runner
WORKDIR /app/backend
ENV NODE_ENV production
COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist
COPY ./backend /app/backend
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs && \
    chown nodejs:nodejs /app/backend
USER nodejs:nodejs
CMD ["npm", "start"]
