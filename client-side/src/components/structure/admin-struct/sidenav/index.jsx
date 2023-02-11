import React from "react";

import { Layout, Menu, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import "./admin-struct.m.css";
const { Header, Content, Footer, Sider } = Layout;
const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    children: null,
  },
  {
    label: "Languages",
    icon: <LanguageIcon />,
    children: null,
  },
  {
    label: "Users",
    icon: <PersonIcon />,
    children: null,
  },
  {
    label: "Exams",
    icon: <DashboardIcon />,
    children: [
      {
        label: "Categories",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Question Bank",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Quiz",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Exam Types",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Exam Series",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Instructions",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Subjects Master",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Subject Topics",
        icon: <DashboardIcon />,
        children: null,
      },
    ],
  },
  {
    label: "LMS",
    icon: <DashboardIcon />,
    children: [
      {
        label: "Categories",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Contents",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "Series",
        icon: <DashboardIcon />,
        children: null,
      },
    ],
  },
  {
    label: "Resumes Templates",
    icon: <DashboardIcon />,
    children: null,
  },
  {
    label: "Feedback",
    icon: <DashboardIcon />,
    children: null,
  },
  {
    label: "Pages",
    icon: <DashboardIcon />,
    children: null,
  },
  {
    label: "FAQs",
    icon: <DashboardIcon />,
    children: [
      {
        label: "Categories",
        icon: <DashboardIcon />,
        children: null,
      },
      {
        label: "FAQs",
        icon: <DashboardIcon />,
        children: null,
      },
    ],
  },
];

const profile = [
  {
    key: "admin",
    icon: <Avatar size="large" icon={<UserOutlined />} />,
    children: [
      {
        label: "My Profile",
      },
      {
        label: "Change Password",
      },
      {
        label: "Logout",
      },
    ],
  },
];

const SideNav = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        className="header"
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="fs-2 fw-bold">OES</div>
          <div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={profile}
            />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            background: colorBgContainer,
          }}
        >
          <div className="logo" />
          <Menu
            //   theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={navItems.map((values, index) => {
              const key = String(index + 1);
              return {
                key: index,
                icon: values.icon,
                label: values.label,
                children: values.children?.map((child, j) => {
                  const subKey = index * 4 + j + 1;
                  return {
                    key: `catg-${index}-subcatg-${j}`,
                    label: child.label,
                    icon: child.icon,
                  };
                }),
              };
            })}
          />
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SideNav;
