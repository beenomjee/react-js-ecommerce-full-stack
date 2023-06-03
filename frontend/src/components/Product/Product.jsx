import styles from './Product.module.scss'
import { Link } from 'react-router-dom'


const Product = ({ product }) => {
    return (
        <Link draggable={false} to={`/products/${product._id}`} className={styles.product}>
            <img draggable={false} src={product.img} alt={product.name} />
            <h6 draggable={false}>{product.name}</h6>
            <span draggable={false} >£{product.price}</span>
        </Link>
    )
}

export default Product