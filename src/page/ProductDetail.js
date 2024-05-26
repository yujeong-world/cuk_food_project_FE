import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../page/axiosInstance";
import QnAPage from "./QnAPage"; // QnAPage 컴포넌트를 가져옵니다.

const ProductDetail = () => {
    const { productCode } = useParams();
    const [products, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [showQnA, setShowQnA] = useState(false);
    const [showQnAForm, setShowQnAForm] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

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
        axiosInstance.get(`/api/review/list/${productCode}`)
            .then((res) => {
                setReviews(res.data.content);
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    };

    // 상품 Qna Api
    const fetchQuestions = async (page = 0) => {
        try {
            const response = await axiosInstance.get(`/api/qna/question?productId=${productCode}&page=${page}`);
            const { content, totalPages, totalElements } = response.data;
            setQuestions(content);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
            setShowQnA(true);
        } catch (error) {
            console.error("Error fetching questions", error);
        }
    };

    // Qna 등록 했을때 랜더링
    const addQuestion = (newQuestion) => {
        setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);

        // Qna 가 5개에서 6개로 늘어났을때 즉시 1,2 페이지 렌더링
        setTotalElements((prevTotal) => prevTotal + 1);

        // 페이지 갯수
        setTotalPages(Math.ceil((totalElements + 1) / 5));
        setShowQnAForm(false);
    };

    // Qna 폼 토글 함수
    const toggleQnAForm = () => {
        setShowQnAForm(!showQnAForm);
    };

    // 페이징 네이션 핸들러 함수
    const handlePageChange = (newPage) => {
        fetchQuestions(newPage);
        setPage(newPage);
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
                        <Link to="/s" id="sm-head-search">
                            <img src="https://karymarket.com/images/icon-search.svg" className="header_icon icon-sm icon_search" alt="search" />
                        </Link>

                        <Link to="/" id="head-home" className="default_ml_10">
                            <img src="https://karymarket.com/images/icon_home.svg" className="header_icon icon_home" alt="home" />
                        </Link>
                    </div>
                </div>
                <div>
                    상품상세 페이지
                    <div>
                        <img src={products.productImg} />
                    </div>
                    <div>
                        <p>카테고리 : {products.category_code}</p>
                        <p>가격 : {products.price}</p>
                    </div>
                    <div className="pd_tap">
                        <ul>
                            <li>상품정보</li>
                            <li onClick={handleReviewClick}>리뷰</li>
                            <li onClick={() => fetchQuestions(0)}>상품 Q&A</li>
                        </ul>
                    </div>

                    <div>
                        {reviews.map(item => (
                            <React.Fragment key={item.reviewId}>
                                <p>상품명 : {item.context}</p>
                            </React.Fragment>
                        ))}
                    </div>

                    {showQnA && (
                        <div className="qna-section">

                            {/*Qna 등록 내용*/}
                            <div className="qna-container">
                                {questions.map((q) => (
                                    <div key={q.qna_id} className="qna-card">
                                        <div className="qna-content">
                                            <h6>{q.questioner.name}</h6>
                                            <p>{q.createdAt ? new Date(q.createdAt).toLocaleString() : 'Unknown'}</p>
                                            <p>{q.question}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/*페이지네이션*/}
                            <div className="pagination-controls">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={`pagination-button ${page === index ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            {/*작성 폼*/}
                            <div className="qna-controls">
                                <button className="btn btn-primary" onClick={toggleQnAForm}>
                                    {showQnAForm ? "작성 취소" : "문의하기"}
                                </button>
                                {showQnAForm && (
                                    <QnAPage productCode={productCode} addQuestion={addQuestion} />
                                )}
                            </div>
                        </div>
                    )}
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
