import { useDispatch, useSelector } from 'react-redux';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { removeFromCart } from '../../store';


const Cart = () => {
    const cartItems = useSelector(store => store.cart.items);
    const disptach = useDispatch();
    const onRemove = id => {
        disptach(removeFromCart(id));
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Your shopping cart</h1>
                <div className={styles.overflow}>
                    {
                        cartItems.length === 0 ? (
                            // eslint-disable-next-line react/no-unescaped-entities
                            <p>There's no item in cart.</p>
                        ) : (
                            <div className={styles.list}>
                                <div className={styles.headings}>
                                    <h6 style={{ "--w": 60 }}>Product</h6>
                                    <h6 style={{ "--w": 20 }}>Quantity</h6>
                                    <h6 style={{ "--w": 20 }}>Total</h6>
                                </div>
                                {
                                    cartItems.map((product, i) => (
                                        <div className={styles.item} key={product.name + i}>
                                            <div className={styles.product} style={{ "--w": 60 }}>
                                                <div className={styles.left}><img src={product.img} alt={product.name} /><button onClick={() => onRemove(product._id)}><MdDelete /></button></div>
                                                <div className={styles.right}>
                                                    <h3>{product.name}</h3>
                                                    <p>{product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description}</p>
                                                    <span>£{product.price}</span>
                                                </div>
                                            </div>
                                            <div style={{ "--w": 20 }}>{product.quantity}</div>
                                            <div style={{ "--w": 20 }}>£{product.price * product.quantity}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                {
                    cartItems.length !== 0 && (
                        <div className={styles.end}>
                            <div>
                                <span>subtotal <span>£{cartItems.reduce((prev, item) => prev + (item.price * item.quantity), 0)}</span></span>
                                <p>Taxes and shipping are calculated at checkout</p>
                                <Link to="/checkout">Go to checkout</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Cart