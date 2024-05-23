import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../page/axiosInstance";
import Logout from "../page/Logout"; // 로그아웃 컴포넌트 추가

const Main = () => {
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
                const response = await axiosInstance.get(`/api/products${query}`);
                setProduct(response.data.content);
                const uniqueCategories = [...new Set(response.data.content.map(product => product.category_code))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
                setProduct([]); // 데이터를 불러오지 못했을 때 빈 배열로 설정
            }
        };

        fetchProducts();  // 컴포넌트 마운트 시 및 searchTerm 변경 시 호출
    }, [searchTerm]);

    const handleSearch = () => {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <div className="main_wrapper w-500 border-current border-solid">
                <header className="w-full">
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_eye.png"
                                     className="icon_eye block m-auto" alt="eye icon"/>
                            </a>
                        </div>
                        <div className="w-3/5 text-center text-2xl line-height-4">
                            shopping mal
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg"
                                     className="icon_bell block m-auto" alt="bell icon"/>
                            </a>
                        </div>
                    </div>
                </header>
                {/*검색 영역*/}
                <div className="w-full">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="상품 검색"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </div>
                </div>

                <div>
                    슬라이드 영역
                </div>

                <div>
                    <Link to="/login">
                        <button>Login</button>
                    </Link> {/* 로그인 페이지로 이동하는 링크 추가 */}
                </div>
                <Logout /> {/* 로그아웃 컴포넌트 추가 */}

                {/*카테고리*/}
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

                <hr className="hr_black6"></hr>
                <div className="App pd_list">
                    <p>일반 상품</p>
                    {products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <li key={product.product_id}>
                                    <Link to={`/productDetail/${product.product_id}`}>
                                        <div className="product_box">
                                            <img src={product.productImg} alt={product.product_name}/>
                                            <p>{product.product_name}</p>
                                            <p>{product.price}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>데이터가 없습니다.</p>
                    )}
                </div>
                <hr className="hr_black6"></hr>

                <footer>
                    <div className="tab_bar">
                        <ul>
                            <li>
                                <Link>
                                    <img className="icon_tab_hamburger" src="https://karymarket.com/images/icon_tab_hamburger.png" alt="category icon"/>
                                    <p className="tab_bar_text">카테고리</p>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <img className="icon_tab_search" src="https://karymarket.com/images/icon_tab_search.png" alt="search icon"/>
                                    <p className="tab_bar_text">검색</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <img className="icon_tab_home" src="https://karymarket.com/images/icon_tab_home.png" alt="home icon"/>
                                    <p className="tab_bar_text">홈</p>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <img className="icon_tab_my_info" src="https://karymarket.com/images/icon_tab_my_kary.png" alt="my info icon"/>
                                    <p className="tab_bar_text">내정보</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <img className="icon_tab_cart" src="https://karymarket.com/images/icon_tab_cart.png" alt="cart icon"/>
                                    <p className="tab_bar_text">장바구니</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Main;
