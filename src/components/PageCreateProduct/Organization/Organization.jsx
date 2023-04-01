import style from './Organization.module.css'
import { useState } from 'react'
import DeleteIcon from '@/components/global/icons/DeleteIcon';

const Organization = ( ) => {
    const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
    console.log("inputs", inputs)
    const handleInputChange = (id, value) => {
        // Actualiza el valor del input correspondiente
        const newInputs = inputs.map(input => {
          if (input.id === id) {
            return { ...input, value };
          }
          return input;
        });
        setInputs(newInputs);
    
        // Agrega un nuevo input si el último input tiene un valor
        const lastInput = newInputs[newInputs.length - 1];
        if (lastInput.value !== "") {
          setInputs([...newInputs, { id: lastInput.id + 1, value: "" }]);
        }
      };

    return (
        <div className="container">
            <h3 className="organization__title">Organización</h3>
            <div>
                <h3>Categorías</h3>
                {inputs.map(input => (
                    <div className={style.valueWrapper} key={input.id}>
                        {/* <input
                            key={input.id}
                            // value={input.value}
                            onChange={e => handleInputChange(input.id, e.target.value)}
                            name="values_option"
                            className={style.value}
                            placeholder={input.id === 1 ? "Rojo" : "Agregar otro valor"}
                        /> */}
                        <select
                            name="state"
                            onChange={e => handleInputChange(input.id, e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Juguetes">Juguetes</option>
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
            </div>
        </div>
    )
}

export { Organization }