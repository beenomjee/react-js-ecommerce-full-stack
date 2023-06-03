import { useDispatch, useSelector } from 'react-redux'
import styles from './Orders.module.scss'
import { useEffect, useRef, useState } from 'react'
import { deleteOrder, getAllOrders, updateOrder, } from '../../../store'
import { MdDelete, MdEdit } from "react-icons/md"
import { toast } from 'react-toastify'
import { Loader } from '../../../components'
import ReactModal from 'react-modal';

const tableHeaders = [
    {
        name: 'Name',
        width: 30,
    },
    {
        name: 'Image',
        width: 10,
    },
    {
        name: 'Price',
        width: 10,
    },
    {
        name: 'Quantity',
        width: 10,
    },
    {
        name: 'Status',
        width: 10,
    },
    {
        name: 'Category',
        width: 20,
    },
    {
        name: 'Actions',
        width: 10,
    },
]

const Orders = () => {
    const isLoading = useSelector(store => store.orders.isLoading)
    const disptach = useDispatch();
    const token = useSelector(store => store.auth.user?.token)
    const [allOrders, setallOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const selectedId = useRef(null);
    const [selectedValue, setSelectedValue] = useState('Pending')

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const onEdit = (id) => {
        selectedId.current = id;
        openModal();
        setSelectedValue(allOrders.find(o => o._id === id).status);
    }
    const onDelete = (id) => {
        disptach(deleteOrder(id, token, (data) => {
            toast.success(data.message)
            setallOrders(p => p.filter(pr => pr._id !== id))
        }))
    }

    const updateProduct = () => {
        closeModal();
        disptach(updateOrder(selectedValue, selectedId.current, token, data => {
            toast.success(data.message)
            disptach(getAllOrders(token, (data) => {
                setallOrders(data.map(order => ({
                    name: order.product.name,
                    img: order.product.img,
                    price: order.product.price * order.quantity,
                    quantity: order.quantity,
                    status: order.status,
                    category: order.product.category,
                    _id: order._id
                })))
            }))
        }))
    }

    useEffect(() => {
        disptach(getAllOrders(token, (data) => {
            setallOrders(data.map(order => ({
                name: order.product.name,
                img: order.product.img,
                price: order.product.price * order.quantity,
                quantity: order.quantity,
                status: order.status,
                category: order.product.category,
                _id: order._id
            })))
        }))
    }, [disptach, token])

    return (
        isLoading ? (
            <div className="loader"><Loader /></div>
        ) : (
            <>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <h1>All Orders</h1>
                    </div>
                    <div className={styles.overflow}>
                        <table>
                            <thead>
                                <tr>
                                    {
                                        tableHeaders.map((header, index) => (
                                            <th key={header.name + index} style={{ "--w": `${header.width}%` }}>{header.name}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allOrders.map((order, index) => (
                                        <tr key={order.name + index}>
                                            <td>{order.name}</td>
                                            <td><div>
                                                <img src={order.img} alt={order.name} />
                                            </div></td>
                                            <td>£{order.price}</td>
                                            <td>{order.quantity}</td>
                                            <td className={order.status === 'Pending' ? styles.warning : order.status === 'Shipped' ? styles.info : styles.success}>{order.status}</td>
                                            <td>{order.category}</td>
                                            <td><div>
                                                <button onClick={() => onEdit(order._id)}><MdEdit /></button>
                                                <button onClick={() => onDelete(order._id)}><MdDelete /></button>
                                            </div></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactModal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    style={{
                        overlay: { backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
                    }}
                    className={styles.modal}
                >
                    <h2>Edit Order</h2>
                    <label>
                        <span>Status</span>
                        <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
                            {
                                ["Pending", "Shipped", "Delivered"].map((opt, index) => (
                                    <option value={opt} key={opt + index}>{opt}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div>
                        <button onClick={closeModal}>Close</button>
                        <button onClick={updateProduct}>Update</button>
                    </div>
                </ReactModal>
            </>
        )
    )
}

export default Orders