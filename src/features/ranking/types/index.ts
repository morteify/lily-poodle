import { rankingActions } from "../slices";
import { ActionType } from "typesafe-actions";

/** RankingSlice */
export interface RankingData {
  symbol: string;
  indicator: string;
  resolution: number;
  orders: Orders;
}

export interface Orders {
  allOrdersCount: number;
  ordersOnPlus: number;
  ordersOnMinus: number;
  ordersProfitAmount: number;
  ordersOnPlusPercentage: number;
  ordersOnMinusPercentage: number;
}

export interface OrdersWthSymbol extends Orders {
  symbol: string;
}

export type Resolution = 5 | 15 | 30 | 60;
export type Indicator = "apo" | "aroon" | "ema" | "mom" | "rocr" | "rsi" | "sma" | "stochrsi" | "t3" | "willr";

export interface InitialRanking {
  resolution: Resolution;
  indicator: Indicator;
  isRankingFetching: boolean;
  data: RankingData[] | null;
  error: string | null;
}

/** RankingEpic */
export type FetchRankingActions =
  | typeof rankingActions.fetchRankingStart
  | typeof rankingActions.fetchRankingDone
  | typeof rankingActions.fetchRankingFail;
export type FetchRankingAction = ActionType<FetchRankingActions>;

export type RankingEpicActions = ActionType<FetchRankingActions>;

export interface FetchRankingPayload {
  resolution: string;
  indicator: string;
}
