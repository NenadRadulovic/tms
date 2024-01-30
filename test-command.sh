
    # - name: Generate Prisma Client
    #   id: prisma-client
    #  if: steps.docker-build.outcome == 'success'
    #   run: echo "docker-compose exec -it app npm run prisma migrate deploy"
    # - name: Generate test DB
    #   id: test-db
    #   if: steps.prisma-client.outcome == 'success'
    #   run: echo "docker-compose exec -it app npm run dotenv -e .env.test -- npm run prisma db push --accept-data-loss"
    # - name: Run tests
    #   if: steps.test-db.outcome == 'success'
    #   run: echo "docker-compose exec -it app npm run test"

echo ""
echo "Generate Prisma Client"
npm run prisma migrate deploy
echo ""
echo "Generate test DB"
npm run dotenv -e .env.test -- npm run prisma db push --accept-data-loss
echo ""
echo "Run tests"
npm run test