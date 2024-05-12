import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";  // useParams를 추가하여 임포트
import axios from "axios";

const Category = ()=> {

    const { categoryCode } = useParams(); // URL에서 카테고리 코드 가져옴.
    const [products, setProducts] = useState([]); // 이 카테고리의 제품들을 저장할 상태


    useEffect(() => {
        // 해당 카테고리의 제품 데이터를 불러옵니다.
        axios.get(`/api/products?category=${categoryCode}`)
            .then((res) => {
                console.log(res)
                setProducts(res.data.content); // 상태 업데이트
            })
            .catch((error) => {
                console.error('데이터 불러오기 실패:', error);
            });
    }, [categoryCode]); // categoryCode 변경마다 실행


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
                    <h2>Category: {categoryCode}</h2> {/* 현재 카테고리 표시 */}
                    {products.length > 0 ? (
                        <ul>
                            {products.map((product) => ( // 카테고리의 제품 목록을 동적으로 렌더링
                                <li key={product.product_id}>
                                    {product.product_name}
                                    {product.price}
                                    <img src={product.productImg}/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>이 카테고리에는 상품이 없습니다.</p>
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

export default Category;
