import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['../routes/*.ts'];

const config = {
  info: {
    title: 'Radullager',
    description: 'The future is here!!!',
  },
  tags: [],
  host: 'localhost:5000',
  schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);
