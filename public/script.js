async function getData() {
  const url = "http://localhost:3000/product";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    // Select the table body where the data will be inserted
    const tableBody = document.getElementById("data-table-body");

    // Ensure tableBody is found
    if (!tableBody) {
      console.error("Table body not found");
      return;
    }

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Iterate over the data array
    json.forEach((item) => {
      // Create a new row
      const row = document.createElement("tr");

      // Create and append cells for each data field
      const idCell = document.createElement("td");
      idCell.textContent = item._id;
      row.appendChild(idCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const quantityCell = document.createElement("td");
      quantityCell.textContent = item.quentity;
      row.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = item.price;
      row.appendChild(priceCell);

      const createCell = document.createElement("td");
      createCell.textContent = item.createdAt;
      row.appendChild(createCell);

      const updateCell = document.createElement("td");
      updateCell.textContent = item.updatedAt;
      row.appendChild(updateCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Run the fillTable function when the window finishes loading
window.onload = async function () {
  await getData();
};

function sendData(){
    const url = 'http://localhost:3000/product';
    const name = document.getElementById("name");
    const qty = document.getElementById("qty");
    const price = document.getElementById("price");

// The data to be sent in JSON format
const data = {
    name: name.value,
    quentity: qty.value,
    price: price.value
};

// Fetch request with JSON body
fetch(url, {
  method: 'POST', // or 'PUT', 'PATCH', etc.
  headers: {
    'Content-Type': 'application/json' // Ensures the server knows you're sending JSON data
  },
  body: JSON.stringify(data) // Converts JavaScript object to a JSON string
})
.then(response => response.json()) // Parses the JSON response
.then(data => {
  console.log('Success:', data);
  window.location.reload; // Handle the response data
})
.catch((error) => {
  console.error('Error:', error); // Handle any errors
});
}

