# Kickbid

KickBid will allow students to register as players, be rated based on their skills, and participate in an auction in which captains bid to form their teams. The platform provides real-time updates, team statistics, and tournament schedules, enhancing the experience for both players and spectators. It also offers an admin dashboard for managing events and ratings.

## Steps to setup

### Clone Repo

Clone this repo and install dependencies

```
git clone https://github.com/divy-03/kickbid-next
cd kickbid-next
bun install
```

### Set env variables

copy and set environment variables in .env

```
cp .env.example .env
```

### Connect to database

use docker compose to start a postgres server

```
docker compose up -d
```

### Setup database & generate Prisma client

```
bunx --bun prisma migrate dev
```
