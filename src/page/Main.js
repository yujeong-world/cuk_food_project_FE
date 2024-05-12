import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Main = ()=> {
    // 상태를 배열로 초기화
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((res) => {
                setProduct(res.data.content);
                // 가정: 각 제품에 category_code 속성이 있음
                const uniqueCategories = [...new Set(res.data.content.map(product => product.category_code))];
                setCategories(uniqueCategories);
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
                    {products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <li key={product.product_id}>
                                    {product.product_name}
                                    {product.price}
                                    <img src={product.productImg}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>데이터가 없습니다.</p>
                    )}
                </div>

                <div className="w-full">
                    <div className="w-full flex flex-wrap">
                        {categories.map(category => (
                            <div className="w-1/3" key={category}>
                                <Link className="category-icon w-3/4" to={`/category/${category}`}>
                                    {category}
                                </Link>
                            </div>
                        ))}
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
