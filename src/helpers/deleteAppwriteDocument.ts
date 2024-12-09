import { databases } from "@/helpers/appwrite"; // Reuse the existing instance from appwrite.ts
export async function deleteAppwriteDocument(
  collectionId: string,
  documentId: string
) {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your Database ID
      collectionId, // Collection ID passed as an argument
      documentId // Document ID to delete
    );
    console.log(`Document with ID ${documentId} deleted.`);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}
