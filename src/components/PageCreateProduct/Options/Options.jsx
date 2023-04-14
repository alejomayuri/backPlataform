import style from './Options.module.css'
import { BoxLayout } from "../BoxLayout/BoxLayout";
import { useState, useCallback, useEffect } from 'react'
import { Option } from './Option/Option'

const Options = ({ onChange }) => {
    const [theseProductsHaveOptions, setTheseProductsHaveOptions] = useState(false)
    const [optionId, setOptionId] = useState([{ id: 1}])

    const [options, setOptions] = useState([])

    const handleHaveOptions = () => {
        setTheseProductsHaveOptions(!theseProductsHaveOptions)
        setOptionId([{ id: 1}])

        if (!theseProductsHaveOptions) {
            setOptions([{ id: 1, name: "", values: [""]}])
        } else {
            setOptions([])
        }
        // setOptions([{ id: 1, name: "", values: [""]}])
    }

    const handleChangeOptions = useCallback((id, name, values) => {
        if (!options.find(option => option.id === id)) {
            setOptions([...options, { id, name, values }])
            return;
        }
        const newOptions = options.map(option => {
            if (option.id === id) {
                return { ...option, name, values };
            }
            return option;
        });
        setOptions(newOptions);

    }, [options])

    const handleDeleteOptions = useCallback((id) => {
        const newOptions = options.filter(option => option.id !== id)
        setOptions(newOptions)
    }, [options])

    // console.log("options", options)
    useEffect(() => {
        onChange(options)
    }, [options])

    const handleNewOption = () => {
        // setOptions([...options, { id: options.length + 1, name: "", values: [""]}])
        setOptionId([...optionId, { id: optionId.length + 1}])
    }

    return (
        <BoxLayout title="Opciones">
            {/* <h3 className={style.title}>Opciones</h3> */}
            <div className={style.theseProductsHaveOptions}>
                <div>
                    <input type="checkbox" name="theseProductsHaveOptions" onChange={handleHaveOptions} />
                    <label htmlFor="saleWithoutStock">Este producto tiene opciones, como talla y color</label>
                </div>
            </div>
            {theseProductsHaveOptions && (
                <>
                    <div className={style.optionsWrapper}>
                        {optionId.map((option, index) => (
                            <Option
                                key={index}
                                optionId={option.id}
                                onChange={handleChangeOptions}
                                handleDeleteOptions={handleDeleteOptions}
                            />
                        ))}
                    </div>
                    <div className={style.buttonsWrapper}>
                        <button onClick={handleNewOption}>
                            <span>+</span>
                            <span>Agregar otra opción</span>
                        </button>
                    </div>
                </>
            )}
        </BoxLayout>
    )
}

export { Options }