import axios from 'axios';
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:800', // 기본 URL 설정
    withCredentials: true, // 쿠키를 포함한 요청을 보내도록 설정
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 액세스 토큰을 가져와 요청 헤더에 추가
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // 401 오류(인증 실패)가 발생했을 때 토큰 재발급 시도
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // 리프레시 엔드포인트로 요청을 보내 새 토큰을 발급받음
                const response = await axios.post('http://localhost:8080/reissue', {}, {
                    withCredentials: true,
                });
                const newAccessToken = response.headers['access'];
                const newRefreshToken = response.headers['refresh'];

                console.log('New access token:', newAccessToken);
                console.log('New refresh token:', newRefreshToken);

                // 새로운 액세스 토큰을 로컬 스토리지에 저장하고, 새로운 리프레시 토큰을 쿠키에 저장
                if (newAccessToken) {
                    localStorage.setItem('access_token', newAccessToken);
                    if (newRefreshToken) {
                        Cookies.set('refresh', newRefreshToken, { secure: true, sameSite: 'Strict' });
                    }
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.error('토큰 갱신 중 오류 발생', err);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
