import styles from './Product.module.css';

import React, { useState, useEffect } from 'react';


export default function Product() {

    const [data, setData] = useState([]);
    const [isChecked, setisChecked] = useState([]);

    const getProducts = async () => {
        fetch("https://phonolitic-semicolo.000webhostapp.com/juniortest/index.php")
            .then((response) => response.json())
            .then((responseJson) => (
                //console.log(responseJson),
                setData(responseJson.records)
            ));
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handlecheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(value);
        if (checked) {
            setisChecked([...isChecked, value]);
        } else {
            setisChecked(isChecked.filter((e) => e !== value));
        }
    }

    const deleteProduct = async () => {
        console.log(isChecked)
        isChecked.forEach((sku) => {
            fetch("https://phonolitic-semicolo.000webhostapp.com/juniortest/delete.php?sku=" + sku)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    
                }).catch(() => {
                    console.log("Product not deleted");
                })
        });
        window.location.reload(true);
    }

    return (
        <>
            <button className={styles.delete} id="delete-product-btn" onClick={deleteProduct}>MASS DELETE</button><br/><br/>
            <div className={styles.product}>
                {Object.values(data).map(product => (
                    <div key={product.productSku} className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.card}>
                                <input className='delete-checkbox' type="checkbox" value={product.productSku} checked={product.isChecked} onChange={(e) => handlecheckbox(e)} />
                                <div className={styles.cardBody}>
                                    <p>{product.productSku}</p>
                                    <p>{product.productName}</p>
                                    <p>{product.productPrice}</p>
                                    <p>{product.productSize}</p>
                                    <p>{product.productWeight}</p>
                                    <p>{product.productHeight}</p>
                                    <p>{product.productWidth}</p>
                                    <p>{product.productLength}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
