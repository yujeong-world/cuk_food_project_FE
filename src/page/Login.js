import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
        <div>
            <div className="main_wrapper w-500 border-current border-solid">
                <header className="w-full">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_eye.png"
                                     className="icon_eye block m-auto"/>
                            </a>
                        </div>
                        <div className="w-3/5 text-center text-2xl line-height-4">
                            <Link to="/">
                                shopping mal
                            </Link>
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg"
                                     className="icon_bell block m-auto"/>
                            </a>

                        </div>
                    </div>
                </header>
                <div className="page_header">
                    <div className="header-left">
                        <span className="material-symbols-outlined">
                        arrow_back_ios
                        </span>
                        <span className="page-title">
                            로그인
                        </span>
                    </div>
                    <div className="header-right">
                        <Link href="/s" id="sm-head-search">
                            <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                        </Link>


                        <Link href="/" id="head-home" className="default_ml_10">
                            <img src="https://karymarket.com/images/icon_home.svg" className="header_icon icon_home" alt="home" />
                        </Link>

                    </div>

                </div>
                <div>
                    <div className="login_sns login_text">
                        SNS 로그인
                    </div>
                    <div className="login_sns">
                        <button onClick={() => handleOAuthLogin('naver')} className="icon_naver_logo">
                            <img className="icon_naver_logo" src="https://www.karymarket.com/images/icon_naver_logo.png" alt="icon_naver_logo"/>
                        </button>
                        <button onClick={() => handleOAuthLogin('google')} className="icon_google_logo">
                            <img className="icon_google_logo" src="https://www.karymarket.com/images/icon_google_logo.png" alt="icon_google_logo"/>
                        </button>
                        <button onClick={() => handleOAuthLogin('kakao')} className="icon_kakao_logo">
                            <img className="icon_kakao_logo" src="https://www.karymarket.com/images/icon_kakao_logo.png" alt="icon_kakao_logo"/>
                        </button>
                    </div>
                </div>
                <footer>
                    <div className="tab_bar">
                        <ul>
                            <li>
                                <Link>
                                    <img className="icon_tab_hamburger" src="https://karymarket.com/images/icon_tab_hamburger.png" alt="category icon"/>
                                    <p className="tab_bar_text">카테고리</p>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <img className="icon_tab_search" src="https://karymarket.com/images/icon_tab_search.png" alt="search icon"/>
                                    <p className="tab_bar_text">검색</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <img className="icon_tab_home" src="https://karymarket.com/images/icon_tab_home.png" alt="home icon"/>
                                    <p className="tab_bar_text">홈</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/my">
                                    <img className="icon_tab_my_info" src="https://karymarket.com/images/icon_tab_my_kary.png" alt="my info icon"/>
                                    <p className="tab_bar_text">내정보</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <img className="icon_tab_cart" src="https://karymarket.com/images/icon_tab_cart.png" alt="cart icon"/>
                                    <p className="tab_bar_text">장바구니</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </footer>

            </div>



        </div>

       /* <>
            <div>
                <button onClick={() => handleOAuthLogin('naver')}>Naver Login</button>
            </div>
            <div>
                <button onClick={() => handleOAuthLogin('google')}>Google Login</button>
            </div>
            <div>
                <button onClick={() => handleOAuthLogin('kakao')}>Kakao Login</button>
            </div>
        </>*/
    );
};

export default Login;
