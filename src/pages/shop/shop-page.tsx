import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Slider,
  Typography
} from "@mui/material";
import { Categories } from "../../Categories";
import { useCart } from "../../features/cart/hooks/use-cart";
import { useCategories } from "../../features/products/hooks/use-categories";
import { useInfiniteProducts } from "../../features/products/hooks/use-infinite-products";
import { usePriceRange } from "../../features/products/hooks/use-price-range";
import { useProductSearch } from "../../features/products/hooks/use-product-search";
import { ProductCard } from "../../features/products/ui/product-card";
import { ProductSearchBar } from '../../features/products/ui/product-search-bar';
    
const marks = [
  {
    value: 0,
    label: '$0'
  },
  {
    value: 2500,
    label: '$2,500'
  },
  {
    value: 5000,
    label: '$5,000'
  },
];

export const ShopPage = () => {
  const { products, loading, allFetched, elementRef } = useInfiniteProducts();
  const { addToCart, isProductLoading, getProductQuantity } = useCart();
  
  const { searchValue, setSearchValue, searchedProducts } = useProductSearch({
    unsearchedProducts: products,
  });
  
  const { categories, toggleCategory, filteredProducts: categoryFilteredProducts, setCategories } =
    useCategories({ unfilteredProducts: searchedProducts });
  
  const { 
    priceRange, 
    filteredProducts: priceFilteredProducts, 
    handlePriceChange,
    setPriceRange
  } = usePriceRange({ 
    products: categoryFilteredProducts,
    initialMin: 0,
    initialMax: 5000
  });

  const handleResetPriceRange = () => {
    setPriceRange([0, 5000]);
  };

  return (
    <Box>
      <ProductSearchBar
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />
      <Box
        flex={1}
        display="flex"
        flexDirection="row"
        height="calc(100vh - 80px)"
      >
        <Categories
          categories={categories}
          onCategorySelect={(selectedCategory) =>
            toggleCategory(selectedCategory)
          }
          onCategoryClear={() => setCategories([])}
        />
        <Box flex={1} display="flex" flexDirection="column">
          <Box display="flex" gap={1} p={2}>
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              width={200}
            >
              Total products: {priceFilteredProducts.length}
            </Box>
            <Divider orientation="vertical" />
            <Box 
              width={400} 
              display="flex" 
              gap={3} 
              justifyContent="center" 
              alignItems="center"
            >
              <Typography>Price range:</Typography>
              <Slider
                getAriaLabel={() => "Price range"}
                min={0}
                max={5000}
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                marks={marks}
              />
              <IconButton
              style={{marginBottom: 15}}
                children={<RestartAltIcon />}
                onClick={handleResetPriceRange}
              >
              </IconButton>
            </Box>
          </Box>

          <Box
            flex={1}
            ref={elementRef}
            overflow="auto"
            sx={{
              paddingRight: 2,
            }}
          >
            <Grid container spacing={2} p={2}>
              {priceFilteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(quantity) => {
                    addToCart(product.id, quantity);
                  }}
                  isLoading={isProductLoading(product.id)}
                  cartQuantity={getProductQuantity(product.id)}
                />
              ))}

              {loading && (
                <Grid
                  item
                  xs={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Grid>
              )}

              {allFetched && !searchValue && (
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1" my={2}>
                    All products are loaded.
                  </Typography>
                </Grid>
              )}

              {searchValue && searchedProducts.length === 0 && !loading && (
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1" my={2}>
                    No products found for "{searchValue}"
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
