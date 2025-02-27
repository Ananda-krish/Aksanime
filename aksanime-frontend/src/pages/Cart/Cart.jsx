import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout"
import "./Cart.css"
import { useNavigate } from "react-router-dom";
function Cart (){

  const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: "SUGAR Play Power Drip Lip Gloss",
          description: "01 Mood",
          price: 399,
          quantity: 1,
          image: "https://via.placeholder.com/60",
        },
        {
          id: 2,
          name: "Matte Attack Transferproof Lipstick",
          description: "01 Boldplay (Cardinal Pink)",
          price: 749,
          quantity: 1,
          image: "https://via.placeholder.com/60", 
        },
      ]);
    
      
      const handleQuantityChange = (id, delta) => {
        const updatedCart = cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
        });
        setCartItems(updatedCart);
      };
    
      const handleRemove = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
      };
    
      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return(
        <DefaultLayout>
      <div class="cart-container">
  
    <div class="bag-summary">
        <h3>BAG SUMMARY</h3>
        <div class="cart-item">
            <img src="lip-gloss.png" alt="Product Image" class="product-img" />
            <div class="item-details">
                <p>SUGAR Play Power Drip Lip Gloss</p>
                <p>01 Mood</p>
                <p class="price">₹399</p>
            </div>
            <div class="item-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
                <button class="remove-btn">🗑️</button>
            </div>
        </div>

        <div class="cart-item">
            <img src="lipstick.png" alt="Product Image" class="product-img" />
            <div class="item-details">
                <p>Matte Attack Transferproof Lipstick</p>
                <p>01 Boldplay (Cardinal Pink)</p>
                <p class="price">₹749</p>
            </div>
            <div class="item-actions">
                <button>-</button>
                <span>1</span>
                <button>+</button>
                <button class="remove-btn">🗑️</button>
            </div>
        </div>
    </div>

    
    <div class="price-summary">
        <div class="apply-coupon">
            <h3>APPLY COUPON</h3>
            <input type="text" placeholder="Enter Gift code or discount code" />
            <button class="apply-btn">APPLY</button>
        </div>

        <div class="price-details">
            <h3>PRICE DETAILS</h3>
            <p>Item(s) Total: ₹1148</p>
            <p>Savings: -₹0</p>
            <p>Shipping: <span class="free">Free</span></p>
            <hr />
            <h4>Total: ₹1148</h4>
            <button className="place-order-btn" onClick={() => navigate("/payment")}>
              PLACE ORDER
            </button>
        </div>
    </div>
</div>

       </DefaultLayout>   
    )
}
export default Cart