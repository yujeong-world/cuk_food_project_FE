import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../page/axiosInstance";


const ProductDetail = ()=> {
    const { productCode } = useParams(); // URL에서 상품코드 가져옴
    const [products, setProduct] = useState([]); // 이 카테고리의 제품들을 저장할 상태
    const [reviews, setReviews] = useState([]); // 리뷰



    useEffect(() => {
        // 해당 카테고리의 제품 데이터를 불러옵니다.
        axiosInstance.get(`/api/product/${productCode}`)
            .then((res) => {
                console.log(res)
                setProduct(res.data); // 상태 업데이트
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    }, [productCode]); // productCode 변경마다 실행

    const handleReviewClick = () => {
        // 리뷰 데이터를 불러옵니다.
        axiosInstance.get(`/api/review/list/${productCode}`)
            .then((res) => {
                console.log(res)
                setReviews(res.data.content); // 상태 업데이트
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    };


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
                            장바구니
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
                    상품상세 페이지
                    <div>
                        <img src={products.productImg}/>
                    </div>
                    <div>
                        <p>카테고리 : {products.category_code}</p>
                        <p>가격 : {products.price}</p>
                    </div>
                    <div className="pd_tap">
                        <ul>
                            <li>상품정보</li>
                            <li onClick={handleReviewClick}>리뷰</li> {/* 리뷰를 클릭하면 handleReviewClick 함수 실행 */}
                            <li>상품 Q&A</li>
                        </ul>
                    </div>

                    <div>
                        <p>리뷰</p>
                        {reviews.context}

                        <div>

                            {Object.values(reviews).map(item => (
                                <React.Fragment key={item.reviewId}>
                                    <p>상품명 : {item.context}</p>
                                    {/*<p>선택 수량 : {item.product.productId}</p>
                                    <p>가격 : {item.product.price}</p>
                                    <img src={item.product.productImg}/>*/}
                                </React.Fragment>
                            ))}
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

export default ProductDetail;
