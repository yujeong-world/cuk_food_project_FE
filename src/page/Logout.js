import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../page/axiosInstance"; // axiosInstance를 사용
import Cookies from 'js-cookie';

// 로그아웃 컴포넌트
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청을 보내고 로컬 스토리지와 쿠키에서 토큰 제거
            await axiosInstance.post('/logout');
            localStorage.removeItem('access_token');
            Cookies.remove('refresh');
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
