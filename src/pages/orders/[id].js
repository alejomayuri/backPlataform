import { Layout } from "@/layouts/Layout";
import { useRouter } from "next/router";
import { useFunctions } from "@/hooks/useFunctions";
import { useEffect, useState } from "react";
import { Cart } from "@/components/PageSingleOrder/Cart/Cart";
import { BoxLayout } from "@/components/PageCreateProduct/BoxLayout/BoxLayout";
import { Payment } from "@/components/PageSingleOrder/Payment/Payment";
import { Notes } from "@/components/PageSingleOrder/Notes/Notes";
import { Client } from "@/components/PageSingleOrder/Client/Client";
import { dateFormat } from "@/utils/dateFormat";

export default function OrderDetail(props) {
    const { data } = props
    const functions = useFunctions({data})
    const fetchSingleOrder = functions?.fetchSingleOrder
    const fetchSingleProduct = functions?.fetchSingleProduct

    const [order, setOrder] = useState({})

    const router = useRouter()
    const { id } = router.query
    
    useEffect(() => {
        if (fetchSingleOrder) {
            fetchSingleOrder(id).then((data) => {
                setOrder(data)
        }
    )}}, [functions?.loaded])
    
    return (
        <Layout>
            <div className="content__wrapper">
                <h1>Order {id}</h1>
                <p>
                    <span>Fecha: </span>
                    {dateFormat(order?.date)}
                </p>
                <div>
                    <div>
                        <BoxLayout title={"Productos"}>
                            {
                                order?.cart?.map((cart, key) => {
                                    return (
                                        <Cart key={key} cart={cart} fetchSingleProduct={fetchSingleProduct} />
                                    )
                                })
                            }
                        </BoxLayout>
                        <BoxLayout title={"Pago"}>
                            <Payment order={order} />
                        </BoxLayout>
                    </div>
                    <div>
                        <BoxLayout title={"Notas"} small>
                            <Notes notes={order?.notes} />
                        </BoxLayout>
                        <BoxLayout title={"Cliente"} small>
                            <Client order={order} />
                        </BoxLayout>
                    </div>
                </div>
            </div>
        </Layout>
    );
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
