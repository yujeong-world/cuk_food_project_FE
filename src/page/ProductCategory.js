import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import axiosInstance from "../page/axiosInstance";


const ProductCategory = ()=> {

    const [hello, setHello] = useState('');

    useEffect(() => {
        axiosInstance.get('/api/test')
            .then((res) => {
                setHello(res.data);
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

                <div>
                    백엔드 데이터 : {hello}
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

export default ProductCategory;
