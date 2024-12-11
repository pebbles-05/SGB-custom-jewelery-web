export default function isValidLink(link) {
  try {
    new URL(link); // Try creating a URL object
    return true; // If no error is thrown, the link is valid
  } catch (error) {
    return false; // If an error is thrown, the link is invalid
  }
}
