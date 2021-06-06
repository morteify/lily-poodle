import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchRankingPayload, InitialRanking, RankingData } from "../../types";

const initialState: InitialRanking = {
  isRankingFetching: false,
  data: null,
  error: null,
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    fetchRankingStart(state, payload: PayloadAction<FetchRankingPayload>): void {
      state.isRankingFetching = true;
    },
    fetchRankingDone(state, action: PayloadAction<RankingData[]>) {
      state.data = action.payload;
      state.isRankingFetching = false;
    },
    fetchRankingFail(state, action: PayloadAction<string>): void {
      state.isRankingFetching = false;
      state.error = action.payload;
    },
  },
});

export default rankingSlice.reducer;

const actions = rankingSlice.actions;
export { actions as rankingActions };
