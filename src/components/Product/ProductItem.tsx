import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Card, CardContent, CardActions, Button, Typography, Grid, Box} from '@mui/material';
import {addToCart, removeFromCart, updateQuantity} from '../../store/cartSlice'
import { RootState } from "../../store/store";
import {Product} from '../../types/types';

interface ProductItemProps {
    product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({product}) => {
    const dispatch = useDispatch()
    const quantity = useSelector((state: RootState) =>
        state.cart.items.find((item) => item.id === product.id)?.quantity || 0
    );

    const handleIncrease = () => {
        dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
        } else {
            dispatch(removeFromCart(product.id));
        }
    };

    return (
        <Grid item xs="auto" sx={{mt: 3}}>
            <Card sx={{
                width: 200,
                height: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer"
            }} variant="outlined">
                <CardContent sx={{flexGrow: 1, p: 0}}>
                    <img
                        src={product.image}
                        alt="product-card"
                        style={{objectFit: "cover", width: "100%", height: 200}}
                    />
                    <Box alignItems="center" mt={1} p={1} pb={0}
                         color="text.secondary">
                        <Typography variant="body2"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        overflow: "hidden",
                                    }}>
                            {product.title}
                        </Typography>
                        <Box alignItems="center" mt="auto">
                            <Typography variant="body2"
                                        sx={{fontWeight: 'bold'}}>Рейтинг: {product.rating.rate}</Typography>
                            <Typography variant="body2" sx={{fontWeight: 'bold'}}>Цена:${product.price}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{justifyContent: "center"}}>
                    {quantity === 0 ? (
                        <Button variant="contained" fullWidth onClick={() => {dispatch(addToCart(product))}}>
                            Добавить
                        </Button>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button variant="contained" size="small" onClick={handleDecrease}>
                                    -
                                </Button>
                                <Typography>{quantity}</Typography>
                                <Button variant="contained" size="small" onClick={handleIncrease}>
                                    +
                                </Button>
                            </Box>
                        </Box>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;
