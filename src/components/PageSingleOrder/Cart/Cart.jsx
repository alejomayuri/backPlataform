import style from "./Cart.module.css";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import { formatPrice } from "@/utils/formatPrice";

const Cart = ({ cart, fetchSingleProduct }) => {
    
    const { product, loading } = useSingleProduct({
        id: cart?.product,
        fetchSingleProduct
    });
    let features = cart?.features
    let listOfFeatures = null
    let price = null
    let comparisonPrice = null
    let total = null

    const compararIgualdad = (datos1, datos2) => {
        if (datos1.length !== datos2.length) {
          return false;
        }
      
        return datos1.every((item1) => {
          return datos2.some((item2) => {
            return (
              item1.name.toLowerCase() === item2.name.toLowerCase() &&
              item1.value.toLowerCase() === item2.value.toLowerCase()
            );
          });
        });
    };

    if (product && product?.variations) {
        const variation = product?.variations?.find((variation) => {
            const options = variation.options
            // const features = item.features
            const datos2Obj = Object.entries(features).map(([name, value]) => ({ name, value }));
            // console.log("options", options)
            return compararIgualdad(options, datos2Obj)
        })
        // console.log("variation", variation)
        price = variation?.price
    } else {
        price = product?.price
        comparisonPrice = product?.comparisonPrice
    }


    if (cart) {
        if (features && Object.keys(features).length > 0) {
            listOfFeatures = Object.keys(features).map((key) => {
                return (
                    <div className={style.features} key={key}>
                        <p>{`${key}:`}</p>
                        <p>{features[key]}</p>
                    </div>
                )
            })
        }
    }
    
    if (loading) return <p>Loading...</p>

    return (
        <div className={style.cartWrapper}>
            <div className={style.dataWrapper}>
                <div className={style.image}>
                    <img src={product?.image} alt={product?.name} />
                </div>
                <div className={style.text}>
                    <p>{product?.name}</p>
                    {
                        listOfFeatures && (
                            <div className={style.listOfFeatures}>
                                {listOfFeatures}
                            </div>
                        )
                    }
                    <div className={style.sku}>
                        <p>{`SKU: ${product?.id}`}</p>
                    </div>
                </div>
                <div className={style.price}>
                    <p>{formatPrice(price)}</p>
                    <p>x</p>
                    <p>{cart?.quantity}</p>
                </div>
                <div className={style.total}>
                    <p>{formatPrice(price * cart?.quantity)}</p>
                </div>
            </div>
        </div>
    );
}

export { Cart };