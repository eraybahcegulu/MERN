import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }

    return { logout };
};

export default useLogout;