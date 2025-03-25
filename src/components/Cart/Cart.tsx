import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../../store/cartSlice";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    IconButton,
    TextField,
    Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state: RootState) => state.cart);

    return (
        <Container sx={{ mt: 3 }}>
            {items.length === 0 ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" align="center">
                            Ваша корзина пуста
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Корзина</Typography>
                                {items.map((item) => (
                                    <Box
                                        key={item.id}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ mb: 2, borderBottom: "1px solid #ddd", pb: 1 }}
                                    >
                                        <Typography sx={{maxWidth: "300px"}}>{item.title}</Typography>
                                        <TextField
                                            size="small"
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                                            }
                                            sx={{ maxWidth: 70 }}
                                        />
                                        <Typography> ${item.price * item.quantity} </Typography>
                                        <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Итого: ${totalPrice}</Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => dispatch(clearCart())}
                                >
                                    Очистить корзину
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Cart;

