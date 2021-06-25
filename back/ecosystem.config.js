module.exports = {
  apps: [
    {
      script: 'build/src/index.js',
      watch: '.',
      name: 'gestion-stock',
      env: {
        NODE_ENV: 'production',
        GSTOCK_PORT: 4444,
        GSTOCK_MONGO_URL: 'mongodb://MW35:27017/gestion-stock',
      },
      env_tutu: {
        NODE_ENV: 'production',
        GSTOCK_PORT: 5555,
        GSTOCK_MONGO_URL: 'mongodb://MW35:27017/gestion-stock',
      },
    },
  ],
};
