let initialRowCount = 3;

const tbody = document.getElementsByTagName('tbody')[0];
const dropDownTextAreas = document.getElementsByClassName('dropDownTextArea');
const displayContentIcons = document.querySelectorAll('tbody img');
const addNewStudentButton = document.getElementById('add');

// Initially collapse the row's content
for (const dropDownTextArea of dropDownTextAreas) {
    dropDownTextArea.style.display = "none";
}

// Add listener to toggle row's content
for (let index = 0; index < displayContentIcons.length; index++) {
    displayContentIcons[index].onclick = function () {
        dropDownTextAreas[index].style.display = dropDownTextAreas[index].style.display === 'none' ? 'table-row' : 'none';
    }
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

    newStudentRowImg.addEventListener('click', e => {
        newStudentRowContent.style.display = newStudentRowContent.style.display === 'none' ? 'table-row' : 'none';
    });

    // TODO: Add Delete, Edit and Checkbox Selection

    setTimeout(() => {
        alert(`Added new record for Student ${initialRowCount}`);
    });
}

