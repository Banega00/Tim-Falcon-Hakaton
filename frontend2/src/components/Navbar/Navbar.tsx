import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { delete_cookie, useAuth } from '../../utils/Auth';

export const Navbar: React.FC<any> = (props) => {
    const { authed, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        delete_cookie('connect.sid')
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <nav>
            <ul>
                {localStorage.getItem('user') != '' ?
                    <>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li onClick={handleLogOut}>
                            Log out
                        </li>
                    </>
                    :
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                }

            </ul>
        </nav>
    );
}
