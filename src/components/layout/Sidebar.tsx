import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { navbarGenerator } from "../../utils/navbarGenerator";

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const role = "admin";
  let navbarItems;
  switch (role) {
    case userRole.ADMIN:
      navbarItems = navbarGenerator(adminPaths, "admin");
      break;
    default:
      break;
  }
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={navbarItems}
      />
    </Sider>
  );
};

export default Sidebar;
