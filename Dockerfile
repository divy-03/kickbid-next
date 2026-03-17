FROM oven/bun:1.3 AS base
WORKDIR /app

# Copy dependency files first
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy rest of project
COPY . .

# Generate Prisma client
RUN bunx --bun prisma generate

EXPOSE 3000

CMD ["bun", "run", "dev"]]
