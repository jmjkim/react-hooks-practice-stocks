import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [listOfStocks, setListOfStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const fetchData = async () => {
    try {
      let response = await fetch("http://localhost:3001/stocks");
      let fetchedStocks = await response.json();

      setListOfStocks(fetchedStocks);
     } catch (error) {
      alert(error.message);
     }
  }

  useEffect(() => fetchData(), []);

  const moveToPortfolio = (clickedStock) => {
    if (!portfolioStocks.includes(clickedStock)) {
      const purchasedStock = [...portfolioStocks, clickedStock];
      setPortfolioStocks(purchasedStock);
    } else alert("You already purchased this stock.");
  };

  const removeFromPortfolio = (clickedStock) => {
    if (portfolioStocks.includes(clickedStock)) {
      const newPortfolioStocks = [...portfolioStocks].filter(stock => stock.id !== clickedStock.id);
      setPortfolioStocks(newPortfolioStocks);
    }
  }

  const handleSortByAlphabet = (selected) => {
    setSortBy(selected.target.value);
    const sortedByAlphabet = [...listOfStocks].sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0);
    if (selected.target.value === "Alphabetically") return setListOfStocks(sortedByAlphabet);
  }

  const handleSortByPrice = (selected) => {
    setSortBy(selected.target.value);
    const sortByPrice = [...listOfStocks].sort((a, b) => (a.price > b.price) ? -1 : (a.price < b.price) ? 1 : 0);
    if (selected.target.value === "Price") return setListOfStocks(sortByPrice);
  }

  const handleFilterBy = (selected) => {
    setFilterBy(selected.target.value);
  }

  const filteredStocks = [...listOfStocks].filter(stock => (filterBy === "") ? true : (stock.type === filterBy));

  return (
    <div>
      <SearchBar sortBy={sortBy} handleSortByAlphabet={handleSortByAlphabet} handleSortByPrice={handleSortByPrice} handleFilterBy={handleFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer marketStocks={filteredStocks} moveToPortfolio={moveToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolioStocks={portfolioStocks} removeFromPortfolio={removeFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
