require('dotenv').config();

export default {
  port: process.env.PORT,
  db: {
    url: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  secret_key: process.env.SECRET_KEY,
  time_life_token: '1d',
  app: {
    role: ['STUDENT', 'ADMIN'],
    paginate_options: {
      sort: { date: -1 },
      page: 1,
      limit: 10,
    },
    point_invite: 10,
  },

  docs_options: {
    apis: ['docs/common.yml', 'docs/**/*.yml'],
    swaggerDefinition: {
      openapi: '3.0.0',
      components: {},
      info: {
        title: 'Speed Reading',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://157.245.159.236:8080/api/v1/root',
          description: 'Production server',
        },
        {
          url: 'http://localhost:8080/api/v1/root',
          description: 'Dev server',
        },
      ],
    },
  },
};
