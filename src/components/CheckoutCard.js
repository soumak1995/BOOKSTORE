import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import {useStateValue} from '../StateProvider';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }));
 
function CheckoutCard({book}) {
    const [{},dispatch]=useStateValue();
    //{authors,average_rating,bookID,language_code,price,ratings_count,title}
    const classes = useStyles();
    const addItem=()=>{
        dispatch({type:'ADD_TO_CART',payload:book})
      }
    const removeItem=()=>{
        dispatch({type:'REMOVE_ITEM',payload:book})
    }
    return (
        <div className="checkoutCard">
            <div className="checkoutCard_title">
                <h5>{book.title}</h5>
                <p>Authors:&nbsp;{book.authors}</p>
            </div>
            
            <div className="checkoutCard_left space-between">
               <p>language:&nbsp;{book.language_code}</p>
               <div className={classes.root}>
                    <Rating name="half-rating"  value={book.average_rating} defaultValue={2.5} precision={0.5} />
             </div>
             <small>Ratings Count:&nbsp;{book.ratings_count}</small>
            </div>
            <div className="checkoutCard_right space-between">
                <p>Qty:&nbsp;<strong>{book.count}</strong></p>
                <section className="checkoutCard_right_section space-between-row">
                    <button onClick={addItem}>+</button>
                   <h5>{book.count}</h5> 
                    <button onClick={removeItem}>-</button>
                </section>
                <strong>&#x20b9;{book?.price*book.count}</strong>
            </div>
        </div>
    )
}

export default CheckoutCard
