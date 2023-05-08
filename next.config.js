/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

const accessSecretVersion = require("./src/pages/api/getSecrets.ts");

module.exports = async () => {
  const secretValue = await accessSecretVersion("hubspot");

  return {
    env: {
      SECRET_NAME: secretValue,
    },
  };
};
