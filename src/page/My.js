import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from './axiosInstance'; // 앞서 설정한 axiosInstance를 가져옵니다.

const My = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 사용자 정보 가져오기
        axiosInstance.get("/api/user")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            });
    }, []);

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
                            마이페이지
                        </span>
                    </div>
                    <div className="header-right">
                        <Link to="/s" id="sm-head-search">
                            <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                        </Link>
                        <Link to="/" id="head-home" className="default_ml_10">
                            <img src="https://karymarket.com/images/icon_home.svg" className="header_icon icon_home" alt="home" />
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            {user ? (
                                <p>{user.name} {user.email}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>주문목록</li>
                            <li>리뷰관리</li>
                            <li>배송지 관리</li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <ul>
                        <li><Link>카테고리</Link></li>
                        <li><Link>검색</Link></li>
                        <li><Link>홈</Link></li>
                        <li><Link>내정보</Link></li>
                        <li><Link>장바구니</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default My;
