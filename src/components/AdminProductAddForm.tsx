import isValidLink from "@/helpers/isValidLink";
import useCategoryList from "@/helpers/useCategoryList";
import useTypeList from "@/helpers/useTypeList";
import { FilterOption } from "@/interface/interfaces";
import React, { useEffect, useState } from "react";

const AdminProductAddForm = ({
  img = "",
  relatedImages = [],
  name = "",
  description = "",
  date = "",
  price = 0,
  type = "",
  category = "",
  order = 0,
  availability = true,
  buttonTitle = "Add Item",
  title = "Add item",
  onsubmit,
}) => {
  const {
    data: categoryList,
    error: CategoryError,
    isLoading: isCategoryLoading,
  } = useCategoryList();
  const {
    data: typeList,
    error: typeError,
    isLoading: isTypeLoading,
  } = useTypeList();
  const [formRelatedImages, setFormRelatedImages] = useState(relatedImages);
  const [formData, setFormData] = useState({
    img: img,
    relatedImages: relatedImages,
    name: name,
    description: description,
    date: date,
    price: price,
    type: type,
    category: category,
    order: order,
    availability: availability,
  });
  useEffect(() => {
    setFormData({
      img: img,
      relatedImages: relatedImages,
      name: name,
      description: description,
      date: date,
      price: price,
      type: typeList?.length && typeList[0].name,
      category: categoryList?.length && categoryList[0].name,
      order: order,
      availability: availability,
    });
  }, [isCategoryLoading, isTypeLoading]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("relatedImages")) {
      const index = parseInt(name.replace("relatedImages", ""), 10);
      const updatedImages = [...formRelatedImages];
      updatedImages[index] = value;
      setFormRelatedImages(updatedImages);
      setFormData({
        ...formData,
        relatedImages: updatedImages,
      });

      return;
    }
    setFormData({
      ...formData,
      [name]: name === "price" || name === "order" ? Number(value) : value,
    });
  };
  const handleSubmit = () => {
    const filteredImages = formRelatedImages?.length
      ? formRelatedImages?.filter((img) => img.trim() !== "")
      : [];
    onsubmit({ ...formData, relatedImages: filteredImages });
  };
  if (
    CategoryError ||
    typeError ||
    !typeList?.length ||
    !categoryList?.length
  ) {
    return (
      <div className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-[60vw] h-[80vh] overflow-auto max-w-4xl text-4xl flex items-center justify-center">
        Error happened
      </div>
    );
  } else if (isTypeLoading && isCategoryLoading) {
    return (
      <div className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-[60vw] h-[80vh] overflow-auto max-w-4xl text-4xl flex items-center justify-center">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-[60vw] h-[80vh] overflow-auto max-w-4xl">
        <h1 className="text-xl font-bold mb-4 text-[#732717]">{title}</h1>
        <div>
          <label className="block font-semibold text-[#732717]">
            Image URL
          </label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
          />
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">
            Related Images
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="relatedImages0"
              value={formRelatedImages[0] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            />
            <input
              type="text"
              name="relatedImages1"
              value={formRelatedImages[1] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            />
            <input
              type="text"
              name="relatedImages2"
              value={formRelatedImages[2] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
          />
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          />
        </div>
        <div>
          <label className="block font-semibold text-[#f8ede3]">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          />
        </div>
        {typeList?.length && (
          <div>
            <label className="block font-semibold text-[#f8ede3]">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
            >
              {typeList?.map((type: FilterOption) => {
                return (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {categoryList?.length && (
          <div>
            <label className="block font-semibold text-[#f8ede3]">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
            >
              {categoryList?.map((category: FilterOption) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div>
          <label className="block font-semibold text-[#f8ede3]">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          />
        </div>
        <div>
          <label className="block text-[#f8ede3] font-semibold focus:ring-[#f8ede3]">
            Availability
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={(e) =>
              setFormData({
                ...formData,
                availability: e.target.value === "true",
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            !formData?.description ||
            !formData?.img ||
            !formData?.date ||
            !formData?.name ||
            !parseInt(formData?.price) ||
            !formData?.relatedImages?.some(
              (img) => img !== "" && isValidLink(img)
            )
          }
          className={`w-full text-white py-2 rounded-md ${
            !formData?.description ||
            !formData?.img ||
            !formData?.date ||
            !formData?.name ||
            !parseInt(formData?.price) ||
            !formData?.relatedImages?.some(
              (img) => img !== "" && isValidLink(img)
            )
              ? "bg-custom-black/30"
              : "bg-green-500"
          }`}
        >
          {buttonTitle}
        </button>
      </div>
    );
  }
};

export default AdminProductAddForm;
