/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MainLayout } from "../../../../common/mainLayout/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/types";
import { rankingActions } from "../../slices";
import { useHistory, useParams } from "react-router-dom";
import { FetchRankingPayload, OrdersWthSymbol } from "../../types";

const StrategiesTable: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { indicator, resolution } = useParams<FetchRankingPayload>();
  const orders = useSelector((state: RootState) =>
    state.ranking.data?.map((item) => ({ symbol: item.symbol, ...item.orders })),
  );
  const isRankingFetching = useSelector((state: RootState) => state.ranking.isRankingFetching);
  const [selectedIndicator, setSelectedIndicator] = useState("apo");
  const [selectedResolution, setSelectedResolution] = useState(5);

  useEffect(() => {
    dispatch(rankingActions.fetchRankingStart({ indicator, resolution }));
  }, [dispatch, indicator, resolution]);

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Orders count",
      dataIndex: "allOrdersCount",
      key: "allOrdersCount",
    },
    {
      title: "Orders on plus",
      dataIndex: "ordersOnPlus",
      key: "ordersOnPlus",
    },
    {
      title: "Orders on minus",
      dataIndex: "ordersOnMinus",
      key: "ordersOnMinus",
    },
    {
      title: "Profit",
      key: "ordersProfitAmount",
      dataIndex: "ordersProfitAmount",
    },
    {
      title: "Orders on plus %",
      key: "ordersOnPlusPercentage",
      dataIndex: "ordersOnPlusPercentage",
    },
    {
      title: "Orders on minus %",
      key: "ordersOnMinusPercentage",
      dataIndex: "ordersOnMinusPercentage",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: OrdersWthSymbol) => (
        <div>
          <a
            onClick={() => {
              history.push(`/market-and-strategy-overview/${record.symbol}/${resolution}/${indicator}`);
            }}
          >
            Overview
          </a>
        </div>
      ),
    },
  ];

  const handleResolutionMenu = (event: any) => {
    console.log("reoslutionClick", event);
    setSelectedResolution(event.key);
  };

  const handleIndicatorMenu = (event: any) => {
    console.log("reoslutionClick", event);
    setSelectedIndicator(event.key);
  };

  const resolutionMenu = (
    <Menu onClick={handleResolutionMenu}>
      <Menu.Item key="5">5</Menu.Item>
      <Menu.Item key="15">15</Menu.Item>
      <Menu.Item key="30">30</Menu.Item>
      <Menu.Item key="60">60</Menu.Item>
    </Menu>
  );

  const indicatorMenu = (
    <Menu onClick={handleIndicatorMenu}>
      <Menu.Item key="apo">apo</Menu.Item>
      <Menu.Item key="aroon">aroon</Menu.Item>
      <Menu.Item key="ema">ema</Menu.Item>
      <Menu.Item key="mom">mom</Menu.Item>
      <Menu.Item key="rocr">rocr</Menu.Item>
      <Menu.Item key="rsi">rsi</Menu.Item>
      <Menu.Item key="sma">sma</Menu.Item>
      <Menu.Item key="stochrsi">stochrsi</Menu.Item>
      <Menu.Item key="t3">t3</Menu.Item>
      <Menu.Item key="willr">willr</Menu.Item>
    </Menu>
  );

  return (
    <MainLayout>
      <Space style={{ marginBottom: 16 }}>
        <Dropdown overlay={resolutionMenu}>
          <Button>
            Resolution: <span style={{ color: "#1890ff" }}> {selectedResolution}</span> <DownOutlined />
          </Button>
        </Dropdown>
        <Dropdown overlay={indicatorMenu}>
          <Button>
            Indicator: <span style={{ color: "#1890ff" }}> {selectedIndicator}</span>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button>Clear filters</Button>
        <Button>Clear filters and sorters</Button>
      </Space>
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={orders ?? undefined}
        loading={isRankingFetching}
      ></Table>
    </MainLayout>
  );
};

export default StrategiesTable;
