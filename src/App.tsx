import { useState, useEffect } from 'react';
import { useTypedSelector, useAppDispatch } from './hooks/hooks';
import { getProducts, updateProduct, deleteProduct, addProduct } from './redux/productSlice';
import NewProduct from './components/NewProduct';
import ProductList from './components/ProductList';
import { Product } from './../types';
import './App.css';

function App() {
  const { loading, error, products } = useTypedSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  const handleAddProduct = () => {
    if (text.trim().length) {
      dispatch(addProduct(text));
      setText('');
    }
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleUpdateProduct = () => {
    if (productToUpdate) {
      dispatch(updateProduct({ ...productToUpdate, title: text }));
      setProductToUpdate(null);
      setText('');
    }
  };

  const handleEditProduct = (product: Product) => {
    setText(product.title);
    setProductToUpdate(product);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='container'>
      <NewProduct value={text} updateText={setText} handleAction={productToUpdate ? handleUpdateProduct : handleAddProduct} isUpdate={!!productToUpdate} />
      <div className='product_container'>
        {loading && <h2 className='info'>Loading...</h2>}
        {error && <h2 className='warning'>An error occurred: {error}</h2>}
        <ProductList products={products.products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      </div>
    </div>
  );
}

export default App;
