import { useState } from "react"

export default function useFormProduct({
    getStorage,
    name,
    image,
    description,
    price,
    comparisonPrice,
    stock,
    options
}={}) {
    const FORM_STATE = {
        name: name,
        description: description,
        image: image,
        currency: "PEN",
        price: price,
        comparisonPrice: comparisonPrice,
        stock: stock,
        saleWithoutStock: false,
        options: options
    }

    const [formProduct, setFormProduct] = useState(FORM_STATE)
    const [showProgress, setShowProgress] = useState(false)
    const [uploatValue, setUploadValue] = useState(0)
    const [prevImage, setPrevImage] = useState(FORM_STATE.image)
    const [disabledButton, setDisabledButton] = useState(true)
    const [file, setFile] = useState('')

    const handleOnChange = (e) => setFormProduct({
        ...formProduct,
        [e.target.name]: e.target.value
    })

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`products/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            console.log(res)
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setFormProduct({
                    ...formProduct,
                    image: url
                })
                setPrevImage(url)
                setUploadValue(100)
                setDisabledButton(false)
            })
        }).catch(err => console.log(err))

        task.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
            setUploadValue(progress)
        })
    }

    const handleDeleteImg = () => {
        setPrevImage('')
        setFormProduct({
            ...formProduct,
            image: ''
        })

        const storageRef = getStorage().ref(`products/${file.name}`)
        storageRef.delete()

        setShowProgress(false)
        setUploadValue(0)
    }

    const handleSaleWithoutStock = (e) => {
        setFormProduct({
            ...formProduct,
            saleWithoutStock: e.target.checked
        })
    }

    const handleOptions = (options) => {
        setFormProduct({
            ...formProduct,
            options: options
        })
    }

    return {
        formProduct,
        showProgress,
        uploatValue,
        prevImage,
        disabledButton,
        handleOnChange,
        handleOnChangeImg,
        handleDeleteImg,
        handleSaleWithoutStock,
        handleOptions
    }
}