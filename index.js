const api_url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  // transaction array conatains 5 object.
  let transaction = data.transactions;
  // for sorting date
  const sortedData = sortedTransactions(data);
  const groupedData = groupedTransactions(sortedData);
  displayBox(groupedData);
}

getapi(api_url);

// fuction for sorting Trasaction will return array of transactions
function sortedTransactions(data) {
  const sortedTranscations = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sortedTranscations;
}

// will return object of grouped transactions
function groupedTransactions(sortedTransactions = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortedTransactions.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}

// displayBox function will insert HTML and CSS into Web Page
function displayBox(groupedData) {
  // Date of transcation
  for (let dataKey in groupedData) {
    document.getElementById(
      "box"
    ).innerHTML += `<div class="wrap"><div class="card-date">
                <p>${new Date(dataKey).toDateString()}</p>
            </div></div>`;
    // inserting html cards
    for (let i = 0; i < groupedData[dataKey].length; i++) {
      let type = groupedData[dataKey][i].type;
      let direction = groupedData[dataKey][i].direction;

      if (type === 1 && direction === 1) {
        //    No Button and Align BOX Right
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-right"><div class="card">
                     <p class="ammount">
                      &#8377; ${groupedData[dataKey][i].amount}
                    </p>
                   
                    <div class="transaction-id">
                    <p>Transaction ID</p>
                     <p>${groupedData[dataKey][i].id}</p>
                    </div>
                    </div>
                    </div>
                    <div class="date-time-right">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
      if (type === 1 && direction === 2) {
        //    No Button and Align BOX Left
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <div class="transaction-id">
             <p>Transaction ID</p>
              <p>${groupedData[dataKey][i].id}</p>
             </div>
             
             </div>
             </div>
              <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
      if (type === 2 && direction === 2) {
        //    Pay and Decline Button and Align BOX Left
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
              <button>Pay</button>
              <button >Decline</button>
             </div>
             </div>
             <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
            
      }
      if (type === 2 && direction === 1) {
        //    Cancel Button and Align BOX Right
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-right"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p> 
             <div class="transaction-id">
              <button >Cancel</button>
             </div>
             </div>
             </div>
             <div class="date-time-right">
             <p>${new Date(
               groupedData[dataKey][i].startDate
             ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
           </div>`;
      }
    }
  }
}


