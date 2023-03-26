import style from './Product.module.css';

const Product = ({ product }) => {
    return (
        <div className={style.product}>
            <div className={style.product__image}>
                <img src={product?.image} alt={product?.name} />
            </div>
            <div className={style.product__info}>
                <h3>{product?.name}</h3>
                <p>{product?.price}</p>
            </div>        
        </div>
    );
}

export { Product }