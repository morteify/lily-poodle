import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchRankingPayload, Indicator, InitialRanking, RankingData, Resolution } from "../../types";

const initialState: InitialRanking = {
  resolution: 5,
  indicator: "sma",
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
    updateParameter(
      state,
      action: PayloadAction<{
        parameter: "resolution" | "indicator";
        value: Resolution | Indicator;
      }>,
    ) {
      const { parameter, value } = action.payload;
      if (parameter === "resolution") state.resolution = value as Resolution;
      if (parameter === "indicator") state.indicator = value as Indicator;
    },
  },
});

export default rankingSlice.reducer;

const actions = rankingSlice.actions;
export { actions as rankingActions };
