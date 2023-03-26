import style from "./Price.module.css";

const Price = ({ onChange }) => {
    return (
        <div className={style.container}>
            <h3>Precio</h3>
            <div className={style.priceWrapper}>
                <div>
                    <h3>Precio</h3>
                    <div className={style.priceInputWrapper}>
                        <select
                            onChange={onChange}
                            name="currency"
                            className={style.currency}
                        >
                            <option defaultValue value="PEN">PEN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <input
                            type="text"
                            onChange={onChange}
                            name="price"   
                            className={style.price} 
                        />
                    </div>
                </div>
                <div>
                    <h3 className={style.comparisonPriceTitle} >Precio de comparación</h3>
                    <input
                        type="text"
                        onChange={onChange}
                        name="comparisonPrice"
                        className={style.comparisonPrice} 
                    />
                </div>
            </div>
        </div>
    );
}

export { Price };