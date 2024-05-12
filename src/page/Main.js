import React, {useEffect, useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";

const Main = () => {
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : '';
                const response = await axios.get(`/api/products${query}`);
                setProduct(response.data.content);
                const uniqueCategories = [...new Set(response.data.content.map(product => product.category_code))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
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
                        <input
                            type="text"
                            placeholder="상품 검색"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </div>
                </div>

                <div className="App">
                    {products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <Link key={product.product_id} to={`/productDetail/${product.product_id}`}>
                                    {product.product_name}
                                    {product.price}
                                    <img src={product.productImg}/>
                                </Link>
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
