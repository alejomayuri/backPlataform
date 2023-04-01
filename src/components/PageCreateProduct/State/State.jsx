import style from './State.module.css'
import { useState } from 'react'

const State = ({ onChange }) => {
    const [state, setState] = useState("inactive")

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value)
        if (value === "inactive") {
            onChange(false)
        } else {
            onChange(true)
        }
    }

    console.log("state", state)

    return (
        <div className={style.container}>
            <h3 className={style.title}>Estado del producto</h3>
            <div className={style.state}>
                <div className={style.stateWrapper}>
                    <select name="state" id="state" onChange={handleChange}>
                        <option value="inactive">Inactivo</option>
                        <option value="active">Activo</option>
                    </select>
                </div>
                <p>
                    {
                        state === "inactive" ? (
                            "El producto no se mostrará en la tienda"
                        ) : (
                            "El producto se mostrará en la tienda y estará disponible para la venta"
                        )
                    }
                </p>
            </div>
        </div>
    )
}

export { State }