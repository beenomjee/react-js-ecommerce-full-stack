import { useEffect, useState } from 'react';
import styles from './ProductCreate.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../../store';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Loader } from '../../../components';


const initialState = {
    name: '',
    description: '',
    img: '',
    price: '',
    width: '',
    height: '',
    depth: '',
    quantity: '',
    category: ''
}
const ProductCreate = ({ update }) => {
    const [data, setData] = useState(initialState);
    const dispatch = useDispatch();
    const token = useSelector(store => store.auth.user?.token);
    const navigate = useNavigate();
    const { id } = useParams()
    const allProducts = useSelector(store => store.products.allProducts)
    const isLoading = useSelector(store => store.products.isLoading)

    const onChange = e => {
        if (e.target.name === 'img') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setData(p => ({ ...p, img: reader.result }))
            reader.readAsDataURL(file);
        } else
            setData(p => ({ ...p, [e.target.name]: e.target.value }));
    };

    const onSubmit = e => {
        e.preventDefault();
        if (update) {
            dispatch(updateProduct(data, id, token, (data) => {
                toast.success(data.message);
                navigate('/admin/products');
            }))
        }
        else {
            dispatch(createProduct(data, token, (data) => {
                toast.success(data.message);
                navigate('/admin/products');
            }))
        }
    }

    useEffect(() => {
        if (!update) return;
        if (id.length !== 24) navigate('/pageNotFound', { replace: true });
        const product = allProducts.find(product => product._id === id);
        if (!product) navigate('/pageNotFound', { replace: true });
        setData(product)
    }, [allProducts, id, navigate, update])

    return (
        isLoading ? (
            <div className="loader"><Loader /></div>
        ) : (
            <div className={styles.container}>
                <h1>{update ? 'Update' : 'Create'} Product</h1>
                <form onSubmit={onSubmit}>
                    <label>
                        <span>Name</span>
                        <input type="text" required name='name' placeholder="What's the product name?" onChange={onChange} value={data.name} />
                    </label>
                    <label>
                        <span>Description</span>
                        <textarea required name='description' placeholder="What's the product description?" onChange={onChange} value={data.description} />
                    </label>
                    <label>
                        <span>Image</span>
                        <input type="file" accept='image/*' required={!update} name='img' onChange={onChange} />
                    </label>
                    <label>
                        <span>Price</span>
                        <input min="1" type="number" step="1" required name='price' placeholder="What's the product price?" onChange={onChange} value={data.price} />
                    </label>
                    <label>
                        <span>Dimensions</span>
                        <input type="number" step="1" required name='width' placeholder="Width (in cm)" onChange={onChange} value={data.width} />
                        <input type="number" step="1" required name='height' placeholder="Height (in cm)" onChange={onChange} value={data.height} />
                        <input type="number" step="1" required name='depth' placeholder="Depth (in cm)" onChange={onChange} value={data.depth} />
                    </label>
                    <label>
                        <span>Quantity</span>
                        <input min="1" type="number" step="1" required name='quantity' placeholder="Available quantity?" onChange={onChange} value={data.quantity} />
                    </label>
                    <label>
                        <span>Category</span>
                        <input type="text" required name='category' placeholder="What's the product category?" onChange={onChange} value={data.category} />
                    </label>
                    <button type='submit'>{update ? 'Update' : 'Create'} Product</button>
                </form>
            </div>)
    )
}

export default ProductCreate