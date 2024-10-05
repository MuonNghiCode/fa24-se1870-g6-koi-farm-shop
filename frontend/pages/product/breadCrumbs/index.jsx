import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ current }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Link to="/products">All Fish</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{current}</Breadcrumb.Item>
  </Breadcrumb>
);
export default Breadcrumbs;
