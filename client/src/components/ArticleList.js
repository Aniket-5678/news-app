import React, { useState } from 'react';
import './style/style.css';

const ArticleList = ({ articles, error }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 6); // Load 6 more articles each time
  };

  return (
    <div className="container">
      {error && <p className="error">Error: {error}</p>}
      <div className="row">
        {articles.slice(0, visibleCount).map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              {article.image ? (
                <img src={article.image} className="card-img-top" alt={article.title} />
              ) : (
                <div className="missing-image">Image not available</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                {article.author && <p className="card-author">By {article.author}</p>}
                <p className="card-text">{article.description}</p>
                <a href={article.url} className="newsbtn" target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < articles.length && (
        <div className="see-more-main">
          <button className="see-more-btn" onClick={handleSeeMore}>
          View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
