import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './shop-header.css';

const ShopHeader = ({numItems, total}) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">ReStore</div>
      </Link>
      <Link to="/cart">
        <div  className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems} items (${total})
        </div>
      </Link>
    </header>
  );
};

const mapStateToProps = ({ shoppingCart: { orderTotal: total, numItems } }) => {
  return {
    total,
    numItems
  };
};

export default connect(mapStateToProps)(ShopHeader);