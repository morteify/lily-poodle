import { rankingActions } from "../slices";
import { ActionType } from "typesafe-actions";

/** RankingSlice */
export interface GlobalQuote {
  "Global Quote": ApiQuote;
}

export interface Quote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
}

export interface InitialRanking {
  isRankingFetching: boolean;
  quotes: Quote[] | null;
  error: string | null;
}

/** RankingEpic */
export type FetchRankingActions =
  | typeof rankingActions.fetchRankingStart
  | typeof rankingActions.fetchRankingDone
  | typeof rankingActions.fetchRankingFail;
export type FetchRankingAction = ActionType<FetchRankingActions>;

export type RankingEpicActions = ActionType<FetchRankingActions>;

/** apiMapper */
export interface ApiQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}
