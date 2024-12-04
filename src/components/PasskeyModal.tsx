// import React, { useEffect, useState } from "react";

// interface PasskeyModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (passkey: string) => void;
// }

// const PasskeyModal: React.FC<PasskeyModalProps> = ({ isOpen, onSubmit }) => {
//   const [passkey, setPasskey] = useState<string>("");

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden"; // Disable scrolling
//     } else {
//       document.body.style.overflow = ""; // Enable scrolling
//     }

//     // Cleanup when the modal is unmounted or closed
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   const handleInputChange = (index: number, value: string) => {
//     if (!/^\d?$/.test(value)) return; // Only allow digits
//     const updatedPasskey = passkey.split("");
//     updatedPasskey[index] = value;
//     setPasskey(updatedPasskey.join(""));

//     if (value && index < 5) {
//       const nextInput = document.getElementById(
//         `digit-${index + 1}`
//       ) as HTMLInputElement;
//       nextInput?.focus();
//     }
//   };

//   const handleKeyDown = (
//     event: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (event.key === "Backspace") {
//       if (passkey[index]) {
//         const updatedPasskey = passkey.split("");
//         updatedPasskey[index] = "";
//         setPasskey(updatedPasskey.join(""));
//       } else if (index > 0) {
//         const prevInput = document.getElementById(
//           `digit-${index - 1}`
//         ) as HTMLInputElement;
//         prevInput?.focus();
//       }
//     }
//   };

//   const handleSubmit = () => {
//     if (passkey.length === 6) {
//       onSubmit(passkey);
//       setPasskey("");
//     } else {
//       alert("Please enter all 6 digits.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-6">
//       <div className="bg-custom-bg-light rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
//         <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
//           Enter 6-Digit Passkey
//         </h2>
//         <div className="flex justify-between gap-2 sm:gap-4 mb-4">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <input
//               key={index}
//               id={`digit-${index}`}
//               type="text"
//               maxLength={1}
//               value={passkey[index] || ""}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg border border-custom-fg-light rounded-md focus:ring-2 focus:ring-custom-fg-light focus:outline-none"
//             />
//           ))}
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="w-full sm:w-auto px-4 py-2 bg-custom-fg-light text-custom-bg-light hover:border-2 hover:border-custom-fg-light rounded-md hover:bg-custom-bg-light hover:text-custom-fg-light ml-2"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasskeyModal;

import React, { useEffect, useState } from "react";

interface PasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passkey: string) => void;
}

const PasskeyModal: React.FC<PasskeyModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
}) => {
  const [passkey, setPasskey] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    // Cleanup when the modal is unmounted or closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    const updatedPasskey = passkey.split("");
    updatedPasskey[index] = value;
    setPasskey(updatedPasskey.join(""));

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `digit-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (passkey[index]) {
        const updatedPasskey = passkey.split("");
        updatedPasskey[index] = "";
        setPasskey(updatedPasskey.join(""));
      } else if (index > 0) {
        const prevInput = document.getElementById(
          `digit-${index - 1}`
        ) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (passkey.length === 6) {
      onSubmit(passkey);
      setPasskey("");
    } else {
      alert("Please enter all 6 digits.");
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pastedValue = event.clipboardData.getData("Text").trim();

    // Ensure we're only working with digits, and trim if necessary
    const digits = pastedValue.replace(/\D/g, "");

    if (digits.length > 6) {
      setPasskey(digits.slice(0, 6)); // Use only first 6 digits
    } else {
      setPasskey(digits); // Use all digits if less than 6
    }

    event.preventDefault(); // Prevent default paste behavior
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-6">
      <div className="bg-custom-bg-light rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
          Enter 6-Digit Passkey
        </h2>
        <div className="flex justify-between gap-2 sm:gap-4 mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength={1}
              value={passkey[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg border border-custom-fg-light rounded-md focus:ring-2 focus:ring-custom-fg-light focus:outline-none"
            />
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 bg-custom-fg-light text-custom-bg-light hover:border-2 hover:border-custom-fg-light rounded-md hover:bg-custom-bg-light hover:text-custom-fg-light ml-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasskeyModal;
