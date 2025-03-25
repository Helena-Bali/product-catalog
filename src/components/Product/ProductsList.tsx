import React, {useEffect, useState, useMemo} from "react";
import {Grid, CircularProgress, Typography, Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/productsSlice";
import {RootState, AppDispatch} from "../../store/store";
import ProductItem from "./ProductItem";
import Categories from "./Categories";

interface ProductsListProps {
    searchQuery: string;
}

const ProductsList: React.FC<ProductsListProps> = ({searchQuery}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error} = useSelector((state: RootState) => state.products);
    const [category, setCategory] = useState<string>("all");

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = category === "all" || product.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, category]);

    return (
        <>
            <Categories category={category} setCategory={setCategory}/>
            {loading && <Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
                Загрузка...
                <CircularProgress size="3rem"/>
            </Box>}
            {error && <Typography color="error">Ошибка: {error}</Typography>}

            <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                    <Grid key={product.id} container spacing={1} justifyContent="center" xs={12} sm={5} md={3} lg={2.4}>
                        <ProductItem product={product}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductsList
