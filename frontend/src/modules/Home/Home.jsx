import Brand from './Brand/Brand';
import Hero from './Hero/Hero';
import styles from './Home.module.scss';
import Slide from '../../components/Slide/Slide';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsForHomePage } from '../../store';

const Home = () => {
    const dispatch = useDispatch();
    const newProducts = useSelector(store => store.products.newProducts);
    const popularProducts = useSelector(store => store.products.popularProducts);
    useEffect(() => {
        dispatch(getProductsForHomePage());
    }, [dispatch]);
    return (
        <div className={styles.container}>
            <Hero />
            <Brand />
            <Slide products={newProducts} heading="New ceramics" />
            <Slide products={popularProducts} heading="Our popular products" />
        </div>
    )
}

export default Home