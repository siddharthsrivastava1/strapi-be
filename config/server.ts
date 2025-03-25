module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", [
      "K39xlpgF87tM6YUWZKfkuQ==",
      "SR/NRh9ipd/PSjp1+z1PMw==",
      "A/IYsXlwdHxgsZC0mybbZw==",
      "n5WMR869BGwreuU6L8XIPw==",
    ]),
  },
});
