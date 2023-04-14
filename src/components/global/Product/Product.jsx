import style from './Product.module.css';

const Product = ({ product }) => {
    return (
        <div className={style.product}>
            <div className={style.product__image}>
                <img src={product?.image} alt={product?.name} />
            </div>
            <div className={style.product__name}>
                <h3>{product?.name}</h3>
                {
                    product?.variation && (
                        <p>{product?.variation.name}</p>
                    )
                }
            </div>
            <div className={style.product__sku}>
                {
                    product?.variation ? (
                        <p>{`${product?.id} - ${product?.variation.name}`}</p>
                    ) : (
                        <p>{product?.id}</p>
                    )
                }
            </div>
            <div className={style.product__price}>
                {
                    product?.variation ? (
                        // <p>{product?.variation.price}</p>
                        <input type="number" name='price' value={product?.variation.price} />
                    ) : (
                        // <p>{product?.price}</p>
                        <input type="number" name='price' value={product?.price} />
                    )
                }
            </div>
            <div className={style.product__stock}>
                {
                    product?.variation ? (
                        // <p>{product?.variation.price}</p>
                        <input type="number" name='stock' value={product?.variation.stock} />
                    ) : (
                        // <p>{product?.stock}</p>
                        <input type="number" name='stock' value={product?.stock} />
                    )
                }
            </div>
        </div>
    );
}

export { Product }