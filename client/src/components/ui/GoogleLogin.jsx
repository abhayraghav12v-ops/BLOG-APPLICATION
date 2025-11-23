import React from 'react'
import { Button } from './button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '@/helpers/firebase';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { RouteIndex } from '@/helpers/RouteName';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const dispath = useDispatch()

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const googleResponce = await signInWithPopup(auth, provider);
            const user = googleResponce.user;
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
            };
            const response = await fetch(
                `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(bodyData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return showToast('error', data.message)

            }
            dispath(setUser(data.user))
            navigate(RouteIndex);
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }
    return (
        <Button variant="outline" className="w-full" onClick={handleLogin} >
            <FcGoogle />
            Continue With Google
        </Button>
    )
}

export default GoogleLogin
