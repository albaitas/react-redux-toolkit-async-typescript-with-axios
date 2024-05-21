import { ProductItemProps } from '../../types';

const ProductItem = ({ product, onEdit, onDelete }: ProductItemProps) => {
  return (
    <div className='product'>
      <img src={product.thumbnail} alt={product.title} className='product_img' />
      <div className='product_content'>
        <div className='product_title'>{product.title}</div>
        <p className='product_price'>{product.price} Eur</p>
        <div className='product_buttons'>
          <button className='product_button_edit' onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className='product_button_delete' onClick={() => onDelete(product.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
