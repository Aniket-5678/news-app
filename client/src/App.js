import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';
import Navbar from './components/Header/Navbar';

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = 'https://api.currentsapi.services/v1/latest-news?' +
                    'language=en&' +
                    'apiKey=AoVoxh-EYjhtfrCKGrwh1_UKpyepLnkFoToGxCkrIhticv5t';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.news);
        setFilteredArticles(data.news); // Initialize filtered articles with all articles
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      const url = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(term)}&language=en&apiKey=AoVoxh-EYjhtfrCKGrwh1_UKpyepLnkFoToGxCkrIhticv5t`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredArticles(data.news);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    } else {
      setFilteredArticles(articles);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterArticles(searchTerm, category);
  };

  const filterArticles = (term, category) => {
    let filtered = articles;

    if (term) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(article =>
        article.category.includes(category)
      );
    }

    setFilteredArticles(filtered);
  };

  return (
  
      <div className="App">
        <Navbar handleSearch={handleSearch} handleCategoryChange={handleCategoryChange} />
        <Routes>
          <Route path="/" element={<ArticleList articles={filteredArticles} error={error} />} />
        </Routes>
      </div>
  
  );
}

export default App;
