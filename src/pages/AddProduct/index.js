import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './AddProduct.module.css';

export default function AddProduct() {

    const navigate = useNavigate()

    const [option, setOption] = useState('');

    const handleOption = (event) => {
        const getOption = event.target.value;
        setOption(getOption);
    }


    const [product, setProduct] = useState({
        productSku: '',
        productName: '',
        productPrice: '',
        productSize: '',
        productWeight: '',
        productHeight: '',
        productWidth: '',
        productLength: ''

    });

    const inputValue = e => setProduct({ ...product, [e.target.name]: e.target.value });

    const saveProduct = async e => {
        e.preventDefault()
        //console.log(product.productSku);

        await fetch("http://localhost/juniortest/addproduct.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product })
        })
            .then((response) => response.json())
            .then((responseJson) => (
                console.log(responseJson)
            ))
            
            setTimeout( () => {
                navigate("/");
            }, 1000);
    }

    return (
        <>
            <nav className={styles.nav}>
                <h1 className={styles.name}>Product Add </h1>
            </nav>
            <div>
                    <form id="product_form" onSubmit={saveProduct}>
                    <button className={styles.save} type="submit">Save</button>
                    <Link to="/"><button className={styles.cancel} id="cancel-product-btn">Cancel</button></Link><br /><br />
                    <label>SKU</label>
                    <input type="text" name="productSku" id="sku" onChange={inputValue} required /><br /><br />

                    <label>Name</label>
                    <input type="text" name="productName" id="name" onChange={inputValue} required /><br /><br />

                    <label>Price ($)</label>
                    <input type="number" name="productPrice" id="price" onChange={inputValue} required /><br /><br />

                    <label>Type Switcher</label>
                    <select id="productType" onChange={(e) => (handleOption(e))} required>
                        <option></option>
                        <option id="DVD" value="size">DVD</option>
                        <option id="Book" value="weight">Book</option>
                        <option id="Furniture" value="dimensions">Furniture</option>
                    </select>
                    <div>
                        {
                            option === 'size' && (
                                <div>
                                    <label>Size (MB)</label>
                                    <input type="number" name="productSize" id="size" onChange={inputValue} required/><br /><br />
                                    <h4>Please provide size in MB format</h4>
                                </div>
                            )
                        }

                        {
                            option === 'weight' && (
                                <div>
                                    <label>Weight (KG)</label>
                                    <input type="number" name="productWeight" id="weight" onChange={inputValue} required /><br /><br />
                                    <h4>Please provide weight in KG format</h4>
                                </div>
                            )
                        }

                        {
                            option === 'dimensions' && (
                                <div>
                                    <label>Height (CM)</label>
                                    <input type="number" name="productHeight" id="height" onChange={inputValue} required /><br /><br />

                                    <label>Width (CM)</label>
                                    <input type="number" name="productWidth" id="width" onChange={inputValue} required /><br /><br />

                                    <label>Length (CM)</label>
                                    <input type="number" name="productLength" id="length" onChange={inputValue} required /><br /><br />

                                    <h4>Please provide dimensions in HxWxL format</h4>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </>
    )
}