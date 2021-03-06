import styled from "styled-components";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

export const SiteContent = styled.div`
  height: 100%;
  background: rgba(255, 255, 255);
  margin: 16px;
  padding: 24px;
  min-height: 360px;
`;

export const SiteHeader = styled(Header)`
  padding: 0;
`;

export const ContentContainer = styled(Content)`
  margin: 24px 16px 0;
  height: 100%;
`;

export const SiteFooter = styled(Footer)`
  text-align: center;
`;

export const Logo = styled.div`
  height: 32px;
  width: 175px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
`;

export const SiteLayout = styled(Layout)`
  height: 100vh;
`;

export const TriggerMenuUnfoldOutlined = styled(MenuUnfoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
`;
export const TriggerMenuFoldOutlined = styled(MenuFoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
`;

export const ContentSider = styled(Sider).attrs({
  breakpoint: "lg",
  collapsible: false,
  theme: "light",
})``;
