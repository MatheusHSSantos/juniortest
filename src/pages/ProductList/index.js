import styles from './ProductList.module.css';
import Product from '../../Components/Product'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom';

export default function ProductList() {
    return (
        <>
            <nav className={styles.nav}>
                <h1 className={styles.name}>Product List </h1>
                <Link to="/add-product"><button className={styles.add}>ADD</button></Link>
            </nav>
            <section>
                <div>
                    <Product />
                </div>
            </section>
            <Footer />
        </>
    )
}