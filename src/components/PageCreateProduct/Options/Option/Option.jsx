import style from './Option.module.css'
import { useState, useEffect } from 'react'

const Option = ({ optionId, optionName, onChange, handleDeleteOptions, optionValues }) => {
    // const getInitialInputs = () => {
    //     if (!(optionValues.length === 1 && optionValues[0] === "")) {
    //         return optionValues.map((value, index) => ({ id: index + 1, value }))
    //     }
    //     return [{ id: 1, value: "" }]
    // }
    // console.log("optionValues", optionValues)
    // console.log("getInitialInputs", getInitialInputs())
    const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
    const values = inputs.map(input => input.value);
    const [name, setName] = useState("");
    const [hideThisOption, setHideThisOption] = useState(false);
    // console.log("inputs",inputs);
    // console.log(values);

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
        // setInputs(optionValues.map((value, index) => ({ id: index + 1, value })))
        // onChange(optionId, name, values)
        setHideThisOption(true)
    }

    return (
        <div className={`${style.option} ${hideThisOption ? style.hide : ""}`}>
            <div className={style.optionName}>
                <label htmlFor="options">Nombre de la opción</label>
                <input type="text" name="name_option" placeholder="Color" onChange={handleName} />
            </div>
            <div className={style.optionValue}>
                <label htmlFor="options">Valores de la opción</label>
                {inputs.map(input => (
                    <input
                        key={input.id}
                        // value={input.value}
                        onChange={e => handleInputChange(input.id, e.target.value)}
                        name="values_option"
                        className={style.value}
                        placeholder={input.id === 1 ? "Rojo" : "Agregar otro valor"}
                    />
                ))}
            </div>
            <div className={style.optionDelete}>
                <button onClick={handleDelete}>Eliminar opción</button>
            </div>
        </div>
    )
}

export { Option }