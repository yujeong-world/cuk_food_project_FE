import React, { useEffect, useState } from "react";
import axiosInstance from "../page/axiosInstance";

const QnASection = ({ productCode }) => {
    const [questions, setQuestions] = useState([]);
    const [showQnA, setShowQnA] = useState(false);
    const [showQnAForm, setShowQnAForm] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [question, setQuestion] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, [productCode]);

    // 상품 Qna Api
    const fetchQuestions = async (page = 0, size = 5, sort = 'createdAt,DESC') => {
        try {
            const response = await axiosInstance.get(`/api/qna/question?productId=${productCode}&page=${page}&size=${size}&sort=${sort}`);
            const { content, totalPages, totalElements } = response.data;

            console.log(response.data)

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
        const newQuestions = [newQuestion, ...questions];

        if (newQuestions.length > 5) {
            setQuestions(newQuestions.slice(0, 5));
            setTotalElements((prevTotal) => prevTotal + 1);
            setTotalPages(Math.ceil((totalElements + 1) / 5));

            // 추가된 질문이 현재 페이지에 영향을 줄 경우 페이지를 업데이트(5개에서 ->6개 넘어갈때) 1페이지 유지
            if (page === 0) {
                fetchQuestions(0);
            }
        } else {
            setQuestions(newQuestions);
            setTotalElements((prevTotal) => prevTotal + 1);
            setTotalPages(Math.ceil((totalElements + 1) / 5));
        }

        setShowQnAForm(false);
    };

    // Qna 폼 토글 함수
    const toggleQnAForm = () => {
        setShowQnAForm(!showQnAForm);
    };

    // 페이징 1,2,3 핸들러 함수
    const handlePageChange = (newPage) => {
        fetchQuestions(newPage);
        setPage(newPage);
    };

    // 입력 필드의 변경을 처리하는 함수
    const handleInputChange = (event) => {
        setQuestion(event.target.value); // 입력된 질문을 상태에 저장
    };

    // 폼 제출을 처리하는 함수
    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음
        try {
            // 서버에 질문을 POST 요청으로 전송
            const response = await axiosInstance.post("/api/qna/question", { question, productId: productCode }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newQuestion = response.data; // 서버로부터 받은 새로운 질문 데이터
            console.log("Post 요청 로그 : ", newQuestion);

            // 질문자가 없을 경우 기본 값을 설정
            if (!newQuestion.questioner) {
                newQuestion.questioner = { name: newQuestion.questionerName || 'Unknown' };
            }

            addQuestion(newQuestion); // 새로운 질문을 상위 컴포넌트에 추가
            setQuestion("");          // 질문 입력 필드를 초기화

        } catch (error) {
            console.error("Error creating question", error); // 에러 발생 시 콘솔에 로그 출력
        }
    };

    return (
        <div className="qna-section">
            <div className="qna-container">
                {questions.map((q) => (
                    <div key={q.qnaId} className="qna-card">
                        <div className="qna-content">
                            <h6>{q.questionerName}</h6>
                            <p>{q.createdAt ? new Date(q.createdAt).toLocaleString() : 'Unknown'}</p>
                            <p>{q.question}</p>
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

            <div className="qna-controls">
                <button className="btn btn-primary" onClick={toggleQnAForm}>
                    {showQnAForm ? "작성 취소" : "문의하기"}
                </button>
                {showQnAForm && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={question}
                                onChange={handleInputChange} // 입력폼에 글 입력
                                placeholder="질문을 남겨주세요" // 질문 입력 필드
                            />
                            <button type="submit">작성</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QnASection;
