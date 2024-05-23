import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../page/axiosInstance";

const Cart = ()=> {
    const [hello, setHello] = useState('');

    
    useEffect(() => {
        axiosInstance.get('/api/cart/list')
            .then((res) => {
                console.log(res);

                setHello(res.data);
                console.log(res.data[0].product.productName);
            })
    }, []);

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
                
                <div className="page_header">
                    <div className="header-left">
                        <span role="button" className="cursor_pointer">
                            {/*<img className="icon_left_anchor" src="/images/icon_left_back_anchor.png"
                                 alt="icon_left_anchor" />*/}
                            화살표
                        </span>
                        <span className="page-title">
                            장바구니
                        </span>
                    </div>
                    <div className="header-right">
                        <Link href="/s" id="sm-head-search">
                            <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                        </Link>
                       {/* <div className="search-container">
                            <input id="search-box" type="text" className="search-box" />
                                <label htmlFor="search-box" aria-label="search site" className="search-icon-box">
                                    <span className="glyphicon glyphicon-search search-icon">
                                        <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                                    </span>
                                </label>
                        </div>*/}

                        <Link href="/" id="head-home" className="default_ml_10">
                            <img src="https://karymarket.com/images/icon_home.svg" className="header_icon icon_home" alt="home" />
                        </Link>

                    </div>

                </div>

                <div className="w-full">
                    <div className="cart_option_box">


                        <div>

                            {Object.values(hello).map(item => (
                                <React.Fragment key={item.cart_id}>
                                    <p>상품명 : {item.product.productName}</p>
                                    <p>선택 수량 : {item.product.productId}</p>
                                    <p>가격 : {item.product.price}</p>
                                    <img src={item.product.productImg}/>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="product_2">
                            <p>
                                <img/>
                            </p>

                            <p>가격</p>
                            <p>
                                <button>삭제</button>
                                <p>개수</p>
                                <button>옵션변경</button>
                            </p>
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
        </div>
    );
};

export default Cart;
