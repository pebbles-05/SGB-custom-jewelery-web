"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { addAppwriteDocument } from "@/helpers/addAppwriteDocument";
import type { FilterOption } from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
import { deleteAppwriteDocument } from "@/helpers/deleteAppwriteDocument";
import { updateAppwriteDocument } from "@/helpers/updateAppwriteDocument";
import AdminListItem from "@/components/AdminListItem";
import useTypeList from "@/helpers/useTypeList";
import AdminTypeAddForm from "@/components/AdminTypeAddForm";
import WithAdminAuth from "@/components/WithAdminAuth";
import Link from "next/link";

const AdminType = () => {
  const [isAdminTypeFormOpen, setIsAdminTypeFormOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editItemId, setEditItemId] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Product>({});
  const {
    data: typeList,
    error: typeListError,
    isLoading: isTypeListLoading,
    refetch: typeListRefresh,
  } = useTypeList();

  const handleAddType = async (data: FilterOption) => {
    try {
      await addAppwriteDocument(process.env.NEXT_PUBLIC_TYPE_ID, {
        id: uuid4(),
        ...data,
      });
      setIsAdminTypeFormOpen(false);
      typeListRefresh();
    } catch (error) {
      console.log(error);
      setIsAdminTypeFormOpen(false);
      alert("You Faced an Error");
      typeListRefresh();
    }
  };
  const handleEditType = async (id: string, data: FilterOption) => {
    try {
      await updateAppwriteDocument(process.env.NEXT_PUBLIC_TYPE_ID, id, data);
      setIsAdminTypeFormOpen(false);
      setIsEditClicked(false);
      typeListRefresh();
    } catch (error) {
      setIsAdminTypeFormOpen(false);
      setIsEditClicked(false);
      alert("You Faced an Error");
      typeListRefresh();
    }
  };
  const handleDeleteType = async (id: string) => {
    try {
      await deleteAppwriteDocument(process.env.NEXT_PUBLIC_TYPE_ID, id);
      setIsAdminTypeFormOpen(false);
      typeListRefresh();
    } catch (error) {
      setIsAdminTypeFormOpen(false);
      alert("You Faced an Error");
      typeListRefresh();
    }
  };

  return (
    <div className="font-sans p-6 bg-gradient-to-t from-[#f8ede3] to-[#732717] min-h-screen flex flex-col">
      <div className="flex gap-4 items-center py-4 text-2xl text-custom-bg-light">
        <span>List of Types</span>
        <Link className="ml-auto underline" href="/admin/login">
          login
        </Link>
        <Link className="underline" href="/admin">
          Product
        </Link>
        <Link className="underline" href="/admin/category">
          Category
        </Link>
        <button
          className="rounded-lg px-4 py-2 bg-custom-bg-light text-custom-fg-light text-xl"
          onClick={() => {
            setEditFormData({});
            setIsAdminTypeFormOpen(true);
          }}
        >
          Add Type
        </button>
      </div>
      {typeListError ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Error happened
        </div>
      ) : isTypeListLoading ? (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {typeList?.length ? (
            typeList.map((type: Product) => {
              return (
                <AdminListItem
                  key={type.id}
                  name={type.name}
                  onDelete={() => handleDeleteType(type.$id)}
                  onEdit={() => {
                    setEditFormData(type);
                    setEditItemId(type?.$id);
                    setIsEditClicked(true);
                    setIsAdminTypeFormOpen(true);
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
        isOpen={isAdminTypeFormOpen}
        onClickOutside={() => {
          setIsEditClicked(false);
          setIsAdminTypeFormOpen(false);
        }}
      >
        <AdminTypeAddForm
          name={editFormData?.name}
          title={isEditClicked ? "Edit Type" : "Add Type"}
          buttonTitle={isEditClicked ? "Edit Type" : "Add Type"}
          onsubmit={(data) => {
            if (isEditClicked) {
              handleEditType(editItemId, data);
            } else {
              handleAddType(data);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default WithAdminAuth(AdminType);
