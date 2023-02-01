// Utilities
// Toggle Row content
const toggleDisplay = function (element) {
    return () => {
        element.style.display = element.style.display === 'none' ? 'table-row' : 'none'
    };
}

// Delete Row & it's content
const handleDeleteRow = function (row) {
    return () => {
        const confirmSelection = confirm(`Do you want to delete ${row.querySelector('td:nth-child(2)').innerHTML} details ?`);
        if (confirmSelection) {
            row.nextElementSibling.remove();
            row.remove();
            alert(`${row.querySelector('td:nth-child(2)').innerHTML} delete successfully.`);
        }
    }
}

// Row Selection
const handleCheckbox = function (e, currentRow) {
    const DeleteColumn = currentRow.querySelector('td:nth-last-child(2)');
    const EditColumn = currentRow.querySelector('td:last-child');

    if (e.target.checked) {
        DeleteColumn.style.display = 'table-cell';
        EditColumn.style.display = 'table-cell';
        currentRow.style.backgroundColor = "orange";
    } else {
        DeleteColumn.style.display = 'none';
        EditColumn.style.display = 'none';
        currentRow.style.backgroundColor = "";
    }
}

// Edit Row & it's content
const handleEditRow = function (row) {
    return () => {
        alert(`Edit ${row.querySelector('td:nth-child(2)').innerHTML} details.`);
    }
}

// Main Code
let initialRowCount = 3;

const tbody = document.getElementsByTagName('tbody')[0];
const dropDownTextAreas = document.getElementsByClassName('dropDownTextArea');
const displayContentIcons = document.querySelectorAll('tbody img');
const addNewStudentButton = document.getElementById('add');
const initialTableRows = document.querySelectorAll('tbody tr:not(.dropDownTextArea)');
const submitBtn = document.getElementById('button');
const headDeleteColumn = document.querySelector('th:nth-last-child(2)');
const headEditColumn = document.querySelector('th:last-child');

// Initially collapse the row's content
for (const dropDownTextArea of dropDownTextAreas) {
    dropDownTextArea.style.display = "none";
}

// Add listener to toggle row's content
for (let index = 0; index < displayContentIcons.length; index++) {
    displayContentIcons[index].onclick = toggleDisplay(dropDownTextAreas[index]);
}

// Hide delete and edit button for initial rows
initialTableRows.forEach(currentRow => {
    const rowDeleteColumn = currentRow.querySelector('td:nth-last-child(2)');
    const rowEditColumn = currentRow.querySelector('td:last-child');
    headDeleteColumn.style.display = 'none';
    rowDeleteColumn.style.display = 'none';
    headEditColumn.style.display = 'none';
    rowEditColumn.style.display = 'none';
});

tbody.addEventListener('click', () => {
    const checkedRows = document.querySelectorAll('tbody tr:not(.dropDownTextArea) input[type="checkbox"]:checked');
    submitBtn.disabled = checkedRows.length === 0;
    headDeleteColumn.style.display = checkedRows.length ? 'table-cell' : 'none';
    headEditColumn.style.display = checkedRows.length ? 'table-cell' : 'none';
})

// Add listener to select, delete and edit row
for (let index = 0; index < initialTableRows.length; index++) {
    const currentRow = initialTableRows[index];
    const checkbox = currentRow.querySelector('td:first-child input[type="checkbox"]');
    const buttons = currentRow.querySelectorAll('button');
    checkbox.onchange = e => handleCheckbox(e, currentRow);
    buttons[0].onclick = handleDeleteRow(currentRow);
    buttons[1].onclick = handleEditRow(currentRow);
}

// Add new student
addNewStudentButton.onclick = function () {
    const newStudentRow = document.createElement('tr');
    const newStudentRowContent = document.createElement('tr');

    newStudentRow.innerHTML = `
        <td>
            <input type="checkbox"/>
            <br/>
            <br/>
            <img src="down.png" width="25px" />
        </td>
        <td>Student ${++initialRowCount}</td>
        <td>Teacher ${initialRowCount}</td>
        <td>Approved</td>
        <td>Fall</td>
        <td>TA</td>
        <td>12345</td>
        <td>100%</td>
        <td style="display: none">
            <button>Delete</button>
        </td>
        <td style="display: none">
            <button>Edit</button>
        </td>
        `;
    newStudentRowContent.classList.add('dropDownTextArea');
    newStudentRowContent.innerHTML = `
        <td colspan="10">
                Advisor: Advisor ${initialRowCount}<br/><br/>
                Award Details<br/>
                Summer 1-2014(TA)<br/>
                Budget Number: <br/>
                Tuition Number: <br/>
                Comments:<br/><br/><br/>
                Award Status:<br/><br/><br/>
           </td>`;
    newStudentRowContent.style.display = 'none';

    tbody.append(newStudentRow);
    tbody.append(newStudentRowContent);

    const newStudentRowImg = newStudentRow.getElementsByTagName('img')[0];
    newStudentRowImg.onclick = toggleDisplay(newStudentRowContent);

    // Table Row Handlers - Delete, Edit and Checkbox Selection
    const checkbox = newStudentRow.querySelector('td:first-child input[type="checkbox"]');
    const buttons = newStudentRow.querySelectorAll('button');
    checkbox.onchange = e => handleCheckbox(e, newStudentRow);
    buttons[0].onclick = handleDeleteRow(newStudentRow);
    buttons[1].onclick = handleEditRow(newStudentRow);

    setTimeout(() => {
        alert(`Added new record for Student ${initialRowCount}.`);
    });
}


