import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialMainLayout } from "../../types";

const initialState: InitialMainLayout = {
  isMenuCollapsed: false,
  currentlySelectedMenuKey: "/strategy-view",
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    toggleMenuCollapsed(state): void {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
    changeCurrentlySelectedMenuKey(state, action: PayloadAction<string>): void {
      state.currentlySelectedMenuKey = action.payload;
    },
  },
});

export default mainLayoutSlice.reducer;

const actions = mainLayoutSlice.actions;
export { actions as mainLayoutActions };
