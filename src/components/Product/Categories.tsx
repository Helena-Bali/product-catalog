import React from "react";
import {Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface CategoriesProps {
    category: string;
    setCategory: (category: string) => void

}


const Categories: React.FC<CategoriesProps> = ({category, setCategory}) => {

    return (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <FormControl sx={{ minWidth: 200}} size="small">
                    <InputLabel>Категории</InputLabel>
                    <Select value={category} label="Категории" onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value="all">Все</MenuItem>
                        <MenuItem value="electronics">Электроника</MenuItem>
                        <MenuItem value="jewelery">Ювелирные изделия</MenuItem>
                        <MenuItem value="men's clothing">Мужская одежда</MenuItem>
                        <MenuItem value="women's clothing">Женская одежда</MenuItem>
                    </Select>
                </FormControl>
            </Box>
    );
};

export default Categories;
