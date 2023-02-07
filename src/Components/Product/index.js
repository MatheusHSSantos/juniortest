import styles from './Product.module.css';

import React, { useState, useEffect } from 'react';

export default function Product() {

    const [data, setData] = useState([]);
    const [isChecked, setisChecked] = useState([])

    const getProducts = async () => {
        fetch("http://localhost/juniortest/index.php")
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
        isChecked.forEach((id) => {
            fetch("http://localhost/juniortest/delete.php?id=" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                }).catch(() => {
                    console.log("Product not deleted");
                })
        });
        getProducts();
    }

    return (
        <>
            <button className={styles.delete} id="delete-product-btn" onClick={deleteProduct}>MASS DELETE</button>
            <div className={styles.product}>
                {Object.values(data).map(product => (
                    <div key={product.id} className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.card}>
                                <input className='delete-checkbox' type="checkbox" value={product.id} checked={product.isChecked} onChange={(e) => handlecheckbox(e)} />
                                <div className={styles.cardBody}>
                                    <p>{product.id}</p>
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
