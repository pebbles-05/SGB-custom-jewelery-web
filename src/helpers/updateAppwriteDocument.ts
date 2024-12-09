import { databases } from "@/helpers/appwrite"; // Reuse the existing instance from appwrite.ts
export async function updateAppwriteDocument(
  collectionId: string,
  documentId: string,
  updatedData: Record<string, any>
) {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your Database ID
      collectionId, // Collection ID passed as an argument
      documentId, // Document ID to update
      updatedData // Object with updated data
    );
    console.log("Document updated:", response);
    return response;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}
