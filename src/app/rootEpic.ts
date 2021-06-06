import { combineEpics } from "redux-observable";
import { RootState } from "./types";
import { createEpicMiddleware } from "redux-observable";
import { initialEpic } from "../features/initial/epics";
import { rankingEpic } from "../features/ranking/epics";
import { marketAndStrategyEpic } from "../features/marketAndStrategy/epics";
import { EpicMiddleware } from "./types";

export const rootEpic = combineEpics(initialEpic, rankingEpic, marketAndStrategyEpic);

export const epicMiddleware = createEpicMiddleware<EpicMiddleware, EpicMiddleware, RootState>();
