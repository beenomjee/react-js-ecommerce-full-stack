import { useDispatch, useSelector } from 'react-redux'
import styles from './Products.module.scss'
import { useEffect } from 'react'
import { deleteProduct, getAllProducts } from '../../../store'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete, MdEdit } from "react-icons/md"
import { toast } from 'react-toastify'
import { Loader } from '../../../components'

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
        name: 'View',
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

const Products = () => {
    const allProducts = useSelector(store => store.products.allProducts)
    const isLoading = useSelector(store => store.products.isLoading)
    const disptach = useDispatch();
    const token = useSelector(store => store.auth.user?.token)
    const navigate = useNavigate();

    const onEdit = (id) => {
        navigate('update/' + id)
    }
    const onDelete = (id) => {
        disptach(deleteProduct(token, id, (data) => {
            toast.success(data.message)
        }))
    }

    useEffect(() => {
        disptach(getAllProducts(token))
    }, [disptach, token])
    return (
        isLoading ? (
            <div className="loader"><Loader /></div>
        ) : (
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>All Products</h1>
                    <Link to="create">Add Product</Link>
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
                                allProducts.map((product, index) => (
                                    <tr key={product.name + index}>
                                        <td>{product.name}</td>
                                        <td><div>
                                            <img src={product.img} alt={product.name} />
                                        </div></td>
                                        <td>£{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.view}</td>
                                        <td>{product.category}</td>
                                        <td><div>
                                            <button onClick={() => onEdit(product._id)}><MdEdit /></button>
                                            <button onClick={() => onDelete(product._id)}><MdDelete /></button>
                                        </div></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )
}

export default Products