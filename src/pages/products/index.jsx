import React from 'react';
import ProductsComponent from '../components/productsComponent';

const Products = ({ productsData }) => {
    return (
        <div>
        <ProductsComponent products={productsData}/>
        </div>
    );
};

export default Products;

export async function getStaticProps() {
    const res = await fetch("http://localhost:4000/products");
    const data = await res.json();
    
    return {
        props: {
            productsData: data 
        }
    };
}