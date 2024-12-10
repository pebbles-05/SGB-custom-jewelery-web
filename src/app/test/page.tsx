"use client";
import { addAppwriteDocument } from "@/helpers/addAppwriteDocument";
import { databases } from "@/helpers/appwrite";
import { deleteAppwriteDocument } from "@/helpers/deleteAppwriteDocument";
import { updateAppwriteDocument } from "@/helpers/updateAppwriteDocument";
import useBestSellerList from "@/helpers/useBestSellerList";
import useCartList from "@/helpers/useCartList";
import useCategoryList from "@/helpers/useCategoryList";
import useProductList from "@/helpers/useProductList";
import useTypeList from "@/helpers/useTypeList";
import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

const test = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID, // Replace with your Database ID
          process.env.NEXT_PUBLIC_PRODUCT_ID
        );
        console.log("Products fetched:", response.documents);
        setdata(response.documents);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    }
    fetchProducts();
    console.log({ databaseid: process.env.PRODUCT_ID });
  }, []);
  const addProduct = async () => {
    await addAppwriteDocument(process.env.NEXT_PUBLIC_PRODUCT_ID, {
      id: uuid4(),
      img: "https://picsum.photos/id/233/200",
      relatedimages: [
        "https://picsum.photos/id/233/200",
        "https://picsum.photos/id/23/200",
        "https://picsum.photos/id/24/200",
      ],
      name: "vintage stud earring",
      description: "elegant stud earrings with a vintage touch.",
      date: "5/11/2024",
      price: 200,
      type: "cloth",
      category: "set",
      order: 97,
      availability: true,
    });
  };
  const removeProduct = (id) => {
    deleteAppwriteDocument(process.env.NEXT_PUBLIC_PRODUCT_ID, id);
  };
  const updateProduct = (id) => {
    updateAppwriteDocument(process.env.NEXT_PUBLIC_PRODUCT_ID, id, {
      name: "test update",
    });
  };
  return (
    <div>
      <button onClick={addProduct}>Add product</button>
      {data.map((item) => {
        return (
          <div key={item.$id}>
            {item.name}
            <button onClick={() => removeProduct(item.$id)}>delete</button>
            <button onClick={() => updateProduct(item.$id)}>update</button>
          </div>
        );
      })}
    </div>
  );
};

export default test;
