import { map, mergeMap, catchError, filter } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { forkJoin, Observable, of } from "rxjs";
import { marketAndStrategyOverviewActions } from "../../slices";
import { RootState } from "../../../../app/types";
import { ActionType, isOfType } from "typesafe-actions";
import { FetchOverviewAction, FetchOverviewPayload } from "../../types";
import { ajax, AjaxResponse } from "rxjs/ajax";

const fetchMarketAndStrategyOverviewEpic: Epic<FetchOverviewAction, FetchOverviewAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(marketAndStrategyOverviewActions.fetchOverview.type)),
    mergeMap((action) => {
      const { symbol, resolution, indicator } = action.payload as FetchOverviewPayload;
      console.log("action$", action$);
      return ajax.get(`http://localhost:8000/candles-with-indicator/${symbol}/${resolution}/${indicator}`).pipe(
        map((value: AjaxResponse) => marketAndStrategyOverviewActions.fetchOverviewDone(value.response)),
        catchError((error) => of(marketAndStrategyOverviewActions.fetchOverviewFail(error))),
      );
    }),
  );

export const marketAndStrategyEpic = combineEpics(fetchMarketAndStrategyOverviewEpic);
