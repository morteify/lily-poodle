import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxResponse } from "rxjs/ajax";
import { ApiQuote, InitialRanking } from "../../types";
import { apiMapper } from "../../utils";

const initialState: InitialRanking = {
  isRankingFetching: false,
  quotes: null,
  error: null,
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    fetchRankingStart(state): void {
      state.isRankingFetching = true;
    },
    fetchRankingDone(state, action: PayloadAction<string>) {
      const result: AjaxResponse[] = JSON.parse(action.payload);
      const responses: ApiQuote[] = result.map((obj) => obj.response["Global Quote"]);
      const quotes = responses.map((response) => apiMapper(response));
      state.quotes = quotes;
      state.isRankingFetching = false;
    },
    fetchRankingFail(state, action: PayloadAction<string>): void {
      state.isRankingFetching = false;
    },
  },
});

export default rankingSlice.reducer;

const actions = rankingSlice.actions;
export { actions as rankingActions };
