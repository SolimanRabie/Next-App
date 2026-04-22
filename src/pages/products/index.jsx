import React from "react";
import ProductsComponent from "../components/productsComponent";

const Products = ({ productsData }) => {
  return (
    <div>
      <ProductsComponent products={productsData} />
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return {
      props: {
        productsData: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        productsData: [],
      },
      revalidate: 10,
    };
  }
}
