echo ""
echo "Generate Prisma Client"
npm run prisma migrate deploy
echo ""
echo "Generate test DB"
npm run dotenv -e .env.test -- npm run prisma db push --accept-data-loss
echo ""
echo "Run tests"
npm run test