import style from './Organization.module.css'
import { useEffect, useState } from 'react'
import DeleteIcon from '@/components/global/icons/DeleteIcon';
import { BoxLayout } from "../BoxLayout/BoxLayout";

const Organization = ({ onChangeCats, onChange, categories, subcat, keywords }) => {
    const [inputs, setInputs] = useState([])
    const [initialCategories, setInitialCategories] = useState([])
    const [subcatState, setSubcatState] = useState(null)
    const [keywordsState, setKeywordsState] = useState(null)
    const OPTIONS = ["Ropa", "Accesorios", "Calzado", "Juguetes", "Mascotas", "Colección de Verano"]
    const TRUE_OPTIONS = [
        {
            id: 1,
            value: "ropa",
            name: "Ropa"
        },
        {
            id: 2,
            value: "accesorios",
            name: "Accesorios"
        },
        {
            id: 3,
            value: "calzado",
            name: "Calzado"
        },
        {
            id: 4,
            value: "juguetes",
            name: "Juguetes"
        },
        {
            id: 5,
            value: "mascotas",
            name: "Mascotas"
        },
        {
            id: 6,
            value: "coleccion-de-verano",
            name: "Colección de Verano"
        }
    ]

    const handleSubcatChange = (e) => {
        setSubcatState(e.target.value)
        onChange(e)
    }

    const handleKeywordsChange = (e) => {
        setKeywordsState(e.target.value)
        onChange(e)
    }
    
    useEffect(() => {
            setInitialCategories(categories)
    }, [categories])

    useEffect(() => {
        setSubcatState(subcat)
        setKeywordsState(keywords)
    }, [subcat, keywords])

    useEffect(() => {
        if (initialCategories) {
            const newInputs = initialCategories.map((category, index) => {
                return { id: index + 1, value: category }
            })
            setInputs(newInputs)
        } else {
            setInputs([{ id: 1, value: "" }])
        }
    }, [initialCategories])

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
                            {TRUE_OPTIONS.map(option => (
                                <option selected={
                                    input.value === option.value ? true : false
                                } key={option.id} value={option.value}>{option.name}</option>
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
                <input value={subcatState} type="text" name="subcategory" onChange={handleSubcatChange} />
                <p>
                    La <b>subcategoría</b> es una forma de organizar los productos de tu tienda.
                </p>
            </div>
            <div>
                <h3>Palabras Clave</h3>
                <textarea value={keywordsState} type="text" name="keywords" onChange={handleKeywordsChange} />
                <p>
                    Las palabras clave sirven para que los clientes encuentren tu producto
                    usando el <b>buscador de la tienda</b>.
                </p>
            </div>
        </BoxLayout>
    )
}

export { Organization }