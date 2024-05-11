import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'; // 액시오스

const SignForm = ()=> {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        // 여기에 초기화 로직을 추가할 수 있습니다.
    }, []);

    const handleSignup = () => {
        axios.post('http://localhost:8080/api/signup', {
            email: email,
            nickname: nickname
        })
            .then(function (response) {
                console.log(response.data);
                // 원하는 동작 수행
            })
            .catch(function (error) {
                console.log(error);
                // 에러 처리 로직 추가
            });
    }

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

                <div>
                    <div className="singForm w-full">
                        <div className="w-4/5 singForm_box">
                            <p>아이디</p>
                            <input type="text" className="singForm_input"/>
                        </div>
                        <div className="w-4/5 singForm_box">
                            <p>비밀번호</p>
                            <input type="password" className="singForm_input"/>
                        </div>
                        <div className="w-4/5 singForm_box">
                            <p>비밀번호 확인</p>
                            <input type="password" className="singForm_input"/>
                        </div>
                        <div className="w-4/5 singForm_box">
                            <p>
                                이메일
                            </p>
                            <input type="text"className="singForm_input"/>
                        </div>
                        <div className="w-4/5 singForm_box">
                            <p>닉네임</p>
                            <input type="text" className="singForm_input"/>
                        </div>
                        
                        <div>
                            <button className="w-4/5 join-btn">
                                <Link>회원가입 하기</Link>
                            </button>
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


export default SignForm;

