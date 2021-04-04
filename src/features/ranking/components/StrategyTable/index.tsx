import React, { useEffect } from "react";
import { Table } from "antd";
import { MainLayout } from "../../../../common/mainLayout/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/types";
import { rankingActions } from "../../slices";

const StrategiesTable: React.FC = () => {
  const dispatch = useDispatch();
  const quotes = useSelector((state: RootState) => state.ranking.quotes);
  const isFetchingQuotes = useSelector((state: RootState) => state.ranking.isRankingFetching);

  useEffect(() => {
    dispatch(rankingActions.fetchRankingStart());
  }, [dispatch]);

  const columns = [
    {
      title: "symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "open",
      dataIndex: "open",
      key: "open",
    },
    {
      title: "high",
      dataIndex: "high",
      key: "high",
    },
    {
      title: "low",
      key: "low",
      dataIndex: "low",
    },
    {
      title: "price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "volume",
      key: "volume",
      dataIndex: "volume",
    },
    {
      title: "latest trading day",
      key: "latestTradingDay",
      dataIndex: "latestTradingDay",
    },
    {
      title: "previous close",
      key: "previousClose",
      dataIndex: "previousClose",
    },
    {
      title: "change",
      key: "change",
      dataIndex: "change",
    },
    {
      title: "change percent",
      key: "changePercent",
      dataIndex: "changePercent",
    },
  ];

  return (
    <MainLayout>
      <Table columns={columns} dataSource={quotes ?? undefined} loading={isFetchingQuotes}></Table>
    </MainLayout>
  );
};

export default StrategiesTable;
