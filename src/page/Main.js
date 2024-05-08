import React from "react";
import {Link} from "react-router-dom";

const Main = ()=> {
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
                            가대 맛집
                        </div>
                        <div className="w-1/5">
                            <a>
                                <img src="https://karymarket.com/images/icon_bell.svg" className="icon_bell block m-auto"/>
                            </a>

                        </div>
                    </div>
                </header>
                
                <div>
                    <div>
                        슬라이더 영역
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full flex flex-wrap">
                        {/*카테고리*/}
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4" to="/">
                                한식
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3 ">
                            <Link className="categorey-icon w-3/4">
                                중식
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                일식
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                카페
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                디저트
                                <img/>
                            </Link>
                        </div>
                        <div className="w-1/3">
                            <Link className="categorey-icon w-3/4">
                                샐러드
                                <img/>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Main;
