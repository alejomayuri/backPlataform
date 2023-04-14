import style from './Option.module.css'
import { useState, useEffect } from 'react'
import DeleteIcon from '@/components/global/icons/DeleteIcon';

const Option = ({ optionId, optionName, onChange, handleDeleteOptions, optionValues }) => {
    const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
    const values = inputs.map(input => input.value);
    const [name, setName] = useState("");
    const [hideThisOption, setHideThisOption] = useState(false);

    const handleName = (e) => {
        setName(e.target.value)
    }

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

    //   onChange(optionId, name, values)
    };

    useEffect(() => {
        onChange(optionId, name, values)
    }, [name,  optionId, inputs])

    const handleDelete = () => {
        handleDeleteOptions(optionId)
        setHideThisOption(true)
    }

    const handleDeleteOption = (id) => {
        setInputs(inputs.filter(input => input.id !== id))
    }

    return (
        <div className={`${style.option} ${hideThisOption ? style.hide : ""}`}>
            <div className={style.optionName}>
                <label htmlFor="options">Nombre de la opción</label>
                <div className={style.valueWrapper}>
                    <input type="text" name="name_option" placeholder="Color" onChange={handleName} />
                    <button onClick={handleDelete} className={style.deleteValue}>
                        <DeleteIcon stroke={"#c1c1c1"} width="23px" height="22px" />
                    </button>
                </div>
            </div>
            <div className={style.optionValue}>
                <label htmlFor="options">Valores de la opción</label>
                {inputs.map(input => (
                    <div className={style.valueWrapper} key={input.id}>
                        <input
                            key={input.id}
                            // value={input.value}
                            onChange={e => handleInputChange(input.id, e.target.value)}
                            name="values_option"
                            className={style.value}
                            placeholder={input.id === 1 ? "Rojo" : "Agregar otro valor"}
                        />
                        {
                            input.value !== "" && (
                                <button onClick={() => handleDeleteOption(input.id)} className={style.deleteValue}>
                                    <DeleteIcon stroke={"#c1c1c1"} width="23px" height="22px" />
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Option }