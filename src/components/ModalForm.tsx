

import React, { useEffect, useState} from "react";

interface Product {
  name: string;
  price: number;
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSubmit: (emailData: string) => void;
  links:"";
  type: "";
  catagory: "";
  desc: "";
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, products,type="",catagory="",desc="",links="", onSubmit,setSubmissionMessage,SubmissionMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pinCode: "",
    district: "",
    state: "",
    email: "",
    facebook: "",
    instagram: "",
  });



  const totalPrice = products?.reduce((acc, product) => acc + product.price, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePinCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinCode = e.target.value;
    setFormData({ ...formData, pinCode });

    if (pinCode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = await response.json();
        if (data[0].Status === "Success") {
          const district = data[0].PostOffice[0].District;
          const state = data[0].PostOffice[0].State;
          setFormData({ ...formData, pinCode, district, state });
        }
      } catch (error) {
        console.error("Failed to fetch district/state from pin code", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.pinCode || !formData.district || !formData.state) {
      alert("Please fill all the required fields.");
      return;
    }

    const emailData = `
      ${products? `Order Details:
      Selected Products:
      ${products.map((p) => `${p.name}: ₹${p.price}`).join("\n")}
      
      Total: ₹${totalPrice}`:`Customization Summary:
      Type: ${type}
      Category: ${catagory}
      ${desc&&`Description: 
      ${desc}`}
      ${links&&`Links: 
      ${links}`}`}
      
      Customer Info:
      Name: ${formData.name}
      Phone: +91${formData.phone}
      Address: ${formData.address}
      Pin Code: ${formData.pinCode}
      District: ${formData.district}
      State: ${formData.state}
      
      Other Contact Info:
      Email: ${formData.email || "N/A"}
      Facebook: ${formData.facebook || "N/A"}
      Instagram: ${formData.instagram || "N/A"}
      
      Thank you for shopping with us!
    `;

    onSubmit(emailData);
    setSubmissionMessage("You will be contacted shortly. Thank you and keep shopping!");
  };
  const handleReset = () => {
    setFormData({
        name: "",
        phone: "",
        address: "",
        pinCode: "",
        district: "",
        state: "",
        email: "",
        facebook: "",
        instagram: "",
      })
  };
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-custom-bg-light text-lg text-custom-black rounded-lg overflow-auto w-lg h-4/6">
    //   <div className="bg-white bg-opacity-20 rounded-xl p-6 shadow-xl backdrop-blur-lg max-w-lg w-full text-black relative min-h-36">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-custom-bg-light  rounded-xl p-6 shadow-xl backdrop-blur-lg max-w-lg w-full text-black relative min-h-36">
        <div className="mb-5">
      <button type="button" onClick={handleReset} className="w-2/6 h-1/2 rounded-lg bg-custom-fg-light hover:bg-custom-bg-light border-2 border-custom-fg-light text-custom-white hover:text-custom-fg-light">Reset Form</button>
        <button
          className="absolute top-3 right-3 text-custom-bg-light text-lg font-bold bg-custom-fg-light rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        </div>
        {SubmissionMessage ? (
          <div className="text-center py-8">
            <p className="text-xl text-custom-fg-light font-bold">{SubmissionMessage}</p>
          </div>
        ) : (
          <>
          {products?(
          <div>
            <h2 className="text-xl font-semibold mb-4 text-custom-fg-light">Order Summary</h2>
            <ul className="mb-4">
              {products.map((product, index) => (
                <li key={index} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>₹{product.price}</span>
                </li>
              ))}
            </ul>
            <p className="mb-4">Total: ₹{totalPrice} + *delivery charges will be added if required and will be discussed</p>
            </div>):
          (<div>
            <h2 className="text-xl font-semibold mb-4 text-custom-fg-light">Customization Summary</h2>
            <ul className="mb-4">
            
              <li className="flex justify-between">
                <span>Catagory :</span>
                <span>{catagory}</span>
              </li>
              <li className="flex justify-between">
                <span>Material :</span>
                <span>{type}</span>
              </li>
              </ul>
              {desc?(<div>
                <h2 className="text-lg font-semibold mb-2 text-custom-fg-light">Description</h2>
                <span>{desc}</span></div>):null}
              {links?(<div>
                <h2 className="text-lg font-semibold mb-2 text-custom-fg-light">Links</h2>
                <span>{links}</span></div>):null}
              </div>

          )
          
          }

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto p-10 font-sans border-2 border-gray-500">
              <h3 className="text-lg text-custom-fg-light font-semibold">Please provide the info for further order processing:</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                maxLength={10}
                pattern="\d{10}"
                title="Enter a valid 10-digit phone number"
                required
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                required
              />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handlePinCodeChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                maxLength={6}
                required
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
                required
              />

              <h4 className="text-lg text-custom-fg-light font-semibold mt-6">Other Contact Info</h4>
              <input
                type="email"
                name="email"
                placeholder="Email ID (optional)"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
              />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook Profile Link (optional)"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram Profile Link (optional)"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-black rounded-md text-black"
              />

              <button
                type="submit"
                className="w-1/4 mx-auto py-2 rounded-lg bg-custom-fg-light hover:bg-custom-bg-light border-2 border-custom-fg-light text-custom-white hover:text-custom-fg-light"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalForm;
