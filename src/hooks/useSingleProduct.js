import { useEffect, useState } from "react"
import { fetchProducts } from '@/firebase/client'

export const useSingleProduct = ({ id, fetchSingleProduct } = { id: null, fetchSingleProduct: null }) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    // console.log(id)
    
    useEffect(() => {
        setLoading(true)
        if (fetchSingleProduct) {
            fetchSingleProduct(id).then((data) => {
                setProduct(data)
                setLoading(false)
            })
        }
    }, [id])

    return { product, loading }
}