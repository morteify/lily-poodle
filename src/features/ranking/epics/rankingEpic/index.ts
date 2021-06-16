import { map, mergeMap, catchError, filter } from "rxjs/operators";
import { combineEpics, Epic } from "redux-observable";
import { Observable, of } from "rxjs";
import { rankingActions } from "../../slices";
import { RootState } from "../../../../app/types";
import { isOfType } from "typesafe-actions";
import { FetchRankingAction, FetchRankingPayload } from "../../types";
import { ajax, AjaxResponse } from "rxjs/ajax";

const fetchRankingEpic: Epic<FetchRankingAction, FetchRankingAction, RootState> = (action$) =>
  action$.pipe(
    filter(isOfType(rankingActions.fetchRankingStart.type)),
    mergeMap<FetchRankingAction, Observable<FetchRankingAction>>((action) => {
      const { indicator, resolution } = action.payload as FetchRankingPayload;

      return ajax.get(`https://lily-poodle-service.azurewebsites.net/strategy-view/${resolution}/${indicator}`).pipe(
        map((value: AjaxResponse) => rankingActions.fetchRankingDone(value.response.data)),
        catchError((error) => of(rankingActions.fetchRankingFail(error))),
      );
    }),
  );

export const rankingEpic = combineEpics(fetchRankingEpic);
