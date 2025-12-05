import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
} from "@mui/material";
import { HeavyComponent } from "../../../HeavyComponent";
import { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  isLoading: boolean;
  cartQuantity: number;
}

export function ProductCard({ product, onAddToCart, isLoading, cartQuantity }: ProductCardProps) {
  return (
    <Grid item xs={4} key={product.id}>
      {/* Do not remove this */}
      <HeavyComponent />
      <Card key={product.id} style={{ width: "100%" }}>
        <CardMedia component="img" height="150" image={product.imageUrl} />
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
          <Box flexGrow={1} />
          <Box
            position="relative"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Box
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              textAlign="center"
            >
              {isLoading && <CircularProgress size={20} />}
            </Box>
            <IconButton
              disabled={isLoading}
              aria-label="delete"
              size="small"
              onClick={() => onAddToCart(-1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography variant="body1" component="div" mx={1}>
              {cartQuantity || 0}
            </Typography>

            <IconButton
              disabled={isLoading}
              aria-label="add"
              size="small"
              onClick={() => onAddToCart(1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
