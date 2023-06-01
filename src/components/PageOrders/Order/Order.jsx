import style from "./Order.module.css";
import { dateFormat } from "@/utils/dateFormat";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

const Order = ({ order, number }) => {
    const date = dateFormat(order?.date);
    const total = formatPrice(order?.total);
    const client = `${order?.name} ${order?.lastName}`
    const pedido = `#${number}`
    const articles = `${order?.cart?.length} artículos`
    const id = order?.id

    return (
        <div className={style.wrapper}>
            <div className={style.pedido}>
                <Link href={`/orders/${id}`}>
                    <p>{pedido}</p>
                </Link>
            </div>
            <div className={style.date}>
                <p>{date}</p>
            </div>
            <div className={style.client}>
                <p>{client}</p>
            </div>
            <div className={style.total}>
                <p>{total}</p>
            </div>
            <div className={style.pay}>
                <select>
                    <option value="por-confirmar">Por confirmar</option>
                    <option value="pagado">Pagado</option>
                    <option value="pago-pendiente">Pago pendiente</option>
                    <option value="reembolsado">Reembolsado</option>
                </select>
            </div>
            <div className={style.state}>
                <select>
                    <option value="no-preparado">No preparado</option>
                    <option value="preparado">Preparado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                </select>
            </div>
            <div className={style.articles}>
                <p>{articles}</p>
            </div>
        </div>
    );
}

export { Order };
