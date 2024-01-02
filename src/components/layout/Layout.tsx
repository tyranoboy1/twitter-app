import { LayoutProps } from "components/layout/interface/layout.interface";
import MenuList from "./MenuList";

/** 레이아웃 컴포넌트 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      {children}
      <MenuList />
    </div>
  );
};

export default Layout;
