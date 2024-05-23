import React, {useEffect, useState} from "react";
import {Link , useLocation} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../page/axiosInstance";


const Search = ()=> {

    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("query");

        const fetchProducts = async () => {
            if (query) {
                const response = await axiosInstance.get(`/api/products?searchTerm=${query}`);
                setProducts(response.data.content);
            }
        };

        fetchProducts();
    }, [location]);

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

                <div>
                    {products.length > 0 ? (
                        <ul>
                            {products.map(product => (
                                <li key={product.product_id}>
                                    {product.product_name} - {product.price}
                                    <img src={product.productImg} alt="Product"/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )}
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

export default Search;


