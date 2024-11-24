import { serialize } from "cookie";

export const handler = async (req, res) => {
  if (req.method === "POST") {
    const id = req.body;

    // Parse the existing cookie or initialize an empty array
    const existingCookie = req.cookies["json-cookie"];
    const jsonData = existingCookie ? JSON.parse(existingCookie) : [];

    // Add the new ID to the JSON array
    if (!jsonData.includes(id)) {
      jsonData.push(id);
    }

    // Serialize and set the updated cookie
    const serializedCookie = serialize(
      "json-cookie",
      JSON.stringify(jsonData),
      {
        httpOnly: false, // Client-side accessible for demonstration purposes
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      }
    );

    res.setHeader("Set-Cookie", serializedCookie);
    res.status(200).json({ message: "Cookie updated", data: jsonData });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
