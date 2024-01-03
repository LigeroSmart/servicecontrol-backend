const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger.json'
const endpointsFiles = ['./src/route.ts']

swaggerAutogen(outputFile, endpointsFiles)