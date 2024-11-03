'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import StockTable from "./table/table";
import Spinner from "./spinner/spinner";
import Navbar from "./navbar/navbar";
export default function Home() {
  const [stocks, setStocks]=useState<any>([])
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
   // Fetch search results from API
   const fetchResults = async (searchQuery:any) => {
    setLoading(true);
    try {
      console.log(searchQuery);
      
      const response = await fetch(`https://real-time-finance-data.p.rapidapi.com/search?query=${searchQuery}&language=en`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': `d207130287mshd62c9a45278a473p148aadjsndc72017e759a`  // Or use the appropriate header field
        }
      });
      const data = await response.json();
      setResults(data.data.stock);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
    
  const addToList=(arg:any)=>{
    setResults([]);
    setStocks((pre:any)=>[...pre,arg])
    
  }
   // Debounce the API call
   useEffect(() => {
    // Only fetch if query is not empty
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Set a timeout to delay the API call
    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 500); // 500ms delay

    // Clear timeout if the query changes within the delay
    return () => clearTimeout(delayDebounce);
  }, [query]);
  return (
    <>
    <Navbar/>
    <div className="container py-4" style={{height:'100vh'}}>
      {loading && <Spinner/>}
      <div >
        <div className="d-flex justify-content-center position-relative">
          <input type="text" 
          className={styles.search} 
          placeholder="Search"
          onChange={(e) => setQuery (e.target.value)}
          ></input>
           <div className={styles.searchResult} >
            {results.map((res:any,index)=>(
              <div 
              key={index} 
              className={styles.boxShadow+" p-3 d-flex justify-content-between"}
              onClick={()=>addToList(res)}>
                <div>
                  <div className={styles.titleFont+" "+styles.primaryColor}>
                    {res.name}
                  </div>
                  <div className={styles.fontsmall}>
                    {res.type}
                  </div>
                </div> 
                <div>
                  <div className={styles.titleFont}>
                    ${res.price}
                  </div>
                  <div className={styles.fontsmall}>
                    {res.change_percent} %
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StockTable stocks={stocks} />
    </div>
    </>
  );
};

 

