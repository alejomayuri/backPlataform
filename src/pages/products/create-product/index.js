import { Layout } from "@/layouts/Layout";
import { useEffect, useCallback } from "react";
import { TitleAndDescription } from "@/components/PageCreateProduct/TitleAndDescription/TitleAndDescription";
import useFormProduct from "@/hooks/useFormProduct";
import { Multimedia } from "@/components/PageCreateProduct/Multimedia/Multimedia";
import { useFunctions } from "@/hooks/useFunctions";
import { Price } from "@/components/PageCreateProduct/Price/Price";
import { Stock } from "@/components/PageCreateProduct/Stock/Stock";
import { Options } from "@/components/PageCreateProduct/Options/Options";
import { Variations } from "@/components/PageCreateProduct/Variations/Variations";
import { State } from "@/components/PageCreateProduct/State/State";
import { Organization } from "@/components/PageCreateProduct/Organization/Organization";
import { CreateButton } from "@/components/PageCreateProduct/CreateButton/CreateButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router'

export default function CreateProduct(props) {
    const { data } = props
    const functions = useFunctions({data})
    const getStorage = functions?.getStorage
    const handleRegisterProduct = functions?.handleRegisterProduct

    const { currentUser, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!currentUser && !loading) {
            router.push("/")
        }
    }, [currentUser, loading, router])
    
    const {
        formProduct,
        showProgress,
        uploatValue,
        prevImage,
        disabledButton,
        setDisabledButton,
        handleOnChange,
        handleOnChangeImg,
        handleDeleteImg,
        handleSaleWithoutStock,
        handleOptions,
        handleVariations,
        handleOnChangeState,
        handleCategories
    } = useFormProduct({getStorage: getStorage})

    const variationWithoutPricek = useCallback(() => {
        if (formProduct.variations && formProduct.variations.length > 0) {
                for (let i = 0; i < formProduct.variations.length; i++) {
                    if (formProduct.variations[i].price === '0') {
                        return false
                    }
                }
            }
        return true
    }, [formProduct.variations])

    useEffect(() => {
        if (formProduct?.name && formProduct?.name !== "" &&
            formProduct?.description && formProduct?.description !== "" &&
            formProduct?.image && formProduct?.image !== "" &&
            formProduct?.currency && formProduct?.currency !== "" &&
            formProduct?.active !== "" &&
            formProduct?.categories && formProduct?.categories.length > 0 && formProduct?.categories[0] !== "" &&
            formProduct?.subcategory && formProduct?.subcategory !== "" &&
            formProduct?.keywords && formProduct?.keywords !== ""
        ) {
            if (formProduct?.stock && formProduct?.stock !== "" &&
                formProduct?.price && formProduct?.price !== ""
            ) {
                setDisabledButton(false)
            } else {
                if (formProduct?.options && formProduct?.options.length > 0 &&
                    formProduct?.options[0].name !== "" && formProduct.options[0].values[0] !== "" &&
                    formProduct?.variations && formProduct?.variations.length > 0 &&
                    variationWithoutPricek()
                ) {
                    setDisabledButton(false)
                } else {
                    setDisabledButton(true)
                }
            }
        } else {
            setDisabledButton(true)
        }
    }, [
        formProduct,
        setDisabledButton,
        variationWithoutPricek
    ])

    return (
        <Layout>
            <div className="content__wrapper">
                <h1>Agregar producto</h1>
                <div>
                    <div>
                        <TitleAndDescription
                            onChange={handleOnChange}
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
                        />
                        <Stock
                            onChange={handleOnChange}
                            handleSaleWithoutStock={handleSaleWithoutStock}
                        />
                        <Options
                            onChange={handleOptions}
                            create={true}
                        />
                        {
                            formProduct?.options?.length > 0 && (
                                <Variations
                                    options={formProduct?.options || []}
                                    onChange={handleVariations}
                                />  
                            )
                        }
                    </div>
                    <div>
                        <State
                            onChange={handleOnChangeState}
                        />
                        <Organization
                            onChangeCats={handleCategories}
                            onChange={handleOnChange}
                        />
                        <CreateButton
                            disabled={disabledButton}
                            handleRegisterProduct={handleRegisterProduct}
                            formProduct={formProduct}
                        />
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
  