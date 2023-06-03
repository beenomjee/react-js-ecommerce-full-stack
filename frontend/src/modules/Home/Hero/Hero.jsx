import { useMediaQuery } from '../../../hooks';
import styles from './Hero.module.scss';
import { Link } from 'react-router-dom'

const Hero = () => {
    const isTablet = useMediaQuery(800);
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <h1>The furniture brand for future, with timeless designs</h1>
                    {!isTablet && <Link to="/search?q=chair">View Collections</Link>}
                </div>
                <div className={styles.bottom}>
                    <p>
                        A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice fonts, tasteful colors and a beautiful way to display things digitally using modern web technologies.
                    </p>
                    {
                        isTablet && <Link to="/search?q=chair">View Collections</Link>
                    }
                </div>
            </div>
            <img src="/hero/chair.png" alt="Chair" />
        </div>
    )
}

export default Hero