import { useDispatch, useSelector } from 'react-redux'
import { Loader, Slide } from '../../components'
import styles from './ProductPage.module.scss'
import { useEffect, useState } from 'react'
import { addToCart, getProductById, searchProducts } from '../../store'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductPage = () => {
    const product = useSelector(store => store.products.product);
    const isLoading = useSelector(store => store.products.isLoading);
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);


    const onAddToCart = () => {
        if (quantity > product.quantity) {
            toast.error(`Only ${quantity} items available`)
            return;
        }

        if (cartItems.find(p => p._id === product._id)) {
            toast.error('Item already added to cart!');
            return;
        }

        dispatch(addToCart({
            img: product.img,
            name: product.name,
            description: product.description,
            price: product.price,
            _id: product._id,
            quantity
        }))

        toast.success('Item added to cart!');

    }

    useEffect(() => {
        if (id.length !== 24) {
            navigate("/pagenotfound", { replace: true })
        } else
            dispatch(getProductById(id));
    }, [dispatch, id, navigate])

    useEffect(() => {
        if (product.category) {
            dispatch(searchProducts(product.category, 1, 4, (d) => {
                setProducts(d.products.filter(p => p._id !== product._id));
            }))
        }
    }, [dispatch, product._id, product.category]);
    return (
        <>
            <div className={styles.wrapper}>
                {
                    isLoading ? (
                        <div className="loader"><Loader /></div>
                    ) : (
                        <div className={styles.container}>
                            <div className={styles.left}><img src={product?.img} alt={product?.name} /></div>
                            <div className={styles.right}>
                                <h1>{product?.name}</h1>
                                <span>£{product?.price}</span>
                                <div className={styles.line}></div>
                                <h5>Product description</h5>
                                <p>{product?.description}</p>
                                <h5 className={styles.dimension}>Dimensions</h5>
                                <div className={styles.box}>
                                    <div>
                                        <h6>Height</h6>
                                        <span>{product?.height}</span>
                                    </div>
                                    <div className={styles.line}></div>
                                    <div>
                                        <h6>Width</h6>
                                        <span>{product?.width}</span>
                                    </div>
                                    <div className={styles.line}></div>
                                    <div>
                                        <h6>Depth</h6>
                                        <span>{product?.depth}</span>
                                    </div>
                                </div>
                                <h5 className={styles.quantityHeading}>Quantitity</h5>
                                <div className={styles.quantity}>
                                    <button onClick={() => setQuantity(p => p >= 2 ? p - 1 : p)}>-</button><span>{quantity}</span><button onClick={() => setQuantity(p => product.quantity > p ? p + 1 : p)}>+</button>
                                </div>
                                <button onClick={onAddToCart}>Add to cart</button>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                products.length !== 0 && (
                    <Slide heading="You might also love these" products={products} />
                )
            }
        </>
    )
}

export default ProductPage