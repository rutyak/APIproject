let data; // Declare the data variable

    // Fetch data using .then
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(result => {
        data = result; // Assign the fetched data to the variable
        renderTable(data);
      })
      .catch(error => console.error('Error:', error));

    // Render table
    function renderTable(data) {
      const coinTableBody = document.getElementById('coinTableBody');
      coinTableBody.innerHTML = '';

      data.forEach((coin, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${coin.symbol.toUpperCase()}</td>
          <td>${coin.name}</td>
          <td>${coin.current_price}</td>
          <td>${coin.total_volume}</td>
        `;
        coinTableBody.appendChild(row);
      });
    }

    // Search functionality
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchInput) || coin.symbol.toLowerCase().includes(searchInput));
      renderTable(filteredData);
    });

    // Sort functionality
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', () => {
      const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sortedData);
    });
