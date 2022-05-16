import React from "react";
import Stock from "./Stock";

function StockContainer({ marketStocks, moveToPortfolio }) {
  return (
    <div>
      <h2>Stocks</h2>
        { marketStocks ? marketStocks.map(stock => <Stock key={stock.id} stock={stock} onStockClick={moveToPortfolio} />) : null }
    </div>
  );
}

export default StockContainer;
