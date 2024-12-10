import { databases } from "@/helpers/appwrite"; // Reuse the existing instance from appwrite.ts

export async function addAppwriteDocument(
  collectionId: string,
  data: Record<string, any>
) {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your Database ID
      collectionId, // Collection ID passed as an argument
      "unique()", // Unique ID (Appwrite generates one automatically)
      data // Data object to store in the document
    );
    return response;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}
