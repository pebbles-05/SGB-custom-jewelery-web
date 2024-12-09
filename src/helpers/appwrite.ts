import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT) // Use environment variable
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Use environment variable

const databases = new Databases(client);

export { client, databases };
