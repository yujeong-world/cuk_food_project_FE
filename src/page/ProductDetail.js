import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../page/axiosInstance";
import QnASection from "../page/QnASection"; // QnASection 컴포넌트를 가져옵니다.
import ReviewSection from "../page/ReviewSection"; // ReviewSection 컴포넌트를 가져옵니다.

const ProductDetail = () => {
    const { productCode } = useParams();
    const [products, setProduct] = useState([]);
    const [showQnA, setShowQnA] = useState(false); // 추가: showQnA 상태 변수
    const [showReviews, setShowReviews] = useState(false); // 추가: showReviews 상태 변수

    useEffect(() => {
        axiosInstance.get(`/api/products/${productCode}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    }, [productCode]);

    const handleReviewClick = () => {
        setShowReviews(true);
        setShowQnA(false);
    };

    const handleQnAClick = () => {
        setShowReviews(false);
        setShowQnA(true);
    };

    return (
        <div>
            <div className="main_wrapper w-500 border-current border-solid">
                <header className="w-full">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_eye.png" className="icon_eye block m-auto" />
                            </a>
                        </div>
                        <div className="w-3/5 text-center text-2xl line-height-4">
                            <Link to="/">
                                shopping mal
                            </Link>
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg" className="icon_bell block m-auto" />
                            </a>
                        </div>
                    </div>
                </header>
                <div>
                    상품상세 페이지
                    <div>
                        <img src={products.productImg} alt="Product" />
                    </div>
                    <div>
                        <p>카테고리 : {products.category_code}</p>
                        <p>가격 : {products.price}</p>
                    </div>
                    <div className="pd_tap">
                        <ul>
                            <li>상품정보</li>
                            <li onClick={handleReviewClick}>리뷰</li> {/* 수정: handleReviewClick 함수 사용 */}
                            <li onClick={handleQnAClick}>상품 Q&A</li> {/* 수정: handleQnAClick 함수 사용 */}
                        </ul>
                    </div>

                    {showReviews && <ReviewSection productCode={productCode} />} {/* 수정: showReviews 사용 */}
                    {showQnA && <QnASection productCode={productCode} />} {/* 수정: showQnA 사용 */}
                </div>
            </div>

            <footer>
                <div>
                    <ul>
                        <li>
                            <Link to="#">카테고리</Link>
                        </li>
                        <li>
                            <Link to="#">검색</Link>
                        </li>
                        <li>
                            <Link to="#">홈</Link>
                        </li>
                        <li>
                            <Link to="#">내정보</Link>
                        </li>
                        <li>
                            <Link to="#">장바구니</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetail;
