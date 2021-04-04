import { throwError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { GetSymbolLookupResponse, GetSymbolLookupReturnType } from "./types";
import { ajaxGetRequest } from "./utils";

/**
 * Search for best-matching symbols based on your query. You can input anything from symbol, security's name to ISIN and Cusip.
 * @param {string} query Query text can be symbol, name, isin, or cusip.
 * @returns {GetSymbolLookupReturnType} Object containg Symbol information wrapped in an Observable object.
 */
export const getSymbolLookup = (query: string): GetSymbolLookupReturnType => {
  const apiQuery = `q=${query}`;
  return ajaxGetRequest(apiQuery).pipe(
    map((ajaxResponse: AjaxResponse): GetSymbolLookupResponse => ajaxResponse.response),
    catchError((error) => throwError(error)),
  );
};
