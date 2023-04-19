import style from './Product.module.css';
import { useEffect, useState } from 'react';
import EditIcon from '../icons/Edit';

const Product = ({ product, editProduct }) => {
    const PRODUCT_PRICE = product?.variation ? product?.variation.price : product?.price;
    const PRODUCT_STOCK = product?.variation ? product?.variation.stock : product?.stock;
    const [price, setPrice] = useState(PRODUCT_PRICE);
    const [stock, setStock] = useState(PRODUCT_STOCK);

    const productWithouVariation = (product) => {
        const productToUpdate = {...product}
        if(productToUpdate?.variation) {
            delete productToUpdate['variation']
            return productToUpdate
        } else {
            return productToUpdate
        }
    }

    const [showMessage, setShowMessage] = useState(false);

    const handleShowMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const [productToUpdate, setProductToUpdate] = useState(
        productWithouVariation(product)
    );
    
    const handlePrice = (e) => {
        setPrice(e.target.value);
        if(productToUpdate?.variations && productToUpdate?.variations?.length > 0) {
            const variation = productToUpdate?.variations.find(variation => 
                variation.name === product?.variation.name
            )
            
            setProductToUpdate({...productToUpdate, 
                variations: [
                    ...productToUpdate?.variations.filter(variation =>
                        variation.name !== product?.variation.name
                    ),
                    {...variation, price: e.target.value}
                ]
            })
        } else {
            setProductToUpdate({...productToUpdate, price: e.target.value})
        }
    }

    const handleStock = (e) => {
        setStock(e.target.value);
        if(productToUpdate?.variations && productToUpdate?.variations?.length > 0) {
            const variation = productToUpdate?.variations.find(variation =>
                variation.name === product?.variation.name
            )

            setProductToUpdate({...productToUpdate,
                variations: [
                    ...productToUpdate?.variations.filter(variation =>
                        variation.name !== product?.variation.name
                    ),
                    {...variation, stock: e.target.value}
                ]
            })
        } else {
            setProductToUpdate({...productToUpdate, stock: e.target.value})
        }
    }

    const [showEditButton, setShowEditButton] = useState(price !== PRODUCT_PRICE || stock !== PRODUCT_STOCK);

    useEffect(() => {
        setShowEditButton(price !== PRODUCT_PRICE || stock !== PRODUCT_STOCK);
    }, [price, stock, PRODUCT_PRICE, PRODUCT_STOCK]);

    const haldleEditProduct = () => {
        if (editProduct) {
            editProduct(product?.id, productToUpdate)
                .then(() => {
                    handleShowMessage()
                    setShowEditButton(false);
                })
        }
    }

    return (
        <>
            {
                showMessage && (
                    <div className={style.message}>
                        {
                            product?.variation ? (
                                <p>✏️ El producto <b>{product?.name}</b> - <b>{product?.variation.name}</b> se ha actualizado correctamente</p>
                            ) : (
                                <p>✏️ El producto <b>{product?.name}</b> se ha actualizado correctamente</p>
                            )
                        }
                    </div>
                )
            }
            <div className={style.product}>
                <div className={style.product__image}>
                    <img src={product?.image} alt={product?.name} />
                </div>
                <div className={style.product__name}>
                    <h3>{product?.name}</h3>
                    {
                        product?.variation && (
                            <p>{product?.variation.name}</p>
                        )
                    }
                </div>
                <div className={style.product__sku}>
                    {
                        product?.variation ? (
                            <p>{`${product?.id} - ${product?.variation.name}`}</p>
                        ) : (
                            <p>{product?.id}</p>
                        )
                    }
                </div>
                <div className={style.product__price}>
                    <input type="number" name='price' value={price} onChange={handlePrice}/>
                </div>
                <div className={style.product__stock}>
                    <input type="number" name='stock' value={stock} onChange={handleStock} />
                </div>
                {
                    showEditButton && (
                        <div className={style.edit__product}>
                            <button onClick={haldleEditProduct}>
                                <EditIcon width="30px" height="30px" fill="#646464" />
                            </button>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export { Product }