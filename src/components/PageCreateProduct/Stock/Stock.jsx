import style from "./Stock.module.css";
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Stock = ({ onChange, handleSaleWithoutStock }) => {
    return (
        // <div className={style.container}>
            <BoxLayout title="Inventario">
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
                <div>
                    <input type="checkbox" name="saleWithoutStock" 
                        onChange={handleSaleWithoutStock}
                    />
                    <label htmlFor="saleWithoutStock">Continuar vendiendo cuando esté agotado</label>
                </div>
            </div>
            </BoxLayout>
        // </div>
    );
}

export { Stock };