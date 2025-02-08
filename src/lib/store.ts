import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types";

interface Image {
  _type: string;
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface CartItem extends Product {
  cartQuantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartItems: () => CartItem[];
  isItemInCart: (id: string) => boolean;
}

interface WishlistStore {
  wishlistItems: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  getWishlistItems: () => Product[];
  isItemInWishlist: (id: string) => boolean;
  moveToCart: (itemId: string) => void;
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,

      addItem: (item: Product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem._id === item._id
          );
          if (existingItem) {
            const updatedItems = state.cartItems.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
                : cartItem
            );
            return {
              cartItems: updatedItems,
              totalQuantity: state.totalQuantity + 1,
              totalPrice: state.totalPrice + item.price,
            };
          } else {
            const newItem = { ...item, cartQuantity: 1 };
            return {
              cartItems: [...state.cartItems, newItem],
              totalQuantity: state.totalQuantity + 1,
              totalPrice: state.totalPrice + item.price,
            };
          }
        }),

      removeItem: (itemId: string) =>
        set((state) => {
          const itemToRemove = state.cartItems.find(
            (item) => item._id === itemId
          );
          if (!itemToRemove) return state;

          const updatedItems = state.cartItems.filter(
            (item) => item._id !== itemId
          );
          return {
            cartItems: updatedItems,
            totalQuantity: state.totalQuantity - itemToRemove.cartQuantity,
            totalPrice:
              state.totalPrice - itemToRemove.price * itemToRemove.cartQuantity,
          };
        }),

      updateQuantity: (itemId: string, newQuantity: number) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item._id === itemId ? { ...item, cartQuantity: newQuantity } : item
          );
          const newTotalQuantity = updatedItems.reduce(
            (total, item) => total + item.cartQuantity,
            0
          );
          const newTotalPrice = updatedItems.reduce(
            (total, item) => total + item.price * item.cartQuantity,
            0
          );
          return {
            cartItems: updatedItems,
            totalQuantity: newTotalQuantity,
            totalPrice: newTotalPrice,
          };
        }),

      clearCart: () => set({ cartItems: [], totalPrice: 0, totalQuantity: 0 }),

      getCartItems: () => get().cartItems,
      isItemInCart: (id) => {
        const state = get();
        return state.cartItems.some((item) => item._id === id);
      },
    }),
    {
      name: "cart-storage",
      // @ts-expect-error "Invalid state passed to getCartItems method in getCartItems
      getStorage: () => localStorage,
    }
  )
);

const useWishlistStore = create(
  persist<WishlistStore>(
    (set, get) => ({
      wishlistItems: [],

      addToWishlist: (item: Product) =>
        set((state) => {
          const existingItem = state.wishlistItems.find(
            (wishlistItem) => wishlistItem._id === item._id
          );
          if (existingItem) {
            return state; // Item already exists in wishlist
          }
          return {
            wishlistItems: [...state.wishlistItems, item],
          };
        }),

      removeFromWishlist: (itemId: string) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item._id !== itemId
          ),
        })),

      clearWishlist: () => set({ wishlistItems: [] }),

      getWishlistItems: () => get().wishlistItems,

      isItemInWishlist: (id: string) => {
        const state = get();
        return state.wishlistItems.some((item) => item._id === id);
      },

      moveToCart: (itemId: string) => {
        const state = get();
        const item = state.wishlistItems.find((item) => item._id === itemId);
        if (item) {
          useCartStore.getState().addItem(item);
          set((state) => ({
            wishlistItems: state.wishlistItems.filter(
              (item) => item._id !== itemId
            ),
          }));
        }
      },
    }),
    {
      name: "wishlist-storage",
      // @ts-expect-error "Storage is not available for this account"
      getStorage: () => localStorage,
    }
  )
);

export { useCartStore, useWishlistStore };
