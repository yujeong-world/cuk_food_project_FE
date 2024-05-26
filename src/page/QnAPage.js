import React, { useState } from "react";
import axiosInstance from "../page/axiosInstance";

const QnAPage = ({ productCode, addQuestion }) => {
    const [question, setQuestion] = useState("");

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post("/api/qna/question", { question, productId: productCode }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newQuestion = response.data;
            console.log("Post 요청 로그2 : ", newQuestion);

            if (!newQuestion.questioner) {
                newQuestion.questioner = { name: newQuestion.questionerName || 'Unknown' };
            }
            if (!newQuestion.createdAt) {
                newQuestion.createdAt = new Date().toISOString();
            }

            addQuestion(newQuestion);
            setQuestion("");
        } catch (error) {
            console.error("Error creating question", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={question}
                    onChange={handleInputChange}
                    placeholder="질문을 남겨주세요"
                />
                <button type="submit">작성</button>
            </form>
        </div>
    );
};

export default QnAPage;
