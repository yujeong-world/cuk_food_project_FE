import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Main = ()=> {
    const [hello, setHello] = useState('');


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

    // hello 상태의 값 확인
    console.log("hello 상태:", hello[0]);

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
                {/*검색 영역*/}
                <div className="w-full">
                    <div className="search">
                        <Link>
                            <input/> 검색창
                        </Link>
                    </div>

                </div>

                <div className="App">
                    백엔드 데이터 : {hello}
                </div>
                
                <div>
                    <div>
                        슬라이더 영역
                    </div>
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

      {/*      <div>

                {Object.values(hello).map(item => (
                    <React.Fragment key={item.content.product_id}>
                        <p>상품명 : {item.product_name}</p>
                        <p>선택 수량 : {item.product.category_code}</p>
                        <p>가격 : {item.product.price}</p>
                        <img src={item.product.productImg}/>
                    </React.Fragment>
                ))}
            </div>*/}


            {/* 서버에서 받아온 상품 목록 출력 */}
            {/*<div >*/}
            {/*    {hello.map(product => (*/}
            {/*        <div key={product.product_id}>*/}
            {/*            <p>상품명 : {product.product_name}</p>*/}
            {/*            <p>카테고리 : {product.category_code}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}



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
