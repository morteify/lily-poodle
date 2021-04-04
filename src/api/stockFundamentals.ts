import { throwError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { GetSymbolLookupResponse, GetSymbolLookupReturnType } from "./types";
import { ajaxGetRequest } from "./utils";

export const getSymbolLookup = (query: string): GetSymbolLookupReturnType => {
  return ajaxGetRequest(query).pipe(
    map((ajaxResponse: AjaxResponse): GetSymbolLookupResponse => ajaxResponse.response),
    catchError((error) => throwError(error)),
  );
};
