import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import {
  SiteContent,
  SiteHeader,
  ContentContainer,
  SiteFooter,
  Logo,
  SiteLayout,
  TriggerMenuUnfoldOutlined,
  TriggerMenuFoldOutlined,
  ContentSider,
} from "./styles";

const MainLayout: React.FC = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(true);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  const getTriggerButton = (siderCollapsed: boolean) => {
    if (siderCollapsed) return <TriggerMenuUnfoldOutlined onClick={toggleSider} />;
    else return <TriggerMenuFoldOutlined onClick={toggleSider} />;
  };

  return (
    <SiteLayout>
      <ContentSider collapsed={siderCollapsed}>
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Homepage
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Reports
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Observed
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </ContentSider>
      <Layout>
        <SiteHeader>{getTriggerButton(siderCollapsed)}</SiteHeader>
        <ContentContainer>
          <SiteContent>{children}</SiteContent>
        </ContentContainer>
        <SiteFooter>Lily Poodle ©2021 Wróbel & Węglarz</SiteFooter>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
