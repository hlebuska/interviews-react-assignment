import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { HeavyComponent } from '../../HeavyComponent';
import { useInfiniteProducts } from '../../features/shop/hooks/use-infinite-products';
import { Cart } from '../../features/shop/model/types';



export const Products = ({ onCartChange }: { onCartChange: (cart: Cart) => void }) => {
  const { products, addToCart, loading, allFetched } = useInfiniteProducts();

  return (
    <Box overflow="scroll" height="100%" >
      <Grid container spacing={2} p={2}>
        {products.map(product => (
          <Grid item xs={4} key={product.id}>
            {/* Do not remove this */}
            <HeavyComponent/>
            <Card key={product.id} style={{ width: '100%' }}>
              <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="h6" component="div">
                  ${product.price}
                </Typography>
                <Box flexGrow={1}/>
                <Box position="relative" display="flex" flexDirection="row" alignItems="center">
                  <Box position="absolute" left={0} right={0} top={0} bottom={0} textAlign="center">
                    {product.loading && <CircularProgress size={20}/>}
                  </Box>
                  <IconButton disabled={product.loading} aria-label="delete" size="small"
                              onClick={() => addToCart(product.id, -1)}>
                    <RemoveIcon fontSize="small"/>
                  </IconButton>

                  <Typography variant="body1" component="div" mx={1}>
                    {product.itemInCart || 0}
                  </Typography>

                  <IconButton disabled={product.loading} aria-label="add" size="small"
                              onClick={() => addToCart(product.id, 1)}>
                    <AddIcon fontSize="small"/>
                  </IconButton>
                </Box>

              </CardActions>
            </Card>
          </Grid>
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
