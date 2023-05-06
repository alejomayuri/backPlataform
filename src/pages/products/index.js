import { useEffect, useState } from 'react'
import { useFunctions } from "@/hooks/useFunctions";
import { Layout } from "@/layouts/Layout";
import { ProductsDisplayer } from "@/components/PageProducts/ProductsDisplayer/ProductsDisplayer"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Products(props) {
    const { currentUser, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!currentUser && !loading) {
            router.push("/")
        }
    }, [currentUser, loading, router])

    const { data } = props
    const [products, setProducts] = useState([])
    const functions = useFunctions({data})
    const fetchProducts = functions?.fetchProducts;
    const editProduct = functions?.editProduct;

    useEffect(() => {
        if (fetchProducts) {
            fetchProducts().then((data) => {
            setProducts(data)
        }
    )}}, [functions?.loaded])

    return (
        <Layout>
            <div className="content__wrapper_big">
                <h1>Productos</h1>
                <ProductsDisplayer products={products} editProduct={editProduct} />
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