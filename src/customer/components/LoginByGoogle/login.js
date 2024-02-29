import { GoogleLogin } from 'react-google-login';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const clientId = "1018686024516-ol8odmqsipcrjoddf224oi8hn5hav80m.apps.googleusercontent.com";

function LoginByGoogle() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSuccess = async (res) => {

        try {
            const userData = {
                email: res.profileObj.email,
                fullName: res.profileObj.name,
                password: '',
                confirmPassword: ''
            };

            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                //const data = await response.json();
                localStorage.setItem("user", JSON.stringify(userData));
                setError(null);

                setTimeout(() => {
                    toast.success("Login successful");
                }, 10);
                navigate("/");

                console.log('User data sent to server', userData);
            } else {
                console.error('Failed to send user data to server');
            }
        } catch (error) {
            //console.error('Error sending user data:', error);
        }

    };

    const onFailure = (res) => {
        console.log('Login failed:', res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText='Login with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    );
};

export default LoginByGoogle;