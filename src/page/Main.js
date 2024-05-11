import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Main = ()=> {

    // 상태를 배열로 초기화
    const [hello, setHello] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((res) => {
                console.log("데이터 불러오기 성공:", res.data);
                setHello(res.data.content);
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    }, []);


    return (
        <div>
            <div className="main_wrapper w-500 border-current border-solid">
                <header className="w-full">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/5">
                            {/*최근본맛집*/}
                            <a>
                                <img src="https://karymarket.com/images/icon_eye.png"
                                     className="icon_eye block m-auto"/>
                            </a>
                        </div>
                        <div className="w-3/5 text-center text-2xl line-height-4">
                            shopping mal
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg"
                                     className="icon_bell block m-auto"/>
                            </a>

                        </div>
                    </div>
                </header>
                {/*검색 영역*/}
                <div className="w-full">
                    <div className="search">
                        <Link>
                            <input/> 검색창
                        </Link>
                    </div>

                </div>

                <div className="App">
                    <h2>백엔드 데이터</h2>
                    {hello.length > 0 ? (
                        <ul>
                            {hello.map(product => (
                                <li key={product.product_id}>
                                    {product.product_id} - {product.product_name} - {product.category_code}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>데이터가 없습니다.</p>
                    )}
                </div>

                <div className="w-full">
                    <div className="w-full flex flex-wrap">
                        {/*카테고리*/}
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4" to="/">
                                여성의류
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3 ">
                            <Link className="categorey-icon w-3/4">
                                남성의류
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                신발
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                패션잡화
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                디저트
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                샐러드
                                <img/>
                            </Link>
                        </div>
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

export default Main;
