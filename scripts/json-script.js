import { db, ref, get } from "../firebase/firebase.js";

let grades;
let sub_list;

$(function () {
    initializeData().catch(error => console.error(error));
    initializeEvents();
})

async function initializeData(){
    const snapshotInfo = await get(ref(db, "2022-153827/"));
    grades = snapshotInfo.val().grades;
    const snapshotSub = await get(ref(db, "subjects/"));
    sub_list = snapshotSub.val();

    console.log(snapshotInfo);
    console.log(snapshotSub);
    const selectedTerm = $("#selectTerm").val()
    appendData(grades[selectedTerm])
}

/**
 * Appends each grade for the selected term
 * @param {object} term  - Term grades object with {subcode: grade, subcode2: grade}
 */
function appendData(term) {
    // Alphabetize subject list
    let subCodes = Object.keys(term)
    subCodes.sort()

    let totalUnits = 0;
    let toAppend = "";
    // Loop through all {subCode: grades}
    subCodes.forEach(subCode => {
        let sub = sub_list[subCode] // Get details of the subCode
        // Adds rows per subject in the table
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
    let termSelected = parseInt($("#selectTerm").val()) + 1
    let FINALCGWA = Number(cgwa(termSelected)).toFixed(2)
    // Adds Total Units, GWA, CGWA to the table
    // Also applies different css depending on cgwa
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
            <th colspan="3">Cumulated GWA ${termSelected == 1 ? "" : `from Term 1 to ${termSelected}:`} </th>
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

/**
 * Computes the General Weighted Average of given term grades by getting the total honor points
 * (Final Grade * Unit) and dividing with total units for the term.
 * @param {object} termObject Objects that contains grades per subject in selected term {subcode: grade}
 * @returns GWA in two decimal places
 */
function gwa(termObject) {
    let totalHonorPoints = 0;
    let totalUnits = 0
    for (const subcode in termObject) {
        if (!sub_list[subcode].include) {
            continue;
        }
        let grade = termObject[subcode]
        let units = sub_list[subcode].unit
        totalHonorPoints += grade * units
        totalUnits += units
    }
    return Math.round((totalHonorPoints / totalUnits) * 100) / 100
}

/**
 * Calculates CGWA by getting the honor points of all subjects and dividing to total units
 * Total (Final Grade * Unit) / Total Units
 * @param {string} termLimit term where the cgwa will compute until
 * @returns CGWA of all terms until termLimit
 */
function cgwa(termLimit) {
    let totalHonorPoints = 0;
    let totalUnits = 0
    for (const term in grades) {
        let termObject = grades[term]
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

function initializeEvents() {
    $("#selectTerm").on("change", () => {
        appendData(grades[$("#selectTerm").val()])
    })

    $("#navbar").load("../../navbar.html")

    $("#edit").on("click", () => {
        localStorage.setItem("edit-term", $("#selectTerm").val())
        window.location.href = `edit.html`
    })

    if (localStorage.getItem("no-asterisk")){
        $("#asterisk").empty()
    }else{
        $("#asterisk").on("click", () => {
            localStorage.setItem("no-asterisk", true)
            $("#asterisk").empty()
        })
    }
}