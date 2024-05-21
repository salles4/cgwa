let ID = "2022-153827";
const TERM = localStorage.getItem("edit-term");
if(!TERM){
    window.location.href = `index.html`
}
localStorage.removeItem("edit-term")
let grades;
let subjects;
let no_changes = true;
let changes = {};

$(function () {
    $("#navbar").load("navbar.html")
    $("#discard").on("click", () => {
        window.location.href = `index.html`
    })
    $("#save").on("click", save)
    fetch("data/data.json")
    .then(response => response.json())
    .then(json => {
        grades = json[ID].grades[TERM];
        subjects = json.subjects;
        addRows();
    })
    $("#term").html(parseInt(TERM) + 1)
})
function save(){

}
function addRows(){
    let toAppend = "";
    let subCodes = Object.keys(grades)
    subCodes.sort()
    subCodes.forEach(subCode => {
        toAppend += `
        <tr class="align-middle">
            <td>${subCode}${subjects[subCode].include ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${subjects[subCode].name}</td>
            <td class="text-center">
                <select class="form-select w-auto d-inline" id="${subCode}">
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
    console.log(grades);
    subCodes.forEach(subCode => { 
        const subGrade = Number(grades[subCode]).toFixed(2)
        $(`#${subCode}`).val(subGrade)
        $(`#${subCode}`).on("change", () => {
            changes[subCode] = $(`#${subCode}`).val();
            updateUnloading()
        })
    })
}
function unloadHandler(event) {
    event.preventDefault();
}

function updateUnloading(){
    let isSame = true;
    Object.keys(changes).forEach(subcode => {
        const change = Number(changes[subcode]).toFixed(2)
        const grade = Number(grades[subcode]).toFixed(2)
        if (change !== grade) {
            isSame = false;
        }
    })
    if(!isSame){
        window.addEventListener("beforeunload", unloadHandler)
    }else{
        window.removeEventListener("beforeunload", unloadHandler)
    }
}