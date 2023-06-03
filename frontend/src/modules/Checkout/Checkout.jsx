// import React from 'react'
import { toast } from 'react-toastify';
import { Loader } from '../../components';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeEmptyCart } from '../../store';


const Checkout = () => {
    const token = useSelector(store => store.auth.user?.token);
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        const setup = async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stripe/initiate-payment`, {
                    products: cartItems.map(product => ({ _id: product._id, quantity: product.quantity }))
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                window.location = data.url;
            } catch (err) {
                toast.error(err.response.data.message ?? err.message)
                dispatch(makeEmptyCart());
                navigate('/cart');
            }

        }

        setup();
    }, [])

    return (
        <div className="loader"><Loader /></div>
    )
}

export default Checkout