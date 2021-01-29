import React from 'react'
import Rating from '@material-ui/lab/Rating';
import {useStateValue} from '../StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }));
function Card({book}) {
    const [{loading,books,error,cart,cartLength},dispatch]=useStateValue();
    const classes = useStyles();
    const addToCart=()=>{
        dispatch({type:'ADD_TO_CART',payload:book})
    }
    console.log(cart)
    return (
        <div className="card">
              <section className="card_section">
                  <h5>{book?.title}</h5>
                  <small>Author: {book?.authors}</small>
                  <strong>&#x20b9;{book?.price}</strong>
                  <div className={classes.root}>
                    <Rating name="half-rating"  value={book.average_rating} defaultValue={2.5} precision={0.5} />
                    </div>
                   <button className="btn btn-card center" onClick={addToCart}>
                     <ShoppingCartIcon fontSize="small"/>
                     Add to cart</button>
              </section>
        </div>
    )
}

export default Card
