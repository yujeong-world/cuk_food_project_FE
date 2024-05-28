import React, { useEffect, useState } from "react";
import axiosInstance from "../page/axiosInstance";

const ReviewSection = ({ productCode }) => {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        fetchReviews();
    }, [productCode]);

    // 리뷰 목록을 가져오는 API 호출 함수
    const fetchReviews = async (page = 0, size = 5, sort = 'createdAt,DESC') => {
        try {
            const response = await axiosInstance.get(`/api/review?productId=${productCode}&page=${page}&size=${size}&sort=${sort}`);
            const { content, totalPages, totalElements } = response.data;

            console.log(response.data)

            setReviews(content);
            setTotalPages(totalPages);
            setTotalElements(totalElements);
            setShowReviews(true);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    // 새로운 리뷰를 추가하고 렌더링하는 함수
    const addReview = (newReview) => {
        const newReviews = [newReview, ...reviews];

        if (newReviews.length > 5) {
            setReviews(newReviews.slice(0, 5));
            setTotalElements((prevTotal) => prevTotal + 1);
            setTotalPages(Math.ceil((totalElements + 1) / 5));

            // 추가된 리뷰가 현재 페이지에 영향을 줄 경우 페이지를 업데이트 (5개에서 -> 6개 넘어갈 때) 1페이지 유지
            if (page === 0) {
                fetchReviews(0);
            }
        } else {
            setReviews(newReviews);
            setTotalElements((prevTotal) => prevTotal + 1);
            setTotalPages(Math.ceil((totalElements + 1) / 5));
        }

        setShowReviewForm(false);
    };

    // 리뷰 폼 토글 함수
    const toggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    // 페이징 핸들러 함수
    const handlePageChange = (newPage) => {
        fetchReviews(newPage);
        setPage(newPage);
    };

    // 입력 필드의 변경을 처리하는 함수
    const handleInputChange = (event) => {
        setReview(event.target.value); // 입력된 리뷰를 상태에 저장
    };

    // 폼 제출을 처리하는 함수
    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음
        try {
            // 서버에 리뷰를 POST 요청으로 전송
            const response = await axiosInstance.post("/api/review", { context: review, productId: productCode }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newReview = response.data; // 서버로부터 받은 새로운 리뷰 데이터
            console.log("Post 요청 로그 : ", newReview);

            // 리뷰 작성자가 없을 경우 기본 값을 설정
            if (!newReview.reviewer) {
                newReview.reviewer = { name: newReview.reviewerName || 'Unknown' };
            }

            addReview(newReview); // 새로운 리뷰를 상위 컴포넌트에 추가
            setReview(""); // 리뷰 입력 필드를 초기화

        } catch (error) {
            console.error("Error creating review", error); // 에러 발생 시 콘솔에 로그 출력
        }
    };

    return (
        <div className="section">
            <div className="container">
                {reviews.map((r) => (
                    <div key={r.reviewId} className="card">
                        <div className="content">
                            <h6>{r.reviewerName}</h6>
                            <p>{r.createdAt ? new Date(r.createdAt).toLocaleString() : 'Unknown'}</p>
                            <p>{r.context}</p>
                        </div>
                    </div>
                ))}
            </div>

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

            <div className="controls">
                <button className="btn btn-primary" onClick={toggleReviewForm}>
                    {showReviewForm ? "작성취소" : "리뷰작성"}
                </button>
                {showReviewForm && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={review}
                                onChange={handleInputChange} // 입력폼에 글 입력
                                placeholder="리뷰를 남겨주세요" // 리뷰 입력 필드
                            />
                            <button type="submit">작성</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
