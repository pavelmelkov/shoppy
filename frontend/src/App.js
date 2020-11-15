import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'; 
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderAdminScreen from './screens/OrderAdminScreen'

function App() {
  return (
    <Router>
      <Header/>
        <main className="py-3">
          <Container>
            {/* user routes */}
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            {/* admin routes */}
            <Route path="/admin/orders/:id/edit" component={OrderAdminScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/users/:id/edit" component={UserEditScreen} />
            <Route path="/admin/products/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} exact />
            <Route 
              path="/admin/productlist/:pageNumber" 
              component={ProductListScreen} exact
            />
            {/* Home screen */}
            <Route path="/" component={HomeScreen} exact/>
            {/* Searched home screen */}
            <Route path="/search/:keyword" component={HomeScreen}/>
            {/* Brands */}
            <Route path="/brand/:brand" component={HomeScreen}/>
            {/* Pagination */}
            <Route path="/page/:pageNumber" component={HomeScreen} exact/>
            <Route 
              path="/search/:keyword/page/:pageNumber" 
              component={HomeScreen}
              exact
            />
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
