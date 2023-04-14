import style from './Organization.module.css'
import { useEffect, useState } from 'react'
import DeleteIcon from '@/components/global/icons/DeleteIcon';
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Organization = ({ onChangeCats, onChange }) => {
    const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
    const OPTIONS = ["Ropa", "Accesorios", "Calzado", "Juguetes", "Mascotas", "Colección de Verano"]

    const values = inputs.map(input => input.value);

    const handleInputChange = (id, value) => {
        const newInputs = inputs.map(input => {
          if (input.id === id) {
            return { ...input, value };
          }
          return input;
        });
        setInputs(newInputs);
    
        const lastInput = newInputs[newInputs.length - 1];
        if (lastInput.value !== "") {
          setInputs([...newInputs, { id: lastInput.id + 1, value: "" }]);
        }
    };

    const handleDeleteOption = (id) => {
        setInputs(inputs.filter(input => input.id !== id))
    }

    useEffect(() => {
        onChangeCats(values)
    }, [inputs])

    return (
        <BoxLayout small title="Organización">
            <div>
                <h3>Categorías</h3>
                {inputs.map(input => (
                    <div className={style.valueWrapper} key={input.id}>
                        <select
                            name="state"
                            onChange={e => handleInputChange(input.id, e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            {OPTIONS.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {
                            input.value !== "" && (
                                <button onClick={() => handleDeleteOption(input.id)} className={style.deleteValue}>
                                    <DeleteIcon width="25px" height="25px" />
                                </button>
                            )
                        }
                    </div>
                ))}
                <p>
                    Para que tu producto aparezca en las páginas de las categorías, <b>debes
                    seleccionar al menos una categoría.</b>
                </p>
            </div>
            <div>
                <h3>Subcategoria</h3>
                <input type="text" name="subcategory" onChange={onChange} />
                <p>
                    La <b>subcategoría</b> es una forma de organizar los productos de tu tienda.
                </p>
            </div>
            <div>
                <h3>Palabras Clave</h3>
                <textarea type="text" name="keywords" onChange={onChange} />
                <p>
                    Las palabras clave sirven para que los clientes encuentren tu producto
                    usando el <b>buscador de la tienda</b>.
                </p>
            </div>
        </BoxLayout>
    )
}

export { Organization }