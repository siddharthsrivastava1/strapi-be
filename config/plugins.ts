module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "DdcoH8pZwsM7fOP+4SOfYQ=="),
    },
  },
});
