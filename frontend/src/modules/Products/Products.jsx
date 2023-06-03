import { useDispatch, useSelector } from 'react-redux'
import { Loader, Product } from '../../components'
import styles from './Products.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getProducts, searchProducts } from '../../store'
import { useLocation } from 'react-router-dom'


const Products = ({ search }) => {
    const disptach = useDispatch();
    const isLoading = useSelector(store => store.products.isLoading);
    const [data, setData] = useState({
        products: [],
        currentPage: 0,
        totalPages: 1,
    })
    const location = useLocation();
    const oldPath = useRef(null);


    const getMoreProducts = useCallback(() => {
        if (!search) {
            disptach(getProducts(data.currentPage + 1, 10, d => {
                setData({
                    currentPage: d.currentPage,
                    products: [...data.products, ...d.products],
                    totalPages: d.totalPages
                })
            }))
        }
        else {
            const queryParams = new URLSearchParams(location.search);
            const queryParamValue = queryParams.get('q');
            disptach(searchProducts(queryParamValue, data.currentPage + 1, 10, (d) => {
                setData({
                    currentPage: d.currentPage,
                    products: [...data.products, ...d.products],
                    totalPages: d.totalPages
                })
            }))
        }
    }, [data.currentPage, data.products, disptach, location.search, search])

    useEffect(() => {
        if (data.currentPage === 0) {
            getMoreProducts();
        }

        if (oldPath.current !== location.pathname + location.search) {
            oldPath.current = location.pathname + location.search;
            setData({ currentPage: 0, products: [], totalPages: 1 });
        }
    }, [data.currentPage, getMoreProducts, location.pathname, location.search, search])

    return (
        data.currentPage === 0 && isLoading ? (
            <div className="loader"><Loader /></div>
        ) : (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <h1>{search ? `Search results` : "All products"}</h1>
                    </div>
                </div>
                <div className={styles.container2}>
                    {
                        data.products.length === 0 ? (
                            // eslint-disable-next-line react/no-unescaped-entities
                            <p>There's no item to show.</p>
                        ) : (
                            data.products.map((product, i) => (
                                <Product product={product} key={product.name + i} />
                            )
                            ))
                    }
                </div>
                {
                    data.products.length !== 0 && (
                        <div className={styles.center}>
                            <button disabled={data.currentPage >= data.totalPages || isLoading} onClick={getMoreProducts} >{isLoading ? <Loader /> : 'Load More'}</button>
                        </div>
                    )
                }
            </>
        )
    )
}

export default Products