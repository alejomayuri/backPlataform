import style from './Product.module.css';
import { useState } from 'react';

const Product = ({ product, editProduct }) => {
    const [price, setPrice] = useState(product?.variation ? product?.variation.price : product?.price);
    const [stock, setStock] = useState(product?.variation ? product?.variation.stock : product?.stock);
    const productWithouVariation = (product) => {
        const productToUpdate = {...product}
        if(productToUpdate?.variation) {
            delete productToUpdate['variation']
            return productToUpdate
        } else {
            return productToUpdate
        }
    }
    
    const [productToUpdate, setProductToUpdate] = useState(
        productWithouVariation(product)
    );
    
    console.log("productToUpdate", productToUpdate)
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

    const haldleEditProduct = () => {
        editProduct(product?.id, productToUpdate, '/products')
    }

    return (
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
            <div className={style.edit__product}>
                <button onClick={haldleEditProduct}>Editar</button>
            </div>
        </div>
    );
}

export { Product }