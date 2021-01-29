export const initialState={
    loading:true,
    books:[],
    error:null,
    cart:[],
    cartLength:0
}
export const getBasketTotal=(basket)=>
basket?.reduce((amount,item)=>item.price*item.count+amount,0)

const Reducer=(state,action)=>{
console.log(state)
switch(action.type){

  case 'FATCH_SUCCESS':
  return {
    ...state,
    loading:false,
    books:action.payload,
  }
  case 'FETCH_ERROR':
  return {
    ...state,
    loading:false,
    error:'something went wrong',
  }
  case 'ADD_TO_CART':
  if(state.cart.length===0)
    state.cart=[...state.cart,action.payload]
  else if(state.cart?.indexOf(action.payload)!==-1)
  {
    action.payload.count++;
    state.cart.map(m=>m.bookId===action.payload.bookId?action.payload:m);
  }else 
  state.cart=[...state.cart,action.payload]
 
    
  return {
    ...state,
    cartLength:state.cartLength+1
  };
  case 'REMOVE_ITEM':
    let updatedCart=state.cart;
    console.log(action.payload.count,action.payload.count===1)
    if(action.payload.count===1){
       updatedCart=state.cart.filter(book=>book.bookID!==action.payload.bookID)
    }else
    {
      action.payload.count--;
      updatedCart.map(m=>m.bookID===action.payload.bookID?action.payload:m)
    }
    
    
    return {
      ...state,
      cart:updatedCart,
      cartLength:state.cartLength-1
    };
   
  default:
  return state;
}
}
export default Reducer