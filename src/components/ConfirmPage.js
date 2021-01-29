import React from 'react'
import order from '../Images/order.svg'
function ConfirmPage() {
    return (
        <>
        <div className="confirmPage">
          
            <img className="confirmPage_img" 
            src={order}/>
              <h3>Your Order Successful</h3>
        </div>
        <div className="view_height">

        </div>
        </>
    )
}

export default ConfirmPage
