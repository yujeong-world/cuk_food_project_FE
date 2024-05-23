import { Routes, Route } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import './index.css';
import './App.css';
import ProductCategory from './page/ProductCategory';
import Cart from './page/Cart';
import Category from './page/Category';
import Search from './page/Search';
import ProductDetail from './page/ProductDetail';
import OAuth2RedirectHandler from './page/OAuth2RedirectHandler';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productCategory" element={<ProductCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryCode" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/productDetail/:productCode" element={<ProductDetail />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
    );
};

export default App;
