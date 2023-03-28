import style from "./Stock.module.css";

const Stock = ({ onChange, handleSaleWithoutStock }) => {
    return (
        <div className={style.container}>
            <h3>Inventario</h3>
            <div className={style.stockWrapper}>
                <h3>Stock</h3>
                <input
                    type="text"
                    onChange={onChange}
                    name="stock"
                    className={style.stock}
                />
            </div>
            <div className={style.noStock}>
                <input type="checkbox" name="saleWithoutStock" 
                    onChange={handleSaleWithoutStock}
                />
                <label htmlFor="saleWithoutStock">Continuar vendiendo cuando esté agotado</label>
            </div>
        </div>
    );
}

export { Stock };