import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const clientId = "21514352158-67va3eem4cfo156k0kg7o7femfs4uvnk.apps.googleusercontent.com";
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/verifyToken`, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                });
        }
    }, []);

    const responseGoogle = async (credentialResponse) => {
        try {
           
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { idToken: credentialResponse.credential });

            
            const { user, token } = response.data;

          
            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', token);
      
        
            setUser(user);
            setIsAuthenticated(true);

         
            navigate('/customer'); 
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLogout = () => {
        
        localStorage.removeItem('userId');
        localStorage.removeItem('token');

  
        setUser(null);
        setIsAuthenticated(false);

       
        navigate('/login');  
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200  shadow-md rounded-lg p-20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {!isAuthenticated ? 'Logged in with Google' : 'Login with Google'}
                    </h2>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => { console.log('Login failed'); }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Login with Google
                        </GoogleLogin>
                    )}
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
