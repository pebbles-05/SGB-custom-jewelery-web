import type { NextApiRequest, NextApiResponse } from "next";
import categoryFilterOption from "@/enums/categoryFilterOption.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API Handler Invoked"); // Log to check if the handler is called

  if (req.method === "GET") {
    console.log("Returning Data:", categoryFilterOption); // Log the data being returned
    res.status(200).json(categoryFilterOption);
  } else {
    console.error(`Invalid Method: ${req.method}`); // Log invalid method calls
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
