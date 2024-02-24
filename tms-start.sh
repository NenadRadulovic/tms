#!/bin/bash
echo ""
echo "Shutting down project"
echo ""
docker-compose down

echo ""
echo "Building the app"
echo ""
docker-compose up --build -d
echo ""
echo "Generating db tables"
echo ""
docker-compose exec app npm run prisma generate
docker-compose exec app npm run prisma migrate deploy
docker-compose exec app npx dotenv -e .env.test -- npm run prisma db push --accept-data-loss
docker-compose logs app -f
echo ""
echo "Done. TMS up and running"