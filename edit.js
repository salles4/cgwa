let ID = "2022-153827";
let TERM = "Term 1";
let grades;
let subjects;

let queryString = window.location.search;
let queryParams = new URLSearchParams(queryString.substring(1));
if(queryParams.has("term")){
    TERM = decodeURIComponent(queryParams.get("term"));
}
if (queryParams.has("id")){
    ID = decodeURIComponent(queryParams.get("id"));
}
console.log(TERM)

$(function () {
    $("#navbar").load("navbar.html")
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            grades = json[ID].grades;
            subjects = json.subjects;
            addRows();
        })
})
function addRows(){
    let toAppend = "";
    let subCodes = Object.keys(grades[TERM])
    subCodes.sort()
    subCodes.forEach(subCode => {
        toAppend += `
        <tr class="align-middle">
            <td>${subCode}${subjects[subCode].include ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${subjects[subCode].name}</td>
            <td class="text-center">
                <select class="form-select w-75 d-inline" id="${subCode}">
                    <option>4.00</option>
                    <option>3.50</option>
                    <option>3.00</option>
                    <option>2.50</option>
                    <option>2.00</option>
                    <option>1.50</option>
                    <option>1.00</option>
                </select>
            </td>
            <td class="text-center">${Number(subjects[subCode].unit).toFixed(1)}</td>
        </tr>
        `
    })
    $("#tablebody").append(toAppend)
    subCodes.forEach(subCode => { $(`#${subCode}`).val(Number(grades[TERM][subCode]).toFixed(2))})
}