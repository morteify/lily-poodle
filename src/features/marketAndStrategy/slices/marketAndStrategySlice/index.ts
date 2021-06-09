import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxResponse } from "rxjs/ajax";
import { CandlesData, CandlesDataApiResponse, FetchOverviewPayload, InitialOverview } from "../../types";

const initialState: InitialOverview = {
  isOverviewFetching: false,
  data: null,
  error: null,
};

const marketAndStrategySlice = createSlice({
  name: "marketAndStrategy",
  initialState,
  reducers: {
    fetchOverview(state, payload: PayloadAction<FetchOverviewPayload>): void {
      state.isOverviewFetching = true;
    },
    fetchOverviewDone(state, action: PayloadAction<CandlesDataApiResponse>) {
      const result = action.payload.candles as CandlesData[];
      state.data = result;
      state.isOverviewFetching = false;
    },
    fetchOverviewFail(state, action: PayloadAction<string>): void {
      state.isOverviewFetching = false;
      state.error = action.payload;
    },
    clear: () => initialState,
  },
});

export default marketAndStrategySlice.reducer;

const actions = marketAndStrategySlice.actions;
export { actions as marketAndStrategyOverviewActions };
