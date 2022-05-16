import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolioStocks, removeFromPortfolio }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStocks.map(stock => <Stock key={stock.id} stock={stock} onStockClick={removeFromPortfolio} />)}
    </div>
  );
}

export default PortfolioContainer;
