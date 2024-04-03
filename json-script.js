let grades;
fetch("grades.json")
    .then(response => response.json())
    .then(value => grades = value)
    .catch(error => console.error(error))

$(function(){
    $("#selectTerm").on("change", () =>{
        console.log(grades[$("#selectTerm").val()])
        appendRo(grades[$("#selectTerm").val()])
    })
})

function appendRo(term){
    let toAppend = "";
    let subCodes = Object.keys(term)
    subCodes.sort()

    subCodes.forEach(subCode => {
        let sub = term[subCode]
        console.log()
        toAppend += 
        `
            <tr>
            <td>${subCode}${sub.include ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${sub.name}</td>
            <td class="text-center">${Number(sub.grade).toFixed(2)}</td>
            <td class="text-center">${Number(sub.unit).toFixed(1)}</td>
            </tr>
        `
    })
}