import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";

/**
 * Base URL address used for all requests that are being sent to the Finnhub's API
 */
export const API_URL = "https://finnhub.io/api/v1";

/**
 * Default function including base URL and authentication token used to fetch data from an API.
 * @param {string} query Parameter that is used to provide data for an API endpoint
 * @returns {Observable<AjaxResponse>} AjaxResponse wrapped in an Observable object
 */
export const ajaxGetRequest = (query: string): Observable<AjaxResponse> => {
  return ajax.get(`${API_URL}/${query}/`, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    "X-Finnhub-Token": process.env.API_TOKEN ?? "",
  });
};
