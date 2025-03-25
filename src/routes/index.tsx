import React, { lazy, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import ProductsList from "../components/Product/ProductsList";
import {CircularProgress} from "@mui/material";

const Cart = lazy(() => import("../components/Cart/Cart"));

interface AppRoutesProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ searchQuery, setSearchQuery}) => {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: <ProductsList searchQuery={searchQuery} />,
        },
        {
            path: "/cart",
            element: (
                <Suspense fallback={<CircularProgress size="3rem" sx={{display: "flex", justifyContent: "center", mt: 10}} />}>
                    <Cart />
                </Suspense>
            ),
        },
    ];

    return useRoutes(routes);
};

export default AppRoutes;
