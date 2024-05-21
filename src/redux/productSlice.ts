import { createSlice, createAsyncThunk, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { Product, ProductsResponse, ProductsState } from '../../types';
import axios from 'axios';

const initialState: ProductsState = {
  products: { products: [] },
  loading: false,
  error: null
};

export const getProducts = createAsyncThunk<Product[], void, { rejectValue: string }>('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProductsResponse>('https://dummyjson.com/products');
    return response.data.products;
  } catch (error) {
    return rejectWithValue('Server Error!');
  }
});

export const addProduct = createAsyncThunk<Product, string, { rejectValue: string }>('products/addProduct', async (text, { rejectWithValue }) => {
  try {
    const response = await axios.post<Product>(
      'https://dummyjson.com/products/add',
      {
        id: 31,
        title: text,
        description: 'This is one of the best and amazing t-shirt in the market',
        price: 99,
        thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Can't add task. Server error.");
  }
});

export const deleteProduct = createAsyncThunk<number, number, { rejectValue: string }>('products/deleteProduct', async (productId, { rejectWithValue }) => {
  try {
    await axios.delete<number>(`https://dummyjson.com/products/${productId}`);
    return productId;
  } catch (error) {
    return rejectWithValue("Can't delete product. Server error.");
  }
});

export const updateProduct = createAsyncThunk<Product, Product, { rejectValue: string }>('products/updateProduct', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.patch<Product>(
      `https://dummyjson.com/products/${product.id}`,
      {
        title: product.title
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Can't add task. Server error.");
  }
});

function isError(action: UnknownAction) {
  return action.type.endsWith('rejected');
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products.products = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products.products = state.products.products.filter((product) => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products.products[index] = action.payload;
        }
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default productSlice.reducer;
