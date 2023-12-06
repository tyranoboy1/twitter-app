import { LayoutProps } from "components/layout/interface/layout.interface";

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
