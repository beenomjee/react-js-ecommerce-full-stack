import { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../store';
import { Loader } from '../../components';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.orders.isLoading);
    const token = useSelector(store => store.auth.user?.token)

    useEffect(() => {
        dispatch(getMyOrders(token, (data) => {
            setOrders(data.map(item => ({
                img: item.product.img,
                name: item.product.name,
                description: item.product.description,
                price: item.product.price,
                quantity: item.quantity,
                status: item.status,
            })))
        }));
    }, [dispatch, token])
    return (
        <div className={styles.wrapper}>
            {
                isLoading ? (
                    <div className="loader"><Loader /></div>
                ) : (
                    orders.length === 0 ? (
                        // eslint-disable-next-line react/no-unescaped-entities
                        <p>There's not order to display.</p>
                    ) : (
                        <div className={styles.container}>
                            <h1>Your orders</h1>
                            <div className={styles.overflow}>
                                <div className={styles.list}>
                                    <div className={styles.headings}>
                                        <h6 style={{ "--w": 60 }}>Product</h6>
                                        <h6 style={{ "--w": 20 }}>Quantity</h6>
                                        <h6 style={{ "--w": 20 }}>Status</h6>
                                    </div>
                                    {
                                        orders.map((order, i) => (
                                            <div className={styles.item} key={order.name + i}>
                                                <div className={styles.product} style={{ "--w": 60 }}>
                                                    <div className={styles.left}><img src={order.img} alt={order.name} /></div>
                                                    <div className={styles.right}>
                                                        <h3>{order.name}</h3>
                                                        <p>{order.description.length > 40 ? `${order.description.slice(0, 40)}...` : order.description}</p>
                                                        <span>£{order.price}</span>
                                                    </div>
                                                </div>
                                                <div style={{ "--w": 20 }}>{order.quantity}</div>
                                                <div style={{ "--w": 20 }} className={order.status === 'Pending' ? styles.warning : order.status === 'Shipped' ? styles.info : styles.success}>{order.status}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Orders