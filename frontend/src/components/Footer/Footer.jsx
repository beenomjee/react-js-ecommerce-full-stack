import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <div className={styles.column}>
                            <h6>Menu</h6>
                            <Link to="/">New arrivals</Link>
                            <Link to="/">Best sellers</Link>
                            <Link to="/">Recently viewed</Link>
                            <Link to="/">Popular this week</Link>
                            <Link to="/">All products</Link>
                        </div>
                        <div className={styles.column}>
                            <h6>Categories</h6>
                            <Link to="/">Crockery</Link>
                            <Link to="/">Furniture</Link>
                            <Link to="/">Homeware</Link>
                            <Link to="/">Plant pots</Link>
                            <Link to="/">Chairs</Link>
                            <Link to="/">Crockery</Link>
                        </div>
                        <div className={styles.column}>
                            <h6>Our company</h6>
                            <Link to="/">About us</Link>
                            <Link to="/">Vacancies</Link>
                            <Link to="/">Contact us</Link>
                            <Link to="/">Privacy</Link>
                            <Link to="/">Returns policy</Link>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h6>Our company</h6>
                        <div className={styles.input}><input type="text" placeholder='your@email.com' /><button>Sign up</button>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>Copyright {new Date().getFullYear()} <Link to="/">Avion</Link> LTD</p>
                    <div className={styles.right}>
                        <a href="/" target='_blank'><img src="/icons/Logo--linkedin.svg" alt="Social Medai" /></a>
                        <a href="/" target='_blank'><img src="/icons/Logo--facebook.svg" alt="Social Medai" /></a>
                        <a href="/" target='_blank'><img src="/icons/Logo--instagram.svg" alt="Social Medai" /></a>
                        <a href="/" target='_blank'><img src="/icons/Logo--skype.svg" alt="Social Medai" /></a>
                        <a href="/" target='_blank'><img src="/icons/Logo--twitter.svg" alt="Social Medai" /></a>
                        <a href="/" target='_blank'><img src="/icons/Logo--pinterest.svg" alt="Social Medai" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer