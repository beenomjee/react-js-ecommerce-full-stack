import { useEffect, useRef } from 'react';
import styles from './Search.module.scss';
import { useClickOutside } from '../../hooks';
import { useNavigate } from 'react-router-dom'

const Search = ({ left, open, setOpen }) => {
    const searchContainer = useRef(null);
    const searchInput = useRef(null);
    const navigate = useNavigate();
    useClickOutside(searchContainer, () => {
        setOpen(false);
    })

    useEffect(() => {
        if (searchInput && open)
            searchInput.current.focus();
    }, [open])


    const onSearch = () => {
        setOpen(false);
        navigate('/search?q=' + searchInput.current.value);
        searchInput.current.value = "";
    }

    return (
        <div ref={searchContainer} className={styles.button} style={{ "--left": left ? "unset" : 0, "--right": left ? 0 : "unset" }}>
            <button className={styles.button} onClick={() => setOpen(p => !p)}>
                <img src="/icons/Search.svg" alt="Search" />
            </button>
            <div className={`${styles.search} ${open ? styles.open : null}`}>
                <input ref={searchInput} type="text" placeholder='Search...' />
                <button onClick={onSearch}>Search</button>
            </div>
        </div>
    )
}

export default Search