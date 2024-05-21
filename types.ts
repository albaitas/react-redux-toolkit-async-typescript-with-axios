export interface Product {
  id: number;
  title: string;
  descriptions: string;
  price: number;
  thumbnail: string;
}
export interface ProductsResponse {
  products: Product[];
}
export interface ProductsState {
  products: ProductsResponse;
  loading: boolean;
  error: string | null;
}
export interface Products {
  product: Product[];
}
export interface NewProductProps {
  value: string;
  updateText: (text: string) => void;
  handleAction: () => void;
  isUpdate: boolean;
}
export interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}
export interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}
