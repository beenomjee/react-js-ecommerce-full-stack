import styles from './Club.module.scss';

const Club = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Join the club and get the benefits</h2>
                <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
                <div className={styles.input}>
                    <input type="text" placeholder='your@email.com' />
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Club