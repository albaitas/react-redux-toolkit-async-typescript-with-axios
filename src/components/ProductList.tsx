import { ProductListProps } from '../../types';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  return (
    <>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
};

export default ProductList;
