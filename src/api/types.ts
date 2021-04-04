import { Observable } from "rxjs";

/**
 * Symbol Lookup
 */

export interface SymbolLookup {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface GetSymbolLookupResponse {
  result: SymbolLookup;
  count: number;
}

export type GetSymbolLookupReturnType = Observable<GetSymbolLookupResponse>;
