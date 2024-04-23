let subjects;

$(function(){
    $("#navbar").load("navbar.html")
    fetch("data/data.json")
        .then(response => response.json())
        .then(json => {
            subjects = json.subjects;
            list()
        })    
})
function list(){
    let toAppend = ""
    let subCodes = Object.keys(subjects)
    subCodes.sort()
    subCodes.forEach(subCode => {
        let sub = subjects[subCode]
        toAppend +=
            `
            <tr>
            <td>${subCode}${sub.include ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${sub.name}</td>
            <td class="text-center">${Number(sub.unit).toFixed(1)}</td>
            </tr>
        `
    });
    $("#tablebody").append(toAppend)
}