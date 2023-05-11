import { string } from "yup";

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const dotenv = require("dotenv");

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
dotenv.config();

async function accessSecretVersion(secretName) {
  const client = new SecretManagerServiceClient({
    keyFilename: credentialsPath,
  });
  const projectId = "mgiukglobalservices";
  const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;

  const [version] = await client.accessSecretVersion({ name });

  return version.payload.data?.toString("utf8") || "";
}

module.exports = accessSecretVersion;

//resolvle the secretname
