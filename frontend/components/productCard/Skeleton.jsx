import { Skeleton } from "antd";

const ProductSkeleton = () => {
  return (
    <Skeleton active>
      <div className="product-card">
        <Skeleton.Image />
        <Skeleton.Title />
        <Skeleton.Paragraph />
      </div>
    </Skeleton>
  );
};

export default ProductSkeleton;
