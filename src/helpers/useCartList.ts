import { useCallback } from "react";
import Cookies from "js-cookie";
import type { Product } from "@/interface/interfaces";
import { cartEventEmitter } from "./useCartEmitter";

const useCartList = () => {
  // Get a cookie as an array
  const getCartList = useCallback((): string[] | undefined => {
    const cookieValue = Cookies.get("cartlist");
    return cookieValue ? JSON.parse(cookieValue) : []; // Parse JSON string to array
  }, []);

  // Set a cookie as an array
  const setCartListById = useCallback(
    (productData: Product[], id: string, quantity: number = 1) => {
      // Find the product by id
      const product = productData.find((item) => item.id === id);

      // Proceed only if the product exists
      if (product) {
        const currentCartList = getCartList() || [];

        // Check if the product is already in the cart
        const existingItemIndex = currentCartList.findIndex(
          (cartItem: any) => cartItem.id === id
        );

        if (existingItemIndex === -1) {
          // Product is not in the cart, add it if quantity > 1 or default
          const newCartItem = {
            ...product,
            quantity: quantity > 0 ? quantity : 1,
          };
          const revisedCartIdList = [...currentCartList, newCartItem];

          // Save updated cart list in cookies
          Cookies.set("cartlist", JSON.stringify(revisedCartIdList), {
            expires: 365 * 100,
            path: "/",
            secure: true,
          });
          cartEventEmitter.emit("cartUpdated");
          console.log(
            `Added product: ${product.name}, Quantity: ${newCartItem.quantity}`
          );
        } else {
          // Product is already in the cart
          const existingItem = currentCartList[existingItemIndex];
          if (quantity > 0 && existingItem.quantity !== quantity) {
            // Update quantity if it's valid and different
            existingItem.quantity = quantity;
            currentCartList[existingItemIndex] = existingItem;

            // Save updated cart list in cookies
            Cookies.set("cartlist", JSON.stringify(currentCartList), {
              expires: 365 * 100,
              path: "/",
              secure: true,
            });
            console.log(
              `Updated product: ${product.name}, New Quantity: ${quantity}`
            );
          } else {
            console.log(`No update required for product: ${product.name}`);
          }
        }
      } else {
        console.log(`Product with ID ${id} not found.`);
      }
    },
    [getCartList]
  );

  // Remove a cookie
  const removeCartList = useCallback(() => {
    Cookies.remove("cartlist");
    cartEventEmitter.emit("cartUpdated");
  }, []);
  const removeCartItemById = (id: string) => {
    if (id) {
      const currenCartList = getCartList() || [];
      const updatedCartList = currenCartList.filter((item) => item.id !== id);
      Cookies.set("cartlist", JSON.stringify(updatedCartList), {
        expires: 365 * 100,
        path: "/",
        secure: true,
      });
      cartEventEmitter.emit("cartUpdated");
    }
  };

  return { getCartList, setCartListById, removeCartList, removeCartItemById };
};

export default useCartList;
