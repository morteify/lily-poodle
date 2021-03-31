import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { SiteContent, SiteHeader, ContentContainer, SiteFooter, Logo, SiteLayout, ContentSider } from "./styles";

const MainLayout: React.FC = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  return (
    <SiteLayout>
      <SiteHeader>
        <Logo />
      </SiteHeader>

      <Layout>
        <ContentSider collapsed={siderCollapsed} onCollapse={toggleSider} data-testid="main-layout-sider">
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
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
