import { Layout } from "@/layouts/Layout";
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

export default function CreateProduct(props) {
    const { data } = props
    const functions = useFunctions({data})
    const getStorage = functions?.getStorage

    const {
        formProduct,
        showProgress,
        uploatValue,
        prevImage,
        disabledButton,
        handleOnChange,
        handleOnChangeImg,
        handleDeleteImg,
        handleSaleWithoutStock,
        handleOptions,
        handleVariations,
        handleOnChangeState
    } = useFormProduct({getStorage: getStorage})

    console.log(formProduct)

    return (
        <Layout>
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
                    <Organization />
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