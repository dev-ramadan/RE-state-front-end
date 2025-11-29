import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PropertyWithAgency } from "../types/property";
import type { WishList } from "../types/WishList";

// قراءة الـ localStorage عند البداية
const savedWishList = localStorage.getItem("wishList");

const initialState: WishList = {
  items: savedWishList ? JSON.parse(savedWishList) : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addItemtoWishList(state, action: PayloadAction<PropertyWithAgency>) {
      const exists = state.items.find(item => item.propertyId === action.payload.propertyId);
      if (!exists) {
        state.items.push(action.payload);

        // حفظ في localStorage
        localStorage.setItem("wishList", JSON.stringify(state.items));
      }
    },
    delItemFromWishList(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.propertyId !== action.payload);

      // حفظ في localStorage
      localStorage.setItem("wishList", JSON.stringify(state.items));
    },
    clearWishList(state) {
      state.items = [];
      localStorage.removeItem("wishList");
    }
  }
});

// Export actions
export const { addItemtoWishList, delItemFromWishList, clearWishList } = wishListSlice.actions;

// Export reducer
export default wishListSlice.reducer;

// Selector
export const getWishList = (state: RootState): PropertyWithAgency[] => state.wishList.items;
