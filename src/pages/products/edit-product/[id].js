import { Layout } from "@/layouts/Layout";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useFunctions } from "@/hooks/useFunctions";
import { TitleAndDescription } from "@/components/PageCreateProduct/TitleAndDescription/TitleAndDescription";
import { Multimedia } from "@/components/PageCreateProduct/Multimedia/Multimedia";
import { CreateButton } from "@/components/PageCreateProduct/CreateButton/CreateButton";
import { Price } from "@/components/PageCreateProduct/Price/Price";
import { Stock } from "@/components/PageCreateProduct/Stock/Stock";
import { State } from "@/components/PageCreateProduct/State/State";
import { Organization } from "@/components/PageCreateProduct/Organization/Organization";
import { Options } from "@/components/PageCreateProduct/Options/Options";
import { Variations } from "@/components/PageCreateProduct/Variations/Variations";

export default function EditProduct(props) {
    const { data } = props
    const functions = useFunctions({data})
    const getStorage = functions?.getStorage
    const editProduct = functions?.editProduct
    const fetchSingleProduct = functions?.fetchSingleProduct

    const [product, setProduct] = useState({})
    const [editFormProduct, setEditFormProduct] = useState({})
    const [showProgress, setShowProgress] = useState(false)
    const [prevImage, setPrevImage] = useState('')
    const [uploatValue, setUploadValue] = useState(0)
    const [file, setFile] = useState('')

    if (product && product.image && prevImage === '') {
        setPrevImage(product.image)
    }

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (fetchSingleProduct) {
            fetchSingleProduct(id).then((data) => {
                setProduct(data)
        }
    )}}, [functions?.loaded])
        console.log("editFormProduct", editFormProduct)
        console.log("product", product)
    useEffect(() => {
        if (product) {
            setEditFormProduct(product)
        }
    }, [product])

    const handleDeleteImg = () => {
        setPrevImage('')
        setProduct({
            ...product,
            image: ''
        })

        if (file) {
        const storageRef = getStorage().ref(`products/${file.name}`)
        storageRef.delete()
        }
        setShowProgress(false)
        setUploadValue(0)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setEditFormProduct({
            ...editFormProduct,
            [name]: value
        })
    }

    const handleOnChangeImg = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setShowProgress(true)
        setPrevImage('')
        const storageRef = getStorage().ref(`products/${file?.name}`)
        const task = storageRef.put(file)

        task.then(res => {
            const imgUrl = res.ref.getDownloadURL()
            imgUrl.then(url => {
                setEditFormProduct((prevState) => ({
                    ...prevState,
                    image: url
                }))
                setPrevImage(url)
                setUploadValue(100)
                // setDisabledButton(false)
            })
        }).catch(err => console.log(err))

        task.on('state_changed', snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
            setUploadValue(progress)
        })
    }

    const handleSaleWithoutStock = (e) => {
        setEditFormProduct({
            ...editFormProduct,
            saleWithoutStock: e.target.checked
        })
    }

    const handleOnChangeState = (boolean) => {
        setEditFormProduct({
            ...editFormProduct,
            active: boolean
        })
    }

    const handleCategories = (cat) => {
        setEditFormProduct({
            ...editFormProduct,
            categories: cat
        })
    }

    const handleOptions = (options) => {
        setEditFormProduct({
            ...editFormProduct,
            options: options
        })
    }

    const handleVariations = (variations) => {
        setEditFormProduct({
            ...editFormProduct,
            variations: variations
        })
    }

    const handleEdit = () => {
        editProduct(id, editFormProduct)
        router.push('/products')
    }

    return (
        <Layout>
            <div className="content__wrapper">
                <h1>Editar producto</h1>
                <div>
                    <div>
                        <TitleAndDescription
                            onChange={handleOnChange}
                            name={product.name}
                            description={product.description}
                        />
                        <Multimedia
                            onChange={handleOnChangeImg}
                            prevImage={prevImage}
                            showProgress={showProgress}
                            uploatValue={uploatValue}
                            handleDeleteImg={handleDeleteImg}
                        />
                        <Price
                            onChange={handleOnChange}
                            price={product.price}
                            comparisonPrice={product.comparisonPrice}
                        />
                        <Stock
                            onChange={handleOnChange}
                            handleSaleWithoutStock={handleSaleWithoutStock}
                            stock={product.stock}
                            saleWithoutStock={product.saleWithoutStock}
                        />
                        <Options
                            onChange={handleOptions}
                            productOptions={product.options}
                        />
                        {
                            editFormProduct?.options?.length > 0 && (
                                <Variations
                                    options={editFormProduct?.options || []}
                                    onChange={handleVariations}
                                    productVariations={product.variations}
                                />  
                            )
                        }
                    </div>
                    <div>
                        <State
                            onChange={handleOnChangeState}
                            productState={product.active}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                            categories={product.categories}
                            subcat={product.subcategory}
                            keywords={product.keywords}
                        />
                        <button
                            onClick={handleEdit}
                        >editar</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    // Conéctate al primer servidor de Firebase para obtener la información necesaria para conectarte al segundo servidor
    const response = await fetch('https://us-central1-back-plataform.cloudfunctions.net/function-2');
    const data = await response.json();
  
    return {
      props: {
        data
      }
    };
}