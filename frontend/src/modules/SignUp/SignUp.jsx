import { useDispatch, useSelector } from 'react-redux';
import styles from './SignUp.module.scss'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { signup } from '../../store';
import { signUpValidationSchema } from '../../Schemas';
import { Loader } from '../../components';

const initialValues = {
    email: '',
    password: '',
    name: '',
};

const SignUp = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.auth.isLoading)
    const formik = useFormik({
        initialValues,
        validationSchema: signUpValidationSchema,
        onSubmit: (values) => {
            dispatch(signup(values));
        },
    });
    return (
        <div className={styles.center}>
            <form className={styles.box} onSubmit={formik.handleSubmit}>
                <h1>Sign Up</h1>
                <label>
                    <span>Name</span>
                    <input type="text" placeholder="What's your name?" id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <p>{formik.errors.name && formik.touched.name && formik.errors.name}</p>
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" placeholder="What's your email?" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <p>{formik.errors.email && formik.touched.email && formik.errors.email}</p>
                </label>
                <label>
                    <span>Password</span>
                    <input autoComplete='on' type="password" placeholder="What's your password?" id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <p>{formik.errors.password && formik.touched.password && formik.errors.password}</p>
                </label>
                <button type='submit' disabled={isLoading}>{isLoading ? <Loader /> : 'Sign Up'}</button>
                <Link to="/signin">Already have Account?</Link>
            </form>
        </div>
    )
}

export default SignUp