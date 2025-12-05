import { useState } from "react"
import { Product } from "../model/types";

interface useProductSearchProps {
    unfilteredProducts: Product[];
}

export const useProductSearch = ({unfilteredProducts}: useProductSearchProps) => {
    const [searchValue, setSearchValue] = useState("")

    const searchedProducts = unfilteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return {
        searchValue,
        setSearchValue,
        searchedProducts
    }
}