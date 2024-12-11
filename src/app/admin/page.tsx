"use client";
import React, { useState } from "react";
import AdminProductAddForm from "@/components/AdminProductAddForm";
import Modal from "@/components/Modal";
import useProductList from "@/helpers/useProductList";
import { addAppwriteDocument } from "@/helpers/addAppwriteDocument";
import type { Product } from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
import { deleteAppwriteDocument } from "@/helpers/deleteAppwriteDocument";
import { updateAppwriteDocument } from "@/helpers/updateAppwriteDocument";
import AdminListItem from "@/components/AdminListItem";

const AdminProduct = () => {
  const [isAdminProductFormOpen, setIsAdminProductFormOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editItemId, setEditItemId] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Product>({});
  const {
    data: productData,
    error: productDataError,
    isLoading: isProductDataLoading,
    refetch: productRefetch,
  } = useProductList();

  const handleAddProduct = async (data: Product) => {
    try {
      await addAppwriteDocument(process.env.NEXT_PUBLIC_PRODUCT_ID, {
        id: uuid4(),
        ...data,
      });
      setIsAdminProductFormOpen(false);
      productRefetch();
    } catch (error) {
      console.log(error);
      setIsAdminProductFormOpen(false);
      productRefetch();
    }
  };
  const handleEditProduct = async (id: string, data: Product) => {
    try {
      await updateAppwriteDocument(
        process.env.NEXT_PUBLIC_PRODUCT_ID,
        id,
        data
      );
      setIsAdminProductFormOpen(false);
      setIsEditClicked(false);
      productRefetch();
    } catch (error) {
      setIsAdminProductFormOpen(false);
      setIsEditClicked(false);
      productRefetch();
    }
  };
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteAppwriteDocument(process.env.NEXT_PUBLIC_PRODUCT_ID, id);
      setIsAdminProductFormOpen(false);
      productRefetch();
    } catch (error) {
      setIsAdminProductFormOpen(false);
      productRefetch();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-[#f8ede3] to-[#732717] min-h-screen flex flex-col">
      <div className="flex justify-between items-center py-4 text-2xl text-custom-bg-light">
        <span>List of Products</span>
        <button
          className="rounded-lg px-4 py-2 bg-custom-bg-light text-custom-fg-light text-xl"
          onClick={() => {
            setEditFormData({});
            setIsAdminProductFormOpen(true);
          }}
        >
          Add Products
        </button>
      </div>
      {productDataError ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Error happened
        </div>
      ) : isProductDataLoading ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {productData?.length ? (
            productData.map((product: Product) => {
              return (
                <AdminListItem
                  key={product.id}
                  src={product.img}
                  name={product.name}
                  onDelete={() => handleDeleteProduct(product.$id)}
                  onEdit={() => {
                    setEditFormData(product);
                    setEditItemId(product?.$id);
                    setIsEditClicked(true);
                    setIsAdminProductFormOpen(true);
                  }}
                />
              );
            })
          ) : (
            <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
              No Element Here
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isAdminProductFormOpen}
        onClickOutside={() => {
          setIsEditClicked(false);
          setIsAdminProductFormOpen(false);
        }}
      >
        <AdminProductAddForm
          img={editFormData?.img}
          relatedImages={editFormData?.relatedImages}
          name={editFormData?.name}
          description={editFormData?.description}
          date={editFormData?.date}
          price={editFormData?.price}
          type={editFormData?.type}
          category={editFormData?.category}
          order={editFormData?.order}
          availability={editFormData?.availability}
          title={isEditClicked ? "Edit item" : "Add Item"}
          buttonTitle={isEditClicked ? "Edit Item" : "Add item"}
          onsubmit={(data) => {
            if (isEditClicked) {
              handleEditProduct(editItemId, data);
            } else {
              handleAddProduct(data);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminProduct;
