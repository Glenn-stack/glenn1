// Function to handle tab switching
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the "active" class
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Register Worker form submission
const registerWorkerForm = document.getElementById('register-worker-form');
registerWorkerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const workerId = document.getElementById('workerId').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const placeOfBirth = document.getElementById('placeOfBirth').value;
  const gender = document.getElementById('gender').value;
  const department = document.getElementById('department').value;
  const status = document.getElementById('status').value;

  // Add the worker's data to the debt table
  addWorkerDebt(workerId, `${firstName} ${lastName}`, 0, new Date().toLocaleDateString(), 'Pending');

  // Clear the form
  registerWorkerForm.reset();

  // Switch to the Register Consumption tab
  document.querySelector('.tablinks[onclick="openCity(event, \'registerConsumption\')"]').click();
});

// Register Consumption form submission
const registerConsumptionForm = document.getElementById('register-consumption-form');
registerConsumptionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const workerId = document.getElementById('workerId').value;
  const consumptionDate = document.getElementById('consumptionDate').value;
  const consumptionType = document.getElementById('consumptionType').value;
  const quantity = document.getElementById('quantity').value;

  // Update the worker's debt
  updateWorkerDebt(workerId, consumptionType, quantity);

  // Clear the form
  registerConsumptionForm.reset();

  // Switch to the Display Debts tab
  document.querySelector('.tablinks[onclick="openCity(event, \'displayDebts\')"]').click();
});

// Function to add a new worker's debt to the table
function addWorkerDebt(workerId, name, debtAmount, dateIncurred, status) {
  const debtTable = document.getElementById('debtTable');
  const newRow = debtTable.insertRow();

  newRow.insertCell(0).textContent = workerId;
  newRow.insertCell(1).textContent = name;
  newRow.insertCell(2).textContent = debtAmount;
  newRow.insertCell(3).textContent = dateIncurred;
  newRow.insertCell(4).textContent = status;
}

// Function to update a worker's debt in the table
function updateWorkerDebt(workerId, consumptionType, quantity) {
  const debtTable = document.getElementById('debtTable');
  let found = false;

  for (let i = 0; i < debtTable.rows.length; i++) {
    if (debtTable.rows[i].cells[0].textContent === workerId) {
      const debtAmount = parseFloat(debtTable.rows[i].cells[2].textContent);
      const newDebtAmount = consumptionType === 'food' ? debtAmount + 5 * quantity : debtAmount + 2 * quantity;
      debtTable.rows[i].cells[2].textContent = newDebtAmount.toFixed(2);
      debtTable.rows[i].cells[4].textContent = 'Pending';
      found = true;
      break;
    }
  }

  if (!found) {
    addWorkerDebt(workerId, 'Unknown', consumptionType === 'food' ? 5 * quantity : 2 * quantity, new Date().toLocaleDateString(), 'Pending');
  }
}

