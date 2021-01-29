import React,{useEffect}from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import axios from 'axios'
import Dashboard from './components/Dashboard';
import Header from './components/Header'
import CheckoutPage from './components/CheckoutPage'
import {useStateValue} from './StateProvider';
import ConfirmPage from './components/ConfirmPage'
import Dexie from "dexie";
import './App.css'
function App() {
  const [state,dispatch]=useStateValue();
  const db = new Dexie("ReactDexie");

      db.version(1).stores({
        books: "++id,title, authors, average_rating,isbn,language_code,price,ratings_count,bookID"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })

    const getPostInfo = (data) => {
     
                db.books.bulkPut(data).then(async() => {
              let allbooks = await db.books.toArray();            
              dispatch({type:'FATCH_SUCCESS',payload:allbooks})
              console.log(allbooks)
          });
          
      }
  useEffect(()=>{
    axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json")
    .then((res)=>{
      const updatedData=res.data.map(element => ({...element,count:1}));
      getPostInfo(updatedData);
    }).catch((e)=>{
       dispatch({type:'FETCH_ERROR'})
    })
    
},[])

  return (
    <div className="App">
       <BrowserRouter>
           <Switch>
               <Route path='/' exact component={Dashboard} />
               <Route path='/checkout'>
                   <Header/>
                   <CheckoutPage/>
               </Route>
               <Route path='/confirm'>
                  <Header/>
                    <ConfirmPage/>
                 </Route>
           </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
