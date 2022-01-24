import './Cart.css';
import productImage from "./../assets/productIcon.png";
import PropTypes from 'prop-types';

const propTypes = {
    updateCart: PropTypes.func,
    products: PropTypes.array
}

const defaultProps = {
    updateCart: () => { },
    resetCartData: () => { },
    products: []
}

const Cart = (props) => {

    function addDefaultSrc(ev) {
        ev.target.src = productImage;
    }

    return (

        <div>
            <ul className="cart__list">
                {props.products && props.products.map((prod) => {
                    return (<li key={prod.id} className="cart__item">
                        <img className="cart__product-image" src={prod.image} alt={prod.title} onError={addDefaultSrc} />
                        <div className="cart__product-details">
                            <div className="cart__product-title">{prod.title}</div>
                            <div className="cart__product-desc">{(prod.desc.length <= 20 ? prod.desc : prod.desc.substring(0, 20))}</div>
                        </div>

                        <div className="cart__qty-actions">
                            <button
                                className='minus'
                                onClick={() => {
                                    props.updateCart('minus', prod.id);
                                }}
                                disabled={prod.quantity === 1 ? "disabled" : ""}
                                title={"Decrease quantity"}
                            >-</button>
                            <input type="text"
                                className="cart__qty-input"
                                value={prod.quantity}
                                disabled={true}
                            />
                            <button className='plus'
                                onClick={() => {
                                    props.updateCart('add', prod.id);
                                }}
                                disabled={prod.quantity >= 10 ? "disabled" : ""}
                                title={"Increase quantity"}
                            >+</button>
                        </div>
                        <div className="cart__product-price">{prod.currency}{prod.price * prod.quantity}</div>
                    </li>)
                })}
            </ul>

            <button
                className="cart__reset-btn"
                onClick={props.resetCartData}
                title={"Reset Data"}
            >
                Reset Data
            </button>
        </div>
    )
}

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;
export default Cart;