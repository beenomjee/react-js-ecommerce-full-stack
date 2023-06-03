import { useDispatch, useSelector } from 'react-redux';
import styles from './Layout.module.scss';
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TbBrandCashapp } from 'react-icons/tb'
import { useClickOutside, useMediaQuery } from '../../../hooks';
import { BsArrowRight } from 'react-icons/bs'
import { useRef, useState } from 'react';
import { logout } from '../../../store';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const user = useSelector(store => store.auth.user);
    const isTablet = useMediaQuery(800);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useClickOutside(ref, () => {
        if (ref.current && isTablet) {
            setIsSidebarOpen(false);
        }
    })

    const logoutHandler = () => {
        navigate('/', { replace: true });
        dispatch(logout())
    }
    return (
        <div className={`${styles.sidebar}`} ref={ref}>
            <h2><NavLink to="/">Avion</NavLink></h2>
            <div className={styles.info}>
                <img src="/imgs/admin/avatar.png" alt="avatar" />
                <span>{user?.name}</span>
                <span>Admin</span>
            </div>
            <nav className={styles.nav}>
                <NavLink to="/admin"><span><AiOutlineHome /></span><span>Home</span></NavLink>
                <NavLink to="/admin/products"><span><MdProductionQuantityLimits /></span><span>Products</span></NavLink>
                <NavLink to="/admin/orders"><span><TbBrandCashapp /></span><span>Orders</span></NavLink>
            </nav>
            <button onClick={logoutHandler}><span>Logout</span><span><AiOutlineLogout /></span></button>

            {
                isTablet && <button onClick={() => setIsSidebarOpen(p => !p)} className={`${styles.arrow} ${isSidebarOpen ? styles.open : null}`}><BsArrowRight /></button>
            }
        </div>
    )
}


const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={`${styles.left} ${isSidebarOpen ? styles.open : null}`}>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout