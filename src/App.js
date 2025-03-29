import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState(() => {
    return JSON.parse(localStorage.getItem("news")) || [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  const addNews = () => {
    if (title.trim() && content.trim()) {
      const newItem = { id: Date.now(), title, content };
      setNews((prevNews) => [...prevNews, newItem]);
      setTitle("");
      setContent("");
    }
  };

  const deleteNews = (id) => {
    setNews((prevNews) => prevNews.filter((item) => item.id !== id));
  };

  const editNews = (id) => {
    const itemToEdit = news.find((item) => item.id === id);
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setContent(itemToEdit.content);
      setEditingId(id);
    }
  };

  const updateNews = () => {
    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === editingId ? { ...item, title, content } : item
      )
    );
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  return (
    <div className="App">
      <h1>Список новостей</h1>
      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Содержание"
        />
        {editingId ? (
          <button onClick={updateNews}>Обновить новость</button>
        ) : (
          <button onClick={addNews}>Добавить новость</button>
        )}
      </div>
      <div className="news-list">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <button className="edit-button" onClick={() => editNews(item.id)}>Редактировать</button>
            <button onClick={() => deleteNews(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;