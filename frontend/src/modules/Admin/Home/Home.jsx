import { useEffect } from 'react';
import { Loader } from '../../../components'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('products');
    }, [navigate])
    return (
        <div className="loader">
            <Loader />
        </div>
    )
}

export default Home