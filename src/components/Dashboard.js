import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import {useStateValue} from '../StateProvider';
import Card from './Card';
import Header from './Header';
function Dashboard() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [search,setSearch]=useState('');
    const [{loading,books,cart,error,cartLength},dispatch]=useStateValue();
    console.log(cart)
    useEffect(()=>{
        const slice = books.slice(offset, offset + perPage)
        setData(slice)
        setPageCount(Math.ceil(books.length / perPage));

    },[offset]);
    useEffect(()=>{
        const slice = books.slice(0, 0 + 10)
        setData(slice)
        setPageCount(Math.ceil(books.length / 10));

    },[books]);
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };
    const searchItem=(value)=>{
        setSearch(value)
     
    }
    const updatedData=data.filter(book=>book.title.toLowerCase().includes(search.toLowerCase()));
    return (

        <>
           {loading?'loading...':
           <div>
           <Header searchItem={searchItem}/>
            <div className="dashbord">
            {
               updatedData.slice(0,10).map(m=><Card book={m}/>) 
            }
            {
                updatedData.length>=10? <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>:""
        
            }
           
        </div>
        <div className="view_height">

        </div>
        </div>
           }
           
        </>
       
    )
}

export default Dashboard
