import type { NextApiRequest, NextApiResponse } from "next";
import categoryOption from "@/enums/categoryOption.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API Handler Invoked"); // Log to check if the handler is called

  if (req.method === "GET") {
    console.log("Returning Data:", categoryOption); // Log the data being returned
    res.status(200).json(categoryOption);
  } else {
    console.error(`Invalid Method: ${req.method}`); // Log invalid method calls
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
