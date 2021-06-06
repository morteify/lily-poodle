import { ActionType } from "typesafe-actions";
import { marketAndStrategyOverviewActions } from "../slices";

/** Market and Strategy Overview */
export interface InitialOverview {
  isOverviewFetching: boolean;
  data: CandlesData[] | null;
  error: string | null;
}

export interface CandlesData {
  open: number;
  close: number;
  high: number;
  low: number;
  timestamp: number;
  volume: number;
  indicatorValue: number;
  signal?: "SELL" | "BUY";
}

export interface FetchOverviewPayload {
  indicator: string;
  resolution: string;
  symbol: string;
}

/** Market and strategy Epic */
export type FetchOverviewActions =
  | typeof marketAndStrategyOverviewActions.fetchOverview
  | typeof marketAndStrategyOverviewActions.fetchOverviewDone
  | typeof marketAndStrategyOverviewActions.fetchOverviewFail;

export type FetchOverviewAction = ActionType<FetchOverviewActions>;

export type MarketAndStrategyEpicActions = ActionType<FetchOverviewAction>;

export interface CandlesDataApiResponse {
  candles: CandlesData[];
}
