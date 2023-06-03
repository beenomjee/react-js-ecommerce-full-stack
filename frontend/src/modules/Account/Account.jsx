import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import { Link } from 'react-router-dom'


const Account = () => {
    const user = useSelector(store => store.auth.user)
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Your account</h1>
                <div className={styles.info}>
                    <label>
                        <span>Name</span>
                        <input type="text" disabled value={user?.name ?? 'Not Logged In'} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="text" disabled value={user?.email ?? 'Not Logged In'} />
                    </label>

                </div>
                <div className={styles.links}>
                    <Link to="/orders">Your Orders</Link>
                    {user?.isAdmin && <Link to="/admin">Admin Page</Link>}
                </div>
            </div>
        </div>
    )
}

export default Account