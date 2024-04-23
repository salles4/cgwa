let grades = {};
let sub_list = {};

$(function () {
    initializeData();
})

function appendData(term) {
    let subCodes = Object.keys(term)
    subCodes.sort()

    let totalUnits = 0;
    let toAppend = "";
    subCodes.forEach(subCode => {
        let sub = sub_list[subCode]
        toAppend +=
            `
            <tr>
            <td>${subCode}${sub.include ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${sub.name}</td>
            <td class="text-center">${Number(term[subCode]).toFixed(2)}</td>
            <td class="text-center">${Number(sub.unit).toFixed(1)}</td>
            </tr>
        `
        totalUnits += sub.unit;
    })
    let termSelected = $("#selectTerm").val()
    let FINALCGWA = Number(cgwa(termSelected)).toFixed(2)

    toAppend += `
        <tr style="border-top: 2px double;">
        <th colspan="3">Total Units:</th>
        <td class="text-center fw-bold">${Number(totalUnits).toFixed(1)}</td>
        </tr>
        <tr>
            <th colspan="3">General Weighted Average:</th>
            <td class="text-center fw-bold">${Number(gwa(term)).toFixed(2)}</td>
        </tr>
        <tr>
            <th colspan="3">Cumulated GWA from Term 1 to ${termSelected}:</th>
            <td class="${FINALCGWA >= 3.75 ? "cgwa-high" :
                FINALCGWA >= 3.5 ? "cgwa-mid" : ""
            } text-center fw-bold" data-bs-container="body" 
                data-bs-trigger="hover" data-bs-toggle="popover" 
                data-bs-custom-class="fw-bold" 
                data-bs-content="${FINALCGWA >= 3.75 ? "Summa Cum Laude" :
                FINALCGWA >= 3.5 ? "Magna Cum Laude" :
                    FINALCGWA >= 3.25 ? "Cum Laude" : ""
            }">
                ${FINALCGWA}
            </td>
        </tr>
    `
    $("#tablebody").empty();
    $("#tablebody").append(toAppend);
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

function gwa(termObject) {
    let totalHonorPoints = 0;
    let totalUnits = 0
    for (const subcode in termObject) {
        if (!sub_list[subcode].include) {
            continue;
        }
        console.log(subcode)
        let grade = termObject[subcode]
        let units = sub_list[subcode].unit
        totalHonorPoints += grade * units
        totalUnits += units
    }
    return Math.round((totalHonorPoints / totalUnits) * 100) / 100
}

function cgwa(termLimit) {
    let totalHonorPoints = 0;
    let totalUnits = 0
    for (const term in grades) {
        let termObject = grades[term]
        console.log(termObject)
        Object.keys(termObject).forEach(subcode => {
            if (sub_list[subcode].include) {
                totalHonorPoints += termObject[subcode] * sub_list[subcode].unit
                totalUnits += sub_list[subcode].unit;
            }
        });

        if (term === termLimit) {
            break;
        }
    }
    return Math.round((totalHonorPoints / totalUnits) * 100) / 100
}

function initializeData() {
    fetch("../data/data.json")
        .then(response => response.json())
        .then(value => {
            grades = value["2022-153827"].grades;
            sub_list = value["subjects"]
            appendData(grades[$("#selectTerm").val()])
        })
        .catch(error => console.error(error))

    $("#selectTerm").on("change", () => {
        console.log(grades[$("#selectTerm").val()])
        appendData(grades[$("#selectTerm").val()])
    })
    $("#navbar").load("navbar.html")
    $("#edit").on("click", () => {
        localStorage.setItem("edit-term", $("#selectTerm").val())
        window.location.href = `edit.html`
    })
}