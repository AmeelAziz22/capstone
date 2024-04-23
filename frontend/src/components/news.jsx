import React, { useState, useEffect } from 'react'
import NewsMenu from './NewsMenu'
import NewsGrid from './NewsGrid'
import styles from "../assets/news.module.css";

function News() {
    const [items, setItems] = useState([])
    const [active, setActive] = useState(1)
    const [category, setCategory] = useState("business")
  
    useEffect(() => {
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=9f070c3650844cbba78e8c2024befa22`)
      .then(res => res.json())
      .then(data => {
        // Filter articles that have images
        const filteredArticles = data.articles.filter(article => article.urlToImage !== null);
        setItems(filteredArticles);
     })
    }, [category])
  
    return (
      <div className="App">
        <h1 className={styles.title}>Latest News</h1>
        <NewsMenu active={active} setActive={setActive} setCategory={setCategory}/>
        <NewsGrid items={items}/>
      </div>
    )
}

export default News;
