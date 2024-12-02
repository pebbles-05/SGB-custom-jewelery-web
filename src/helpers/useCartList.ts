import { useCallback, useEffect, useState } from "react";
import { cartEventEmitter } from "./useCartEmitter";
import { Product } from "@/interface/interfaces";

// IndexedDB utility functions
const openDb = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("cartDb", 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains("cartItems")) {
        db.createObjectStore("cartItems", { keyPath: "id" });
      }
    };
    request.onsuccess = (e) => resolve((e.target as IDBRequest).result);
    request.onerror = (e) => reject(e);
  });
};

const useCartList = () => {
  const [cartList, setCartList] = useState<any[]>([]);

  // Get the cart list from IndexedDB
  const getCartList = useCallback(async (): Promise<any[]> => {
    try {
      const db = await openDb();
      return new Promise<any[]>((resolve, reject) => {
        const transaction = db.transaction("cartItems", "readonly");
        const store = transaction.objectStore("cartItems");
        const request = store.getAll(); // Retrieve all items from the cart store
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e);
      });
    } catch (error) {
      console.error("Error getting cart list from IndexedDB:", error);
      return [];
    }
  }, []);

  // Set the cart list in IndexedDB
  const setCartListById = useCallback(
    async (productData: Product[], id: string, quantity: number = 1) => {
      try {
        const db = await openDb();
        const product = productData.find((item) => item.id === id);

        if (product) {
          const currentCartList = await getCartList();

          const existingItemIndex = currentCartList.findIndex(
            (cartItem) => cartItem.id === id
          );

          const newCartItem = {
            ...product,
            quantity: quantity > 0 ? quantity : 1,
          };

          const transaction = db.transaction("cartItems", "readwrite");
          const store = transaction.objectStore("cartItems");

          if (existingItemIndex === -1) {
            // Product is not in the cart, add it
            store.add(newCartItem);
            console.log(
              `Added product: ${product.name}, Quantity: ${newCartItem.quantity}`
            );
          } else {
            // Product is already in the cart, update it
            store.put(newCartItem); // This updates the existing item
            console.log(
              `Updated product: ${product.name}, New Quantity: ${newCartItem.quantity}`
            );
          }

          await transaction.complete;
          cartEventEmitter.emit("cartUpdated");
        } else {
          console.log(`Product with ID ${id} not found.`);
        }
      } catch (error) {
        console.error("Error setting cart list in IndexedDB:", error);
      }
    },
    [getCartList]
  );

  // Remove a cart item by ID from IndexedDB
  const removeCartItemById = useCallback(async (id: string) => {
    try {
      const db = await openDb();
      const transaction = db.transaction("cartItems", "readwrite");
      const store = transaction.objectStore("cartItems");

      store.delete(id); // Delete item by ID
      await transaction.complete;

      cartEventEmitter.emit("cartUpdated");
      console.log(`Removed product with ID: ${id}`);
    } catch (error) {
      console.error("Error removing cart item from IndexedDB:", error);
    }
  }, []);

  // Remove all cart items
  const removeCartList = useCallback(async () => {
    try {
      const db = await openDb();
      const transaction = db.transaction("cartItems", "readwrite");
      const store = transaction.objectStore("cartItems");

      store.clear(); // Clear all items in the cart
      await transaction.complete;

      cartEventEmitter.emit("cartUpdated");
      console.log("Cleared all cart items.");
    } catch (error) {
      console.error("Error removing all cart items from IndexedDB:", error);
    }
  }, []);

  // Fetch cart list on mount
  useEffect(() => {
    const fetchCartList = async () => {
      const items = await getCartList();
      setCartList(items);
    };

    fetchCartList();
  }, [getCartList]);

  return {
    getCartList,
    setCartListById,
    removeCartList,
    removeCartItemById,
    cartList,
  };
};

export default useCartList;
