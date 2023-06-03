import { Product } from '..';
import { useEffect, useRef } from 'react';
import styles from './Slide.module.scss';
import { Link } from 'react-router-dom'


const Slide = ({ products, heading }) => {
    const productsContainerRef = useRef(null)


    useEffect(() => {
        if (!productsContainerRef) return;
        var container = productsContainerRef.current;
        var isDragging = false;
        var startPosition;

        const onMouseDown = (event) => {
            isDragging = true;
            startPosition = event.clientX;
        }

        const onMouseMove = (event) => {
            if (isDragging) {
                var scrollOffset = event.clientX - startPosition;
                container.scrollLeft -= scrollOffset;
                startPosition = event.clientX;
            }
        }

        const onMouseUp = () => {
            isDragging = false;
        }

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);

        return () => {
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseup', onMouseUp);
        }
    }, [productsContainerRef])

    return (
        <div className={styles.container}>
            <h2>{heading}</h2>
            <div className={styles.products} ref={productsContainerRef}>
                {
                    products.map((product, i) => (
                        <Product product={product} key={i + product.img} />
                    ))
                }
            </div>
            <div className={styles.center}>
                <Link to="/products">View Collection</Link>
            </div>
        </div>
    )
}

export default Slide