import type { NextApiRequest, NextApiResponse } from "next";
import productData from "@/enums/productData.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API Handler Invoked"); // Log to check if the handler is called

  if (req.method === "GET") {
    res.status(200).json(productData);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
