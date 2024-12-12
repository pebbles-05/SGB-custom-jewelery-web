"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { addAppwriteDocument } from "@/helpers/addAppwriteDocument";
import type { FilterOption } from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
import { deleteAppwriteDocument } from "@/helpers/deleteAppwriteDocument";
import { updateAppwriteDocument } from "@/helpers/updateAppwriteDocument";
import AdminListItem from "@/components/AdminListItem";
import useCategoryList from "@/helpers/useCategoryList";
import AdminCategoryAddForm from "@/components/AdminCategoryAddForm";
import WithAdminAuth from "@/components/WithAdminAuth";
import Link from "next/link";
const AdminCategory = () => {
  const [isAdminCategoryFormOpen, setIsAdminCategoryFormOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editItemId, setEditItemId] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Product>({});
  const {
    data: categoryList,
    error: categoryListError,
    isLoading: isCategoryListLoading,
    refetch: categoryListRefresh,
  } = useCategoryList();

  const handleAddCategory = async (data: FilterOption) => {
    try {
      await addAppwriteDocument(process.env.NEXT_PUBLIC_CATEGORY_ID, {
        id: uuid4(),
        ...data,
      });
      setIsAdminCategoryFormOpen(false);
      categoryListRefresh();
    } catch (error) {
      console.log(error);
      setIsAdminCategoryFormOpen(false);
      alert("You Faced an Error");
      categoryListRefresh();
    }
  };
  const handleEditCategory = async (id: string, data: FilterOption) => {
    try {
      await updateAppwriteDocument(
        process.env.NEXT_PUBLIC_CATEGORY_ID,
        id,
        data
      );
      setIsAdminCategoryFormOpen(false);
      setIsEditClicked(false);
      categoryListRefresh();
    } catch (error) {
      setIsAdminCategoryFormOpen(false);
      setIsEditClicked(false);
      alert("You Faced an Error");
      categoryListRefresh();
    }
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteAppwriteDocument(process.env.NEXT_PUBLIC_CATEGORY_ID, id);
      setIsAdminCategoryFormOpen(false);
      categoryListRefresh();
    } catch (error) {
      setIsAdminCategoryFormOpen(false);
      alert("You Faced an Error");
      categoryListRefresh();
    }
  };

  return (
    <div className="font-sans p-6 bg-gradient-to-t from-[#f8ede3] to-[#732717] min-h-screen flex flex-col">
      <div className="flex gap-4 items-center py-4 text-2xl text-custom-bg-light">
        <span>List of Categories</span>
        <Link className="ml-auto underline" href="/admin/login">
          login
        </Link>
        <Link className="underline" href="/admin">
          Product
        </Link>
        <Link className="underline" href="/admin/type">
          Type
        </Link>
        <button
          className="rounded-lg px-4 py-2 bg-custom-bg-light text-custom-fg-light text-xl"
          onClick={() => {
            setEditFormData({});
            setIsAdminCategoryFormOpen(true);
          }}
        >
          Add Category
        </button>
      </div>
      {categoryListError ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Error happened
        </div>
      ) : isCategoryListLoading ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {categoryList?.length ? (
            categoryList.map((category: Product) => {
              return (
                <AdminListItem
                  key={category.id}
                  src={category.img}
                  name={category.name}
                  onDelete={() => handleDeleteCategory(category.$id)}
                  onEdit={() => {
                    setEditFormData(category);
                    setEditItemId(category?.$id);
                    setIsEditClicked(true);
                    setIsAdminCategoryFormOpen(true);
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
        isOpen={isAdminCategoryFormOpen}
        onClickOutside={() => {
          setIsEditClicked(false);
          setIsAdminCategoryFormOpen(false);
        }}
      >
        <AdminCategoryAddForm
          img={editFormData?.img}
          name={editFormData?.name}
          description={editFormData?.description}
          targetOrderCount={editFormData?.targetOrderCount}
          title={isEditClicked ? "Edit Category" : "Add Category"}
          buttonTitle={isEditClicked ? "Edit Category" : "Add Category"}
          onsubmit={(data) => {
            if (isEditClicked) {
              handleEditCategory(editItemId, data);
            } else {
              handleAddCategory(data);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default WithAdminAuth(AdminCategory);
