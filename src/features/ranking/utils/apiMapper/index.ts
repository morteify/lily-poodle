import { ApiQuote, Quote } from "../../types";

function apiMapper(apiQuote: ApiQuote): Quote {
  if (apiQuote) {
    const mappedResult: Quote = {
      symbol: apiQuote["01. symbol"],
      open: apiQuote["02. open"],
      high: apiQuote["03. high"],
      low: apiQuote["04. low"],
      price: apiQuote["05. price"],
      volume: apiQuote["06. volume"],
      latestTradingDay: apiQuote["07. latest trading day"],
      previousClose: apiQuote["08. previous close"],
      change: apiQuote["09. change"],
      changePercent: apiQuote["10. change percent"],
    };

    return mappedResult;
  } else
    return {
      symbol: "api limit exceeded",
      open: "api limit exceeded",
      high: "api limit exceeded",
      low: "api limit exceeded",
      price: "api limit exceeded",
      volume: "api limit exceeded",
      latestTradingDay: "api limit exceeded",
      previousClose: "api limit exceeded",
      change: "api limit exceeded",
      changePercent: "api limit exceeded",
    };
}

export default apiMapper;
