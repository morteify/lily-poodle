import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { OrderedListOutlined, LineChartOutlined } from "@ant-design/icons";
import { SiteContent, SiteHeader, ContentContainer, SiteFooter, Logo, SiteLayout, ContentSider } from "./styles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { mainLayoutActions } from "../../slices";
import { RootState } from "../../../../app/types";

const MainLayout: React.FC = ({ children }) => {
  const currentlySelectedKey = useSelector((state: RootState) => state.mainLayout.currentlySelectedMenuKey);
  const isSideMenuCollapsed = useSelector((state: RootState) => state.mainLayout.isMenuCollapsed);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleSider = () => {
    dispatch(mainLayoutActions.toggleMenuCollapsed());
  };

  const handleMenuKeyChange = (key: string) => {
    dispatch(mainLayoutActions.changeCurrentlySelectedMenuKey(key));
    history.push(key);
  };

  useEffect(() => {
    dispatch(mainLayoutActions.changeCurrentlySelectedMenuKey(history?.location.pathname));
  }, [dispatch, history?.location.pathname]);

  return (
    <SiteLayout>
      <SiteHeader>
        <Logo />
      </SiteHeader>

      <Layout>
        <ContentSider collapsed={true} onCollapse={toggleSider} data-testid="main-layout-sider">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[currentlySelectedKey]}
            selectedKeys={[currentlySelectedKey]}
          >
            <Menu.Item key="/strategy-view" icon={<OrderedListOutlined />} onClick={() => handleMenuKeyChange("/")}>
              Ranking
            </Menu.Item>
            {/* <Menu.Item
              key="/market-and-strategy-overview"
              icon={<LineChartOutlined />}
              onClick={() => handleMenuKeyChange("/market-and-strategy-overview")}
            >
              Market & Strategy
            </Menu.Item> */}
          </Menu>
        </ContentSider>
        <Layout>
          <ContentContainer>
            <SiteContent data-testid="main-layout-site-content">{children}</SiteContent>
          </ContentContainer>
          <SiteFooter>Lily Poodle ©2021 Wróbel & Węglarz</SiteFooter>
        </Layout>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
