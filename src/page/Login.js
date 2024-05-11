import React from "react";
import {Link} from "react-router-dom";

const Login = ()=> {
    return (
        <div>
            <div className="main_wrapper w-500 border-current border-solid">
                <header className="w-full">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/5">
                            {/*최근본맛집*/}
                            <a >
                                <img src="https://karymarket.com/images/icon_eye.png" className="icon_eye block m-auto"/>
                            </a>
                        </div>
                        <div className="w-3/5 text-center text-2xl line-height-4">
                            shopping mal
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg" className="icon_bell block m-auto"/>
                            </a>

                        </div>
                    </div>
                </header>

                <div className="login-box w-full mt-8">
                    <div className="w-full">
                        <div className="w-4/5 login_input">
                            <input type="text" placeholder="아이디"/>
                        </div>
                        <div className="w-4/5 login_input">
                            <input type="password" placeholder="비밀번호"/>
                        </div>
                    </div>
                    
            
                    <button className="w-4/5 login-btn">로그인</button>

                    <div>
                        <Link>
                            아이디/비밀번호 찾기
                        </Link>
                    </div>

                    <button className="w-4/5 join-btn">
                        <Link to="/signForm">회원가입</Link>
                    </button>
                    
                </div>

            <footer>
                <div>
                    <ul>
                        <li>
                            <Link>카테고리</Link>
                        </li>
                        <li>
                            <Link>검색</Link>
                        </li>
                        <li>
                            <Link>홈</Link>
                        </li>
                        <li>
                            <Link>내정보</Link>
                        </li>
                        <li>
                            <Link>장바구니</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
        </div>
    );
};

export default Login;
