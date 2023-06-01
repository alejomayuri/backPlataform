import { useEffect, useState } from 'react'
import { useFunctions } from "@/hooks/useFunctions";
import { Layout } from "@/layouts/Layout";
import { OrdersDisplayer } from '@/components/PageOrders/OrdersDisplayer/OrdersDisplayer';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Orders(props) {
    const { currentUser, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!currentUser && !loading) {
            router.push("/")
        }
    }, [currentUser, loading, router])

    const { data } = props
    const [orders, setOrders] = useState([])
    const functions = useFunctions({data})
    const fetchOrders = functions?.fetchOrders;

    useEffect(() => {
        if (fetchOrders) {
            fetchOrders().then((data) => {
                setOrders(data)
        }
    )}}, [functions?.loaded])

    console.log(orders)

    return (
        <Layout>
            <div className="content__wrapper_big">
                <h1>Pedidos</h1>
                <OrdersDisplayer orders={orders} />
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