import React, { useEffect, useLayoutEffect, useRef } from "react";
import { MainLayout } from "../../../../common/mainLayout/components";
import { createChart, CrosshairMode, IChartApi, UTCTimestamp } from "lightweight-charts";
import { data } from "./data";
import ResizeObserver from "resize-observer-polyfill";
import Text from "antd/lib/typography/Text";
import { SymbolTitle, IndicatorTitle, XSymbol, SectionTitleContainer, HelperSubtitle, ChartContent } from "./styles";

const MarketAndStrategyOverview: React.FC = () => {
  const mainLayoutRef = useRef<HTMLInputElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (mainLayoutRef.current) {
        chartRef.current?.applyOptions({
          width: mainLayoutRef.current.offsetWidth,
          height: mainLayoutRef.current.offsetHeight - 86,
        });
      }
    });
    resizeObserver.observe(document.body);
  }, [mainLayoutRef]);

  useLayoutEffect(() => {
    if (mainLayoutRef.current) {
      chartRef.current = createChart(mainLayoutRef.current, {
        width: mainLayoutRef.current.offsetWidth,
        height: mainLayoutRef.current.offsetHeight - 86,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });
      const lineSeries = chartRef.current.addCandlestickSeries();
      const barData = data.map((entry) => ({
        open: entry.open,
        high: entry.high,
        low: entry.low,
        close: entry.close,
        time: entry.timestamp as UTCTimestamp,
      }));
      const smaLine = chartRef.current.addLineSeries({
        color: "rgba(4, 111, 232, 1)",
        lineWidth: 2,
      });
      smaLine.setData(data.map((entry) => ({ time: entry.timestamp as UTCTimestamp, value: entry.indicatorValue })));
      lineSeries.setData(barData);
    }
  }, []);

  return (
    <MainLayout>
      <div>
        <HelperSubtitle>Selected market and strategy</HelperSubtitle>
        <SectionTitleContainer>
          <SymbolTitle>AAPL</SymbolTitle>
          <XSymbol>x</XSymbol>
          <IndicatorTitle>Simple Moving Average</IndicatorTitle>
        </SectionTitleContainer>
      </div>
      <ChartContent ref={mainLayoutRef} />
    </MainLayout>
  );
};

export default MarketAndStrategyOverview;
