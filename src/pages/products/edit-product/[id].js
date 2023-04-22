import { Layout } from "@/layouts/Layout";
import useFormProduct from "@/hooks/useFormProduct";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useFunctions } from "@/hooks/useFunctions";
import { TitleAndDescription } from "@/components/PageCreateProduct/TitleAndDescription/TitleAndDescription";
import { Multimedia } from "@/components/PageCreateProduct/Multimedia/Multimedia";
import { CreateButton } from "@/components/PageCreateProduct/CreateButton/CreateButton";

export default function EditProduct(props) {
    const { data } = props
    const functions = useFunctions({data})
    const getStorage = functions?.getStorage
    const editProduct = functions?.editProduct
    const fetchSingleProduct = functions?.fetchSingleProduct

    const [product, setProduct] = useState({})

    const router = useRouter()
    const { id } = router.query
    console.log(id)
    useEffect(() => {
        if (fetchSingleProduct) {
            fetchSingleProduct(id).then((data) => {
                setProduct(data)
        }
    )}}, [functions?.loaded])

    console.log("product", product)

    // const {
    //     formProduct,
    //     handleOnChange,
    // } = useFormProduct({getStorage: getStorage})

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    // const handleOnChangeImg = (e) => {
    //     const file = e.target.files[0]
    //     setFile(file)
    //     setShowProgress(true)
    //     setPrevImage('')
    //     const storageRef = getStorage().ref(`products/${file?.name}`)
    //     const task = storageRef.put(file)

    //     task.then(res => {
    //         console.log(res)
    //         const imgUrl = res.ref.getDownloadURL()
    //         imgUrl.then(url => {
    //             setFormProduct((prevState) => ({
    //                 ...prevState,
    //                 image: url
    //             }))
    //             setPrevImage(url)
    //             setUploadValue(100)
    //             setDisabledButton(false)
    //         })
    //     }).catch(err => console.log(err))

    //     task.on('state_changed', snapshot => {
    //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10
    //         setUploadValue(progress)
    //     })
    // }

    const handleEdit = () => {
        editProduct(id, product)
        router.push('/products')
    }
    
    // console.log("formProduct", formProduct)

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
                        {/* <Multimedia
                            onChange={handleOnChangeImg}
                            prevImage={prevImage}
                            showProgress={showProgress}
                            uploatValue={uploatValue}
                            handleDeleteImg={handleDeleteImg}
                        /> */}
                    </div>
                    <div>
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