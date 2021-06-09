import React, { useEffect, useLayoutEffect, useRef } from "react";
import { MainLayout } from "../../../../common/mainLayout/components";
import { createChart, CrosshairMode, IChartApi, UTCTimestamp } from "lightweight-charts";
import ResizeObserver from "resize-observer-polyfill";
import { SymbolTitle, IndicatorTitle, XSymbol, SectionTitleContainer, HelperSubtitle, ChartContent } from "./styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { marketAndStrategyOverviewActions } from "../../slices";
import { FetchOverviewPayload } from "../../types";
import { Spin, PageHeader } from "antd";
import { RootState } from "../../../../app/types";

const MarketAndStrategyOverview: React.FC = () => {
  const { symbol, resolution, indicator } = useParams<Partial<FetchOverviewPayload>>();
  const dispatch = useDispatch();
  const mainLayoutRef = useRef<HTMLInputElement>(null);
  const isOverviewFetching = useSelector((state: RootState) => state.marketAndStrategyOverview.isOverviewFetching);
  const overviewData = useSelector((state: RootState) => state.marketAndStrategyOverview.data);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (symbol && resolution && indicator)
      dispatch(marketAndStrategyOverviewActions.fetchOverview({ symbol, resolution, indicator }));
  }, [dispatch, indicator, resolution, symbol]);

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
    }

    return () => {
      chartRef.current = null;
      dispatch(marketAndStrategyOverviewActions.clear());
    };
  }, [dispatch]);

  useEffect(() => {
    if (overviewData && chartRef?.current) {
      const markers: any[] = [];
      const lineSeries = chartRef.current.addBarSeries({
        thinBars: true,
        downColor: "#ff0000",
        upColor: "#3a9100",
      });
      const barData = overviewData.map((entry) => {
        if (entry?.signal === "SELL") {
          markers.push({
            time: entry.timestamp as UTCTimestamp,
            position: "belowBar",
            color: "#ff0000",
            shape: "arrowUp",
            text: `SELL @ ${entry.close}`,
          });
        }

        if (entry?.signal === "BUY") {
          markers.push({
            time: entry.timestamp as UTCTimestamp,
            position: "aboveBar",
            color: "#3a9100",
            shape: "arrowDown",
            text: `BUY @ ${entry.close}`,
          });
        }

        return {
          open: entry.open,
          high: entry.high,
          low: entry.low,
          close: entry.close,
          time: entry.timestamp as UTCTimestamp,
        };
      });
      const chartLine = chartRef.current.addLineSeries({
        color: "rgba(4, 111, 232, 1)",
        lineWidth: 2,
      });
      chartLine.setData(
        overviewData.map((entry) => ({ time: entry.timestamp as UTCTimestamp, value: entry.indicatorValue })),
      );

      lineSeries.setData(barData);
      lineSeries.setMarkers(markers);
      chartRef.current.timeScale().fitContent();
    }
  }, [overviewData]);

  return (
    <Spin tip="Fetching data" spinning={isOverviewFetching}>
      <MainLayout>
        <div>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={
              <SectionTitleContainer>
                <SymbolTitle>{symbol ?? "N/A"} </SymbolTitle>
                <XSymbol>x</XSymbol>
                <IndicatorTitle>{indicator ?? "N/A"}</IndicatorTitle>
              </SectionTitleContainer>
            }
            subTitle={<HelperSubtitle>Selected market and strategy</HelperSubtitle>}
          />
        </div>
        <ChartContent ref={mainLayoutRef} />
      </MainLayout>
    </Spin>
  );
};

export default MarketAndStrategyOverview;
