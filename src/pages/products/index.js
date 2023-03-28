import { ProductsDisplayer } from "@/components/PageProducts/ProductsDisplayer/ProductsDisplayer"
import { useEffect, useState } from 'react'
import { useFunctions } from "@/hooks/useFunctions";
import { CreateProductForm } from "@/components/PageProducts/CreateProductForm/CreateProductForm";
import { Layout } from "@/layouts/Layout";

export default function Products(props) {
    const { data } = props
    const [products, setProducts] = useState([])
    const functions = useFunctions({data})
    const fetchProducts = functions?.fetchProducts;
    const handleCreateProduct = functions?.handleRegisterProduct;

    useEffect(() => {
        if (fetchProducts) {
            fetchProducts().then((data) => {
            setProducts(data)
        }
    )}}, [functions?.loaded])

    console.log(products)

    return (
        <Layout>
            <div className="container">
                <ProductsDisplayer products={products} />
                <CreateProductForm handleCreateProduct={handleCreateProduct} />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    // Conéctate al primer servidor de Firebase para obtener la información necesaria para conectarte al segundo servidor
    const response = await fetch('https://us-central1-back-plataform.cloudfunctions.net/function-2');
    const data = await response.json();
  
    return {
      props: {
        data
      }
    };
}