import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom'
import styles from './AdminRoute.module.scss';

const AdminRoute = () => {
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (!user || !user.isAdmin) {
            navigate('/pagenotfound', { replace: true });
        }
        setIsLoading(false);
    }, [navigate, user]);

    return isLoading ? (
        <div className={styles.container}><Loader /></div>
    ) : (
        <Outlet />
    )
}

export default AdminRoute;