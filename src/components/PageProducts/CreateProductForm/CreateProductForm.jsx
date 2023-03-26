import { useState } from 'react';

const CreateProductForm = ({handleCreateProduct}) => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
    });
    
    // const [error, setError] = useState(false);
    
    const { name, price, description, image } = product;
    
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        handleCreateProduct(product);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            {/* {error ? <Error message="All fields are required" /> : null} */}
            <div>
                <label htmlFor="name">Name</label>
                <input

                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product Name"
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input

                    type="number"
                    name="price"
                    id="price"
                    placeholder="Product Price"
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Create Product</button>
            </div>
        </form>
    );
}

export { CreateProductForm };