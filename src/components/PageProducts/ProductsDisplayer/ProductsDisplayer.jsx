import style from './ProductsDisplayer.module.css';
import { Product } from "@/components/global/Product/Product";
import { useEffect, useState } from "react";

const ProductsDisplayer = ({ products }) => {
    const [productsToDisplay, setProductsToDisplay] = useState([]);

    useEffect(() => {
        products.map((product) => {
            if (product?.variations?.length > 0) {
                console.log("product.variations", product.variations)
                product.variations.map((variation) => {
                    setProductsToDisplay((prevState) => [
                        ...prevState,
                        { ...product, variation },
                    ]);
                });
            } else {
                setProductsToDisplay((prevState) => [...prevState, product]);
            }
        });
    }, [products]);

    console.log("productsToDisplay", productsToDisplay)

    return (
            <div className={style.header}>
                <div className={style.product}>
                    <div className={style.product__image}></div>
                    <div className={style.product__name}>
                        <p>Nombre</p>
                    </div>
                    <div className={style.product__sku}>
                        <p>SKU</p>
                    </div>
                    <div className={style.product__price}>
                        <p>Precio</p>
                    </div>
                    <div className={style.product__stock}>
                        <p>Stock</p>
                    </div>
                </div>
            {productsToDisplay?.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export { ProductsDisplayer };