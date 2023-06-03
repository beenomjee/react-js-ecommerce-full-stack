import { useEffect } from "react"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";
import { makeEmptyCart } from "../../store";

const SuccessPayment = () => {
    const navigate = useNavigate();
    const token = useSelector(store => store.auth.user?.token);
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        const checkValidity = async () => {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stripe/check-validity`, {
                    sessionId
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                dispatch(makeEmptyCart());
                toast.success("Payment successful!");
            } catch (error) {
                toast.error(error.response.data.message ?? error.message);
            }
            navigate('/', { replace: true });
        };
        checkValidity();
    }, [dispatch, navigate, token])
    return (
        <div className="loader">
            <Loader />
        </div>
    )
}

export default SuccessPayment