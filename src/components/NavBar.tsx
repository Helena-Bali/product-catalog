import React, {JSX} from 'react';
import {Container, Button, AppBar, Toolbar, Box, Badge, TextField} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import CartIcon from "./Cart/CartIcon";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface NavBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}


const NavBar = ({searchQuery, setSearchQuery}: NavBarProps): JSX.Element => {
    const navigate = useNavigate();
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <AppBar position="sticky" color="primary">
            <Container>
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <NavLink to={"/"} style={{color: 'white', textDecoration: 'none'}}>
                        MY SHOP
                    </NavLink>
                    <Box sx={{flexGrow: 1}}/>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Поиск товаров..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                            width: 250,
                            mx: 2,
                        }}
                    />
                    <Box display="flex" alignItems="center" sx={{ml: 'auto'}}>

                        <Button
                            color="inherit"
                            onClick={() => navigate("/cart")}
                            sx={{marginRight: "10px"}}
                        >
                                <Badge color="error" badgeContent={totalQuantity} invisible={totalQuantity === 0}>
                                    <CartIcon/>
                                </Badge>
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
