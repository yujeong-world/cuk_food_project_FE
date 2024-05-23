import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const My = ()=> {



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
                        <Link href="/s" id="sm-head-search">
                            <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                        </Link>


                        <Link href="/" id="head-home" className="default_ml_10">
                            <img src="https://karymarket.com/images/icon_home.svg" className="header_icon icon_home" alt="home" />
                        </Link>

                    </div>

                </div>
                <div>
                    <div>
                        <div>
                            <img/>
                        </div>
                        <div>
                            <p>이름영역</p>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>
                                주문목록
                            </li>
                            <li>
                                리뷰관리
                            </li>
                            <li>
                                배송지 관리
                            </li>
                        </ul>
                    </div>
                </div>


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
    );
};

export default My;
