// Utilities
// Set Display Style
const styleNone = 'none';
const styleTableRow = 'table-row';
const styleTableCell = 'table-cell';

const setDisplay = function (element, style) {
    element.style.display = style;
}

// Toggle Row content
const toggleDisplay = function (element) {
    return () => {
        const toggledStyle = element.style.display === styleNone ? styleTableRow : styleNone;
        setDisplay(element, toggledStyle);
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
    const deleteColumn = currentRow.querySelector('td:nth-last-child(2)');
    const editColumn = currentRow.querySelector('td:last-child');

    if (e.target.checked) {
        setDisplay(deleteColumn, styleTableCell);
        setDisplay(editColumn, styleTableCell);
        currentRow.style.backgroundColor = "yellow";
    } else {
        setDisplay(deleteColumn, styleNone);
        setDisplay(editColumn, styleNone);
        currentRow.style.backgroundColor = "";
    }
}

// Edit Row & it's content
const handleEditRow = function (row) {
    return () => {
        prompt(`Edit ${row.querySelector('td:nth-child(2)').innerHTML} details.`);
    }
}

// Disable Enable Submit Button & table header - Delete & Edit
const handleDisplaySubmit = function () {
    const checkedRows = document.querySelectorAll('tbody tr:not(.dropDownTextArea) input[type="checkbox"]:checked');
    submitBtn.disabled = checkedRows.length === 0;
    const headColumnDisplay = checkedRows.length ? 'table-cell' : 'none';
    setDisplay(headDeleteColumn, headColumnDisplay);
    setDisplay(headEditColumn, headColumnDisplay);
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

const initialize = function () {
    // Initially collapse the row's content
    for (const dropDownTextArea of dropDownTextAreas) {
        setDisplay(dropDownTextArea, styleNone);
    }

    // Add listener to toggle row's content
    for (let index = 0; index < displayContentIcons.length; index++) {
        displayContentIcons[index].onclick = toggleDisplay(dropDownTextAreas[index]);
    }

    // Hide delete and edit button columns for initial rows & header
    setDisplay(headDeleteColumn, styleNone);
    setDisplay(headEditColumn, styleNone);

    initialTableRows.forEach(currentRow => {
        const rowDeleteColumn = currentRow.querySelector('td:nth-last-child(2)');
        const rowEditColumn = currentRow.querySelector('td:last-child');
        setDisplay(rowDeleteColumn, styleNone);
        setDisplay(rowEditColumn, styleNone);
    });

    // Add listener to select, delete and edit row
    for (let index = 0; index < initialTableRows.length; index++) {
        const currentRow = initialTableRows[index];
        const checkbox = currentRow.querySelector('td:first-child input[type="checkbox"]');
        const buttons = currentRow.querySelectorAll('button');
        checkbox.onchange = e => handleCheckbox(e, currentRow);
        buttons[0].onclick = handleDeleteRow(currentRow);
        buttons[1].onclick = handleEditRow(currentRow);
    }

    tbody.addEventListener('click', handleDisplaySubmit);
}

// Add new student
const addNewStudent = function () {
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
    setDisplay(newStudentRowContent, styleNone);

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

initialize();
addNewStudentButton.onclick = addNewStudent;


