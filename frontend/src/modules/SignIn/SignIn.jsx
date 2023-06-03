import { useFormik } from 'formik';
import styles from './SignIn.module.scss'
import { Link } from 'react-router-dom'
import { signInValidationSchema } from '../../Schemas';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../store';
import { Loader } from '../../components';

const initialValues = {
    email: '',
    password: '',
};

const SignIn = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.auth.isLoading)
    const formik = useFormik({
        initialValues,
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            dispatch(signin(values));
        },
    });
    return (
        <div className={styles.center} >
            <form className={styles.box} onSubmit={formik.handleSubmit}>
                <h1>Sign In</h1>
                <label>
                    <span>Email</span>
                    <input autoComplete='off' type="email" placeholder="What's your email?" name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    <p>{formik.errors.email && formik.touched.email && formik.errors.email}</p>
                </label>
                <label>
                    <span>Password</span>
                    <input autoComplete='on' type="password" id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="What's your password?" />
                    <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p>
                </label>
                <button type='submit' disabled={isLoading}>{isLoading ? <Loader /> : 'Sign in'}</button>
                <Link to="/signup">Create Account</Link>
            </form>
        </div>
    )
}

export default SignIn