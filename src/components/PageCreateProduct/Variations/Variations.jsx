import style from "./Variations.module.css"
import { useEffect, useState } from "react"

const Variations = ({ options, onChange }) => {
    function generateCombinations(arrays) {
        if (arrays.length === 1) {
            return arrays[0].map(el => [el])
        }

        const combinations = [];
        const smallerCombinations = generateCombinations(arrays.slice(1));

        for (let i = 0; i < arrays[0].length; i++) {
            for (let j = 0; j < smallerCombinations.length; j++) {
                combinations.push([arrays[0][i], ...smallerCombinations[j]]);
            }
        }
        return combinations;
    }
    const arrays = options.map(option => option.values)
    const parseArrays = arrays.map(array => array.filter(el => el !== ""))
        
    const combinations = generateCombinations(parseArrays);

    const variations = combinations.map(combination => {    
        const variation = {
            name: combination.join(" / "),
            price: 0,
            stock: 0,
            options: combination.map((value, index) => {
                return {
                    name: options[index].name,
                    value: value
                }
            })
        }
        return variation
    })

    const [variationsState, setVariationsState] = useState(variations)

   useEffect(() => {
         setVariationsState(variations)
    }, [options])

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setVariationsState(
            variationsState.map((variation, i) => {
                if (i === index) {
                    return {
                        ...variation,
                        [name]: value
                    }
                }
                return variation

            })
        )
    }
    console.log("variations", variationsState)

    useEffect(() => {
        onChange(variationsState)
    }, [variationsState])
    return (
        <div className={style.container}>
            <h3 className={style.title}>Variaciones</h3>
            <div className={style.topLeyend}>
                <p>Variación</p>
                <p>Precio</p>
                <p>Stock</p>
            </div>
            {combinations.map((combination, index) => {
                return (
                    <div className={style.variationWrapper} key={index}>
                        <div className={style.variation}>
                            {combination.map((value, index) => {
                                return (
                                    <div className={style.element} key={index}>
                                        <p>{value}</p>
                                        {
                                            index !== combination.length - 1 && (
                                                <span>/</span>
                                            )
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        <div className={style.variationInfo}>
                            <div className={style.infoElement}>
                                <input 
                                onChange={
                                    (e) => handleChange(e, index)
                                } 
                                type="number" 
                                name="price"
                                />
                            </div>
                            <div className={style.infoElement}>
                                <input
                                 onChange={
                                    (e) => handleChange(e, index)
                                }
                                    type="number"
                                    name="stock"
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export { Variations }