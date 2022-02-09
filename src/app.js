const para = document.querySelector(".paragraph");
const buttton = document.querySelector(".search-button");
const container = document.querySelector(".container");
const table = document.querySelector(".table");
// const symbol = document.querySelector(".symbol")
const searchBar = document.getElementById('searchbar');
const tableRow = document.querySelector('.table-row');


const api_url = "https://api2.binance.com/api/v3/ticker/24hr";
  
const info = [];
// Defining async function to retrieve data from api_url
async function fetchData(url) {
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    if (response) {
      console.log("we got a response");
    }
    show(data);
    search(data);
}

// Calling that async function
fetchData(api_url);
  

// Function to define innerHTML for HTML table
function show(data) {
    let contentTable = 
        `
        <thread>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Last Price</th>
          <th scope="col">Open Price</th>
          <th scope="col">Volume</th>
         </tr>
         </thread>
         `;

    // Loop to access all rows 
    for (let r of data) {
        contentTable += `
        <tbody class="table-body">
        <tr class="table-row"> 
    <td >${r.symbol} </td>
    <td >${r.lastPrice} </td>
    <td >${r.openPrice} </td>
    <td >${r.volume} </td>          
</tr>
</tbody>
`;
    }
 // Setting innerHTML as tab variable
    table.innerHTML = contentTable;
}

function search(d){
    searchBar.addEventListener("keyup", e => {
          const searchString = e.target.value.toUpperCase();
          const filteredCharacters = d.filter(character => {
            return (
              character.symbol.includes(searchString) 
            );
          });
          show(filteredCharacters);
        });
}


