import './Navbar.css'
import PropTypes from 'prop-types';
import { useState } from 'react';
import cartImage from "./../assets/cart-icon.png";


const propTypes = {
    removeFromCart: PropTypes.func,
    products: PropTypes.array
}

const defaultProps = {
    removeFromCart: () => { },
    products: []
}

const NavBar = (props) => {

    const [isCartMenuOpen, setCartMenuOpen] = useState(false)

    let totalPrice = props.products.reduce(function (accumulator, item) {
        return accumulator + item.price * item.quantity;
    }, 0);

    /* 
    * Toggle Cart Item list
    */
    const toggleCartMenu = () => {
        setCartMenuOpen(!isCartMenuOpen);
    }

    return (<div className="navbar__container">
        <header className="navbar">
            <div className="navbar__title" title={"Mini Cart"}>Mini Cart</div>

            <div className="navbar__cart">
                <div
                    className="navbar__cart-item-icon"
                    onClick={toggleCartMenu}
                    title={"Cart Items"}
                >
                    <div className={"navbar_cart-toggle"} >
                        <span>{totalPrice ? "$" + totalPrice : ""}</span>
                        <button className="navbar__cart-btn">{props.products.length} Items </button>
                    </div>
                    <img className="cart__product-image" src={cartImage} alt={"Items"} />

                </div>

                <div className={"navbar__cart-content " + (isCartMenuOpen ? "is-cart-menu-open" : "")}>
                    {(props.products.length > 0 ? <span className={"arrow"}></span> : "")}
                    {(props.products.length > 0 && props.products.map((prod) => {
                        return (<div key={prod.id} className="list">
                            <div className="close"
                                onClick={() => {
                                    props.removeFromCart(prod.id);
                                }}
                                title={"Remove from cart"}
                            ></div>
                            <div className="product-details">
                                <div className="product-title">{prod.title}</div>
                                <div className="product-price">{prod.currency}{prod.price * prod.quantity}</div>
                            </div>
                            <div className="">Qty {prod.quantity}</div>
                        </div>)
                    }))}

                </div>
            </div>
        </header>
    </div>)
};


NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
export default NavBar;
