import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

import "../style/style.css";

const Navbar = ({ handleSearch, handleCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm.trim());
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
    handleCategoryChange(event.target.value);
  };




  return (
    <nav className="navbar-container">
      <div className="navbar-main">
      
        <Link to="/" className="navbar-brand">News App</Link>
      

      <div className={`select-main ${menuOpen ? 'open' : ''}`}>

      <form className="form" onSubmit={handleSearchSubmit}>
        <input
          className="form-control "
          type="search"
          placeholder="Search News"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button className="search-btn" type="submit"><FaSearch/></button>
      </form>

      <div  >
      <select  className="form-select" value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">All Categories</option>
        <option value="world">World</option>
        <option value="politics">Politics</option>
        <option value="business">Business</option>
        <option value="regional">Regional</option>
        <option value="travel">Travel</option>
        <option value="lifestyle">Lifestyle</option>
      </select>
      </div>


      </div>
     
      <div className='hamburger-menu' onClick={toggleMenu}>
          <IoMenu size={"30px"}/>
        </div>
     
        </div>
        
          
    </nav>
  );
};

export default Navbar;
