import styles from './Touch.module.scss';

const Touch = () => {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}>
                <div className={styles.text}>
                    <h2>From a studio in London to a global brand with over 400 outlets</h2>
                    <p>When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.</p>
                    <p>Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                </div>
                <button>Get in Touch</button>
            </div>
            <img src="/touch/1.png" alt="PNG" />
        </div>
    )
}

export default Touch