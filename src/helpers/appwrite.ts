import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
