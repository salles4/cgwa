let subDetails;
$(function () {
  $("#navbar").load("navbar.html")
  termTables()
    .then(data => $("#main").append(data))
  
})

function fieldsetHTML(data, term){
  return `
  <fieldset>
      <legend class="border-bottom border-2 mb-4 py-2">
        <div class="">
          <i class="bi-table mx-2"></i>Term ${term}
        </div>
      </legend>
      <table class="table table-bordered table-striped">
        <thead class="text-center align-middle">
          <tr>
            <th class="bg-blue text-bg-primary col-2">Subject Code</th>
            <th class="bg-blue text-bg-primary">Subject Description</th>
            <th class="bg-blue text-bg-primary col-2">Final Grade</th>
            <th class="bg-blue text-bg-primary col-1">Units</th>
          </tr>
        </thead>
        <tbody id="tablebody">
          ${tableRows(data)}
        </tbody>
      </table>
    </fieldset>
  `
}
function tableRows(data){
  let rowHTML = ``
  let subcodes = Object.keys(data)
  subcodes.forEach(subcode => {
    rowHTML += `
      <tr class="align-middle">
        <td>${subcode}${subDetails[subcode].include ? "" : `<span style="color: red;">*</span>`}</td>
        <td>${subDetails[subcode].name}</td>
        <td class="text-center">
          <select style="padding: 2px 10px;" id="${subcode}">
            <option>4.00</option>
            <option>3.50</option>
            <option>3.00</option>
            <option>2.50</option>
            <option>2.00</option>
            <option>1.50</option>
            <option>1.00</option>
          </select>
        </td>
        <td class="text-center">${subDetails[subcode].unit.toFixed(1)}</td>
      </tr>`
  })
  return rowHTML
}
async function termTables(){
  let finalHTML = ""
  let response = await fetch("./data/importGrade.json")
  let data = await response.json()
  let sub_response = await fetch("./data/subjects.json")
  subDetails = await sub_response.json()
  data.forEach((data, index) => {
    finalHTML += fieldsetHTML(data, index + 1)
  });
  return finalHTML;
}