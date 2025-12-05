import { Box, CssBaseline } from "@mui/material";
import { Categories } from "./Categories.tsx";
import { Products } from "./pages/shop/shop-page.tsx";

function App() {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      {/* <SearchAppBar
        quantity={cart?.totalItems || 0}
        price={cart?.totalPrice || 0}
      /> */}
      <Box flex={1} display="flex" flexDirection="row">
        <Categories />
        <Box flex={1}>
          <Products />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
