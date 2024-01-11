import { useNavigate } from "react-router-dom";

export const Order = () => {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('uid') !== null;

    if (!isLoggedIn) {
        navigate('/login');
        return null;
    }

return (
        <div>
            <h1>Order Page</h1>
        </div>
    );
}
