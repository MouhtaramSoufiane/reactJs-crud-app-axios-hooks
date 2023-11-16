import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

export const AppContext=createContext();

  const productsApi=axios.create({
    baseURL:"http://localhost:9000"
});

// GET
export const getProducts=(keywords="",page=1,size=4)=>{
   return productsApi.get(`/products?name_like=${keywords}&_page=${page}&_limit=${size}`);
}

//DELETE
export const deleteProduct=(product)=>{
    return productsApi.delete(`/products/${product.id}`)
}

// POST
//Template String
export const saveProduct=(product)=>{
    return productsApi.post(`/products`,product)
}

export const getProductGyId=(id)=>{
    return productsApi.get(`/products/${id}`)
}

export const checkProduct = (product)=>{
    return productsApi.put(`/products/${product.id}`,{id:product.id,name:product.name,price:product.price,checked:!product.checked})
}

export const updateProduct=(product)=>{
    return productsApi.put(`/products/${product.id}`,product)
}

export const useAppState=()=>{
    const initialState={
        products: [],
    currentPage: 1,
    pageSize: 4,
    keyword: "",
    totalPages: 0
    }
    const appState = useState(initialState);
    return appState;

}

