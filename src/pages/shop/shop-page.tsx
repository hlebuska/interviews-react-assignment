import {
  Box,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { useInfiniteProducts } from '../../features/shop/hooks/use-infinite-products';
import { ProductCard } from '../../features/shop/ui/product-card';
import { useCart } from '../../features/cart/hooks/use-cart';

export const Products = () => {
  const { products, loading, allFetched } = useInfiniteProducts();
  const { addToCart, isProductLoading, getProductQuantity } = useCart();

  console.log(getProductQuantity(0), 'Initial quantity for product 0');

  return (
    <Box overflow="scroll" height="100%" >
      <Grid container spacing={2} p={2}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(quantity) => {
              console.log('Adding to cart:', product.id, quantity);
              addToCart(product.id, quantity)
            }}
            isLoading={isProductLoading(product.id)}
            cartQuantity={getProductQuantity(product.id)}
          />
      ))}

        {loading && <Grid item xs={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress></CircularProgress> 
        </Grid>}

        {allFetched && <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant="body1" component="div" my={2}>
            All products are loaded.
          </Typography>
        </Grid>}
        
      </Grid>
    </Box>
  );
};
