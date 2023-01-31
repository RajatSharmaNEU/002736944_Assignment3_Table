const dropDownTextAreas = document.getElementsByClassName('dropDownTextArea');
const displayContentIcons = document.querySelectorAll('tbody img');

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
