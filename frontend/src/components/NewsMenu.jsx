import styles from "../assets/news.module.css";

function NewsMenu({active, setActive, setCategory}) {
    const links = [
    { id: 1, name: "Business", value: "business" },
      { id: 2, name: "General", value: "general" },
      { id: 3, name: "Technology", value: "technology" },
      { id: 4, name: "Health", value: "health" },
      { id: 5, name: "Science", value: "science" },
      { id: 6, name: "Sports", value: "sports" },
      { id: 7, name: "Entertainment", value: "entertainment" },

    ]
   
    function onClick(id, value) {
      setActive(id)
      setCategory(value)
    }
  
    return (
      <nav className={styles.menu}>
        <ul>
          {links.map(link => (
            <li 
              key={link.id}
              className={active === link.id ? styles.active : styles.inactive} 
              onClick={() => onClick(link.id, link.value)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  
  export default NewsMenu