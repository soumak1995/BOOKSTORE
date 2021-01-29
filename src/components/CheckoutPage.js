import React from 'react'
import {useStateValue} from '../StateProvider';
import CheckoutCard from './CheckoutCard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory,useLocation } from "react-router-dom";
import {getBasketTotal} from '../Reducer/Reducer'
import Empty from '../Images/empty.svg'
function CheckoutPage() {
    const history= useHistory();
    const [{cart,cartLength}]=useStateValue();
    const checkoutPoduct=()=>{
        history.push('/confirm')
    }
    return (
        <>
        <div className="checkoutPage">
            <div className="checkoutPage_header center">
                <h4>My Cart ({cartLength})</h4>
            </div>
           { cartLength?<div className="checkoutPage_items">
                {cart?.map(book=><CheckoutCard key={book.booId}
                  book={book}/>)}
            </div>:
                <img className="checkoutPage_img" src={Empty}/>
           
}
            {cartLength?<div className="checkout_amount">
                
                    <div className="checkoutCard_title">
                        <h5>Oder Summary</h5>
                        </div>
                
                    <div className="checkoutCard_left" >
                        <p>Total products   </p>
                        <p>Estimated Delivery </p>
                        <h5>Total  </h5>
                    </div>
                    <div className="checkoutCard_right">
                        <strong style={{display:'block'}}>&#x20b9;{getBasketTotal(cart)}</strong>
                        <strong>&#x20b9;129</strong>
                        <h5>&#x20b9; {getBasketTotal(cart)+129}</h5>
                    </div>
                  
            </div>:<h4 style={{textAlign:'center'}}>Your cart is empty</h4>
       } 
       {cartLength?<div className="checkoutPage_aside center">
             <button className=" btn btn-checkout center" 
             onClick={checkoutPoduct}>
                 <ShoppingCartIcon fontSize="small"/>
                 Checkout
                 </button>
            </div>:""}
       
       </div>
        <div className="checkoutPage_footer center">
             <button className=" btn btn-checkout center" 
             onClick={checkoutPoduct}
             disabled={!cartLength}>
                 <ShoppingCartIcon fontSize="small"/>
                 Checkout
                 </button>
            </div>
      </>
    )
}

export default CheckoutPage
