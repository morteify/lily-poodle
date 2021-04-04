import { map, mergeMap, catchError, filter } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { Observable, of } from "rxjs";
import { rankingActions } from "../../slices";
import { RootState } from "../../../../app/types";
import { isOfType } from "typesafe-actions";
import { FetchRankingAction } from "../../types";
import { getSymbolLookup } from "../../../../api/stockFundamentals";

const fetchRankingEpic: Epic<FetchRankingAction, FetchRankingAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(rankingActions.fetchRankingStart.type)),
    mergeMap<FetchRankingAction, Observable<FetchRankingAction>>(() =>
      getSymbolLookup("apple").pipe(
        map((response) => console.log("response", response)),
        catchError((error) => of(error)),
      ),
    ),
  );

export const rankingEpic = combineEpics(fetchRankingEpic);
