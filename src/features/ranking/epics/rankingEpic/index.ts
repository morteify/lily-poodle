import { map, mergeMap, catchError, filter } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { forkJoin, Observable, of } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { rankingActions } from "../../slices";
import { ajax } from "rxjs/ajax";
import { RootState } from "../../../../app/types";
import { isOfType } from "typesafe-actions";
import { FetchRankingAction } from "../../types";

const symbols = ["AAPL", "MSFT", "BA", "GE", "NKE", "TSLA", "SBUX"].map((symbol) =>
  ajax.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=A2SQCWDLVJZ39O64`),
);

const fetchRankingEpic: Epic<FetchRankingAction, FetchRankingAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(rankingActions.fetchRankingStart.type)),
    mergeMap<FetchRankingAction, Observable<FetchRankingAction>>(() =>
      forkJoin(symbols).pipe(
        map((value: AjaxResponse[]) => rankingActions.fetchRankingDone(JSON.stringify(value))),
        catchError((error) => of(rankingActions.fetchRankingFail(error))),
      ),
    ),
  );

export const rankingEpic = combineEpics(fetchRankingEpic);
