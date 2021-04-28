import { combineReducers } from "@reduxjs/toolkit";
import { initialSliceReducer } from "../features/initial/slices";
import { rankingSliceReducer } from "../features/ranking/slices";
import { mainLayoutSliceReducer } from "../common/mainLayout/slices";

export const rootReducer = combineReducers({
  initial: initialSliceReducer,
  ranking: rankingSliceReducer,
  mainLayout: mainLayoutSliceReducer,
});
