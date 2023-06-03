import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Search from '../Search/Search';
import { useMediaQuery } from '../../hooks'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

const Header = () => {
    const isMobile = useMediaQuery(765);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector(store => store.auth?.user?.token);
    const cartItems = useSelector(store => store.cart.items);

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <header className={styles.header}>
            <div className={styles.top}>
                {!isMobile && <Search open={isSearchBarOpen} setOpen={setIsSearchBarOpen} />}
                <h6><Link to="/">Avion</Link></h6>
                <div className={styles.buttons}>
                    {
                        !isMobile && (
                            <>
                                <Link data-no-of-items={cartItems.length} className={styles.cart} to="/cart"><img src="/icons/Shopping--cart.svg" alt="Shopping--cart" /></Link>
                                {location.pathname === '/account' ? (
                                    <button onClick={logoutHandler} type='button'><AiOutlineLogout /></button>
                                ) : (
                                    <Link to="/account"><img src="/icons/User--avatar.svg" alt="User--avatar" /></Link>
                                )}
                            </>
                        )
                    }
                    {isMobile && (
                        <>
                            <Search left open={isSearchBarOpen} setOpen={setIsSearchBarOpen} />
                            <Menu direction='left' menuButton={<MenuButton><img src="/icons/Menu.svg" alt="Menu" /></MenuButton>} transition>
                                <MenuItem><Link to="/cart">Cart</Link></MenuItem>
                                <MenuItem><Link to="/account">Account</Link></MenuItem>
                                {token && <MenuItem onClick={logoutHandler}>Logout</MenuItem>}
                            </Menu>
                        </>
                    )}
                </div>
            </div>
            {
                !isMobile && (
                    <nav className={styles.bottom}>
                        <Link to="/products">All Products</Link>
                        <Link to="/search?q=ceramics">Ceramics</Link>
                        <Link to="/search?q=tables">Tables</Link>
                        <Link to="/search?q=chairs">Chairs</Link>
                        <Link to="/search?q=crockery">Crockery</Link>
                        <Link to="/search?q=tableware">Tableware</Link>
                        <Link to="/search?q=cutlery">Cutlery</Link>
                    </nav>
                )
            }
        </header>
    )
}

export default Header