import { LayoutProps } from "components/layout/interface/layout.interface";
import MenuList from "./MenuList";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      {children}
      <MenuList />
    </div>
  );
};

export default Layout;
