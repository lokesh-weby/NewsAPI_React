import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

const App = () => {
  const [news,setNews]=useState("");
  const [selectedCategory, setSelectedCategory] = useState("Technology");

  useEffect(()=>{
  const api="4ba6252c757c4f928b7362a0ec4511b4";

  async function GetNews() {
      const response=await fetch(`https://newsapi.org/v2/top-headlines?category=${selectedCategory}&apiKey=${api}`);
      const data=await response.json();
      setNews(data.articles); 
  }
      GetNews();      
  },[selectedCategory])

  console.log(news);

  return (
    <>
    <nav>
      <h1>Weby's News</h1>
    <div>
      <p>Category: </p>
      <select name="category" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Sports">Sports</option>
      </select>
    </div>
    </nav>
    <h1 className='text-center'>{selectedCategory}</h1>
    <div className='wrapper'>
     
      {news===""?<h1>loading</h1>:(
         news.map((newsData,index)=>(
          <div key={index} className='card'>
            <img src={newsData.urlToImage} alt={newsData.author} height={200} width={200} loading='lazy'/>
            <p className='title'>{(index+1)+". "+newsData.title}</p>
            <p>{(newsData.description)|| newsData.title}..<a href={newsData.url} target='_blank'> ReadMore</a></p>
            <small>{"By "+newsData.author}</small>
          </div>
          )))}    
    </div>
    </>
  )
}

export default App
