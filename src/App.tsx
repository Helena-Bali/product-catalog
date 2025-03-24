import React, { useState } from "react";
import NavBar from "./components/NavBar";
import ProductsList from "./components/Product/ProductsList";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes";

function App() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    return (
        <BrowserRouter>
            <NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
            <AppRoutes searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </BrowserRouter>

    );
}

export default App;
