import NewsItem from './NewsItem'
import styles from "../assets/news.module.css";

function NewsGrid({items}) {
  return (
    <div className={styles.newsg}>
      {items.map((item, i) => (
        <NewsItem key={i} item={item}/>
      ))}
    </div>
  )
}

export default NewsGrid