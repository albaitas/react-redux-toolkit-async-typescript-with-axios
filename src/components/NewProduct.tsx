import { NewProductProps } from '../../types';

const NewProduct = ({ value, updateText, handleAction, isUpdate }: NewProductProps) => {
  return (
    <div className='new_product'>
      <input className='product_input' placeholder='Enter product title' value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateText(e.target.value)} />
      <button className='change_button' onClick={handleAction}>
        {isUpdate ? 'Update Product' : 'Add Product'}
      </button>
    </div>
  );
};

export default NewProduct;
