import { useNavigate } from "react-router-dom";

export const Order = () => {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('uid') !== null;

    if (!isLoggedIn) {
        console.log('Redirecting to login');
        navigate('/login');
        return null;
    }

    console.log('Rendering Order component');
    return (
        <div>Order</div>
    );
}
