const accountTable = document.getElementById("accountTable");

function displayAccounts() {
    accountTable.innerHTML = ""; 
    fetch("http://flip3.engr.oregonstate.edu:9090/api/accounts/get")
        .then(response => response.json())
        .then(accounts => {
            accounts.forEach(account => {
                const row = document.createElement("tr");
                const accountIdCell = document.createElement("td");
                accountIdCell.textContent = account.accountID;
                accountIdCell.setAttribute('id', 'data-account-id');
                row.appendChild(accountIdCell);

                const addressCell = document.createElement("td");
                addressCell.textContent = account.address;
                row.appendChild(addressCell);

                const cityCell = document.createElement("td");
                cityCell.textContent = account.city;
                row.appendChild(cityCell);

                const countryCodeCell = document.createElement("td");
                countryCodeCell.textContent = account.countryCode;
                row.appendChild(countryCodeCell);

                const emailCell = document.createElement("td");
                emailCell.textContent = account.email;
                row.appendChild(emailCell);

                const actionsCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    deleteAccount(account.accountID);
                });
                actionsCell.appendChild(deleteButton);

                const updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.addEventListener("click", () => {
                    updateAccount(account);
                });
                actionsCell.appendChild(updateButton);

                row.appendChild(actionsCell);

                accountTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching accounts:", error);
        });
}

function addAccount(address, city, countryCode, email) {
    fetch("http://flip3.engr.oregonstate.edu:9090/api/accounts/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ address, city, countryCode, email })
    })
    .then(() => {
        displayAccounts();

        document.getElementById("addressInput").value = "";
        document.getElementById("cityInput").value = "";
        document.getElementById("countryCodeInput").value = "";
        document.getElementById("emailInput").value = "";
    })
    .catch(error => {
        console.error("Error adding account:", error);
    });
}

function deleteAccount(accountId) {
    fetch(`http://flip3.engr.oregonstate.edu:9090/api/accounts/delete/${accountId}`, {
        method: "DELETE"
    })
    .then(() => {
        // Refresh the account table
        displayAccounts();
    })
    .catch(error => {
        console.error("Error deleting account:", error);
    });
}

// Function to update 
function updateAccount(account) {
    const updateForm = document.getElementById("updateAccountForm");
    updateForm.style.display = 'block';

    updateForm.addEventListener("submit", event => {
        event.preventDefault();

        var address = document.getElementById("addressInputUpdate");
        var city = document.getElementById("cityInputUpdate");
        var countryCode = document.getElementById("countryCodeInputUpdate");
        var email = document.getElementById("emailInputUpdate");

        // Get the input values
        const updatedAccount = {
            // shallow copy of account
            ...account,
            address: address.value,
            city: city.value,
            countryCode: countryCode.value,
            email: email.value
        };

        fetch(`http://flip3.engr.oregonstate.edu:9090/api/accounts/update/${account.accountID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAccount)
        })
        .then(() => {
            // Refresh the account table
            address.value = '';
            city.value = '';
            countryCode.value = '';
            email.value = '';
            updateForm.style.display = 'none';
            displayAccounts();
        })
        .catch(error => {
            console.error("Error updating account:", error);
        });
    });
}


// Add event listener to the form submit
const addAccountForm = document.getElementById("addAccountForm");
addAccountForm.addEventListener("submit", event => {
    event.preventDefault();

    // Get the input values
    const address = document.getElementById("addressInput").value;
    const city = document.getElementById("cityInput").value;
    const countryCode = document.getElementById("countryCodeInput").value;
    const email = document.getElementById("emailInput").value;

    // Add the account
    addAccount(address, city, countryCode, email);
});



displayAccounts();
