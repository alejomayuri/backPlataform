import { Layout } from "@/layouts/Layout";
import { useRouter } from "next/router";

const OrderDetail = ({ order, number }) => {
    const router = useRouter()
    const { id } = router.query
    return (
        <Layout>
            <h1>Order {id}</h1>
        </Layout>
    );
}

export default OrderDetail;
