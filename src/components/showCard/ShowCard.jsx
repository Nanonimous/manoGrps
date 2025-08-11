import React from "react";
import  {ProductCard_1}  from "../ProductCard_1/ProductCard_1.jsx";
import sc from  "./ShowCard.module.css";
import  {ProductCard_2}  from "../ProductCard_2/ProductCard_2.jsx";
import { ProductCard_3 } from '../ProductCard_3/ProductCard_3';

// Use in your component

export  const ShowCard = ()=>{
    return (
        <>
        <div className={sc.mainCardContainer}>
            <div className={sc.cardContainer}>
            <ProductCard_1 
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
            <ProductCard_1 
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
            <ProductCard_1 
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
            <ProductCard_1 
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
            <ProductCard_1 
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
                        <ProductCard_2
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
                        <ProductCard_2
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
                        <ProductCard_2
            image="/images/productCard/card.jpg"
            title="Off-Road 4W Car Hot Wheels"
            cat="Hot Wheels"
            price="1700"
            />
            <ProductCard_3 
            image="/images/productCard/card.jpg"
            ProductName="Off-Road 4W Car Hot Wheels"
            ProductBrand="Off-Road 4W Car Hot Wheels"
            summary="Long distance running requires a lot from athletes."
            price="1700"
            productCode = "1269"
            RemainingProducts = "1269"
            />
            </div>
        </div>
        </>
    )
}