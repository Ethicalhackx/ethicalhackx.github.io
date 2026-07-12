# syntax=docker/dockerfile:1

# ---------- Build stage ----------
# Matches the project's engines requirement (Node >= 22.12.0) and .nvmrc.
FROM node:22-slim AS build
WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build the static site into /app/dist.
# NOTE: the build fetches remote image dimensions (e.g. Unsplash) over the
# network, so `docker build` needs internet access (enabled by default).
COPY . .
RUN npm run build

# ---------- Runtime stage ----------
# Tiny static web server that mirrors how the live site is hosted.
FROM nginx:1.27-alpine AS runtime

# Serve the generated static output.
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
