import style from './ProductsDisplayer.module.css';
import { Product } from "@/components/global/Product/Product";

const ProductsDisplayer = ({ products }) => {
    return (
        <div className={style.ProductsDisplayer}>
            {products?.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export { ProductsDisplayer };