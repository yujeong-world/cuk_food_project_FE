import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// 로그인 컴포넌트
const Login = () => {
    const navigate = useNavigate();

    // OAuth 로그인 처리 함수
    const handleOAuthLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    React.useEffect(() => {
        // URL에서 액세스 토큰과 리프레시 토큰을 가져옴
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access');
        const refreshToken = Cookies.get('refresh'); // 쿠키에서 리프레시 토큰 읽기

        console.log('Access Token from URL:', accessToken);
        console.log('Refresh Token from Cookie:', refreshToken);

        // 토큰이 둘 다 존재하면 로컬 스토리지와 쿠키에 저장하고 메인 페이지로 이동
        if (accessToken && refreshToken) {
            localStorage.setItem('access_token', accessToken);
            Cookies.set('refresh', refreshToken, { secure: false, sameSite: 'strict' }); // 개발 환경에서는 secure를 false로 설정
            console.log('Tokens saved to localStorage and Cookies');
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <div>
                <button onClick={() => handleOAuthLogin('naver')}>Naver Login</button>
            </div>
            <div>
                <button onClick={() => handleOAuthLogin('google')}>Google Login</button>
            </div>
            <div>
                <button onClick={() => handleOAuthLogin('kakao')}>Kakao Login</button>
            </div>
        </>
    );
};

export default Login;
