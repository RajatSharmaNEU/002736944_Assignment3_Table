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
        row.remove();
        row.remove();
        alert(`${row.querySelector('td:nth-child(2)').innerHTML} delete successfully.`);
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

// Initially collapse the row's content
for (const dropDownTextArea of dropDownTextAreas) {
    dropDownTextArea.style.display = "none";
}

// Add listener to toggle row's content
for (let index = 0; index < displayContentIcons.length; index++) {
    displayContentIcons[index].onclick = toggleDisplay(dropDownTextAreas[index]);
}

// Add listener to delete row 
for (let index = 0; index < initialTableRows.length; index++) {
    const currentRow = initialTableRows[index];
    const buttons = currentRow.querySelectorAll('button');
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
        <td>
            <button>Delete</button>
        </td>
        <td>
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

    // TODO: Add Delete, Edit and Checkbox Selection
    const buttons = newStudentRow.querySelectorAll('button');
    buttons[0].onclick = handleDeleteRow(newStudentRow);
    buttons[1].onclick = handleEditRow(newStudentRow);

    setTimeout(() => {
        alert(`Added new record for Student ${initialRowCount}.`);
    });
}


