import Club from "../Club/Club"
import Header from "../Header/Header"
import { Outlet } from 'react-router-dom'
import Touch from "../Touch/Touch"
import Footer from "../Footer/Footer"

const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{ minHeight: "100vh" }}>
                <Outlet />
            </div>
            <Club />
            <Touch />
            <Footer />
        </div>
    )
}

export default Layout