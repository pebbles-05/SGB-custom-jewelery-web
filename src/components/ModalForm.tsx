// import React, { useEffect, useState } from "react";

// interface Product {
//   name: string;
//   price: number;
// }

// interface ModalFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   products: Product[];
//   onSubmit: (emailData: string) => void;
// }

// const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, products, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     pinCode: "",
//     district: "",
//     state: "",
//     email: "",
//     facebook: "",
//     instagram: "",
//   });

//   const [submissionMessage, setSubmissionMessage] = useState("");

//   const totalPrice = products.reduce((acc, product) => acc + product.price, 0) ;

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [isOpen]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePinCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const pinCode = e.target.value;
//     setFormData({ ...formData, pinCode });

//     if (pinCode.length === 6) {
//       try {
//         const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
//         const data = await response.json();
//         if (data[0].Status === "Success") {
//           const district = data[0].PostOffice[0].District;
//           const state = data[0].PostOffice[0].State;
//           setFormData({ ...formData, pinCode, district, state });
//         }
//       } catch (error) {
//         console.error("Failed to fetch district/state from pin code", error);
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.address || !formData.pinCode || !formData.district || !formData.state) {
//       alert("Please fill all the required fields.");
//       return;
//     }

//     const emailData = `
//       Order Details:
//       Selected Products:
//       ${products.map((p) => `${p.name}: ₹${p.price}`).join("\n")}
      
//       Total: ₹${totalPrice} 
      
//       Customer Info:
//       Name: ${formData.name}
//       Phone: +91${formData.phone}
//       Address: ${formData.address}
//       Pin Code: ${formData.pinCode}
//       District: ${formData.district}
//       State: ${formData.state}
      
//       Other Contact Info:
//       Email: ${formData.email || "N/A"}
//       Facebook: ${formData.facebook || "N/A"}
//       Instagram: ${formData.instagram || "N/A"}
      
//       Thank you for shopping with us!
//     `;

//     onSubmit(emailData);
//     setSubmissionMessage("You will be contacted shortly. Thank you and keep shopping!");
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
//       <div className="bg-white bg-opacity-20 rounded-xl p-6 shadow-xl backdrop-blur-lg max-w-lg w-full text-white relative min-h-36">
//       <button
//               className="absolute top-3 right-3 text-white text-lg font-bold bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
//               onClick={onClose}
//             >
//               X
//             </button>
//         {submissionMessage ? (
//           <div className="text-center py-8">
//             <p className="text-xl font-bold">{submissionMessage}</p>
//           </div>
//         ) : (
//           <>
            

//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <ul className="mb-4">
//               {products.map((product, index) => (
//                 <li key={index} className="flex justify-between">
//                   <span>{product.name}</span>
//                   <span>₹{product.price}</span>
//                 </li>
//               ))}
//             </ul>
//             <p className="mb-4">Total: ₹{totalPrice} + *delivery charges will be added if required and will be discussed</p>

//             <form onSubmit={handleSubmit} className="space-y-4 max-h-80 overflow-y-auto">
//               <h3 className="text-lg font-semibold">Please provide the info for further order processing:</h3>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 maxLength={10}
//                 pattern="\d{10}"
//                 title="Enter a valid 10-digit phone number"
//                 required
//               />
//               <textarea
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 required
//               />
//               <input
//                 type="text"
//                 name="pinCode"
//                 placeholder="Pin Code"
//                 value={formData.pinCode}
//                 onChange={handlePinCodeChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 maxLength={6}
//                 required
//               />
//               <input
//                 type="text"
//                 name="district"
//                 placeholder="District"
//                 value={formData.district}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 required
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//                 required
//               />

//               <h4 className="text-lg font-semibold mt-6">Other Contact Info</h4>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email ID (optional)"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//               />
//               <input
//                 type="text"
//                 name="facebook"
//                 placeholder="Facebook Profile Link (optional)"
//                 value={formData.facebook}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//               />
//               <input
//                 type="text"
//                 name="instagram"
//                 placeholder="Instagram Profile Link (optional)"
//                 value={formData.instagram}
//                 onChange={handleInputChange}
//                 className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
//               />

//               <button
//                 type="submit"
//                 className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
//               >
//                 Submit
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModalForm;


import React, { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSubmit: (emailData: string) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, products, onSubmit }) => {
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

  const [submissionMessage, setSubmissionMessage] = useState("");

  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

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
      Order Details:
      Selected Products:
      ${products.map((p) => `${p.name}: ₹${p.price}`).join("\n")}
      
      Total: ₹${totalPrice}
      
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white bg-opacity-20 rounded-xl p-6 shadow-xl backdrop-blur-lg max-w-lg w-full text-white relative min-h-36">
        <button
          className="absolute top-3 right-3 text-white text-lg font-bold bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        {submissionMessage ? (
          <div className="text-center py-8">
            <p className="text-xl font-bold">{submissionMessage}</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="mb-4">
              {products.map((product, index) => (
                <li key={index} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>₹{product.price}</span>
                </li>
              ))}
            </ul>
            <p className="mb-4">Total: ₹{totalPrice} + *delivery charges will be added if required and will be discussed</p>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto font-serif">
              <h3 className="text-lg font-semibold">Please provide the info for further order processing:</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
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
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
                required
              />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handlePinCodeChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
                maxLength={6}
                required
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
                required
              />

              <h4 className="text-lg font-semibold mt-6">Other Contact Info</h4>
              <input
                type="email"
                name="email"
                placeholder="Email ID (optional)"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
              />
              <input
                type="text"
                name="facebook"
                placeholder="Facebook Profile Link (optional)"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram Profile Link (optional)"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full p-2 bg-white bg-opacity-20 border border-white rounded-md text-black"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
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