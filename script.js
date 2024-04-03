let table = document.getElementById('tablebody');

// Term {}: [subCode, subName, grade, units, include gwa?]
const SUBCODE = 0, SUBNAME = 1, GRADE = 2, UNITS = 3, NON_GWA_SUB = 4;
const subs = {
    "Term 1": [
        ["CCINCOML", "INTRODUCTION TO COMPUTING", 4.00, 3.0, true],
        ["CCPRGG1L", "FUNDAMENTALS OF PROGRAMMING", 4.00, 3.0, true],
        ["GEPCM01X", "PURPOSIVE COMMUNICATION", 4.00, 3.0, true],
        ["GERPH01X", "READINGS IN THE PHILIPPINE HISTORY", 4.00, 3.0, true],
        ["GEUTS01X", "UNDERSTANDING THE SELF", 3.00, 3.0, true],
        ["PHYSED11", "PHYSICAL FITNESS / AEROBICS", 4.00, 2.0, false]
    ],
    "Term 2": [
        ["CCPRGG2L", "INTERMEDIATE PROGRAMMING", 4.00, 3.0, true],
        ["CTHASOPL", "HARDWARE, SOFTWARE AND PERIPHERAL INSTALLATION", 4.00, 1.0, true],
        ["GECTW01X", "THE CONTEMPORARY WORLD", 4.00, 3.0, true],
        ["GEMMW01X", "MATHEMATICS IN THE MODERN WORLD", 3.50, 3.0, true],
        ["GESTS01X", "SCIENCE, TECHNOLOGY AND SOCIETY", 4.00, 3.0, true],
        ["PHYSED12", "RHYTHMIC ACTIVITIES", 4.00, 2.0, false]
    ],
    "Term 3":[
        ["CCDISTR1", "DISCRETE STRUCTURES 1", 3.50, 3, true],
        ["CCOBJPGL", "OBJECT-ORIENTED PROGRAMMING", 4, 3, true],
        ["GEART01X", "ART APPRECIATION", 4, 3, true],
        ["GEENT01X", "THE ENTREPRENEURIAL MIND", 3.5, 3, true],
        ["GEETH01X", "ETHICS", 4.00, 3.0, true],
        ["MCWTS01X", "NATIONAL SERVICE TRAINING PROGRAM 1", 3.50, 3, false],
        ["PHYSED13", "INDIVIDUAL AND DUAL SPORTS", 4.00, 2.0, false]
    ],
    "Term 4":[
        ["CCDATRCL", "DATA STRUCTURES AND ALGORITHMS", 4.00, 3.0, true],
        ["CCPLTFRL", "PLATFORM TECHNOLOGIES", 3.00, 3.0, true],
        ["GEFID01X", "WIKA AT PANITIKAN SA PAGPAPATIBAY NG PIILIPINONG IDENTIDAD", 3.50, 3.0, true],
        ["GERIZ01X", "LIFE AND WORKS OF RIZAL", 3.50, 3.0, true],
        ["MCWTS02X", "NATIONAL SERVICE TRAINING PROGRAM 2", 4.00, 3.0, false],
        ["PHYSED14", "TEAM SPORTS", 4.00, 2.0, false]
    ],
    "Term 5": [
        ["CCOMPORG", "COMPUTER ORGANIZATION AND ARCHITECTURE", 3.50, 3.0, true],
        ["CTAPDEVL", "APPLICATIONS DEVELOPMENT AND EMERGING TECHNOLOGIES", 4.00, 3.0, true],
        ["CTINFMGL", "INFORMATION MANAGEMENT", 3.50, 3.0, true],
        ["GEACM01X", "ADVANCED COMMUNICATION", 4.00, 3.0, true],
        ["GEITE01X", "LIVING IN THE I.T. ERA", 4.00, 3.0, true],
        ["MCNAT01R", "NATIONALIAN COURSE", 4.00, 3.0, true]
    ]
}
const termSelect = document.getElementById('selectTerm')
const id = "2022-153827"
$(function(){
    $("#navbar").load("navbar.html")
    appendRows(subs[$("#selectTerm").val()])
    //change table when selected term changed
    $("#selectTerm").on("change", () => {
        appendRows(subs[$("#selectTerm").val()])
    })
    $("#edit").on("click", () => {
        let selectedTerm = encodeURIComponent($("#selectTerm").val())
        window.location.href = `edit.html?id=${id}&term=${selectedTerm}`
    })
});



//returns cgwa until term given
function cgwa(termLimit){
    let terms = Object.keys(subs)
    let totalGr = 0
    let totalUnit = 0
    terms.every(term => {
        subs[term].forEach(sub => {
            if(sub[4]){
                totalGr += sub[2] * sub[3]
                totalUnit += sub[3]
            }
        })
        if(term == termLimit){
            return false;
        }
        return true;
    })
    return ((totalGr / totalUnit).toFixed(2))

}

function gwa(term){
    let totalGrAndUnit = [0,0]
    term.forEach(sub => {
        if (sub[4]){
            totalGrAndUnit = [
                totalGrAndUnit[0]+(sub[2]*sub[3]),
                totalGrAndUnit[1]+sub[3]
            ]
        }
    })
    return Math.round(totalGrAndUnit[0] / totalGrAndUnit[1]).toFixed(2)
}

//put table data of given term
function appendRows(data){
    table.innerHTML = '';
    let strAppend = ``;
    let allSubUnit = 0
    let totalGr = 0, totalUnit = 0;
    data.forEach(sub => {
        strAppend += `
        <tr>
            <td>${sub[SUBCODE]}${sub[NON_GWA_SUB] ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${sub[SUBNAME]}</td>
            <td class="text-center">${Number(sub[GRADE]).toFixed(2)}</td>
            <td class="text-center">${Number(sub[UNITS]).toFixed(1)}</td>
        </tr>`
        allSubUnit += sub[UNITS];
        if(sub[NON_GWA_SUB]){
            totalGr += sub[2] * sub[3]
            totalUnit += sub[3]
        }
    })
    const FINALCGWA = cgwa(termSelect.value);
    strAppend += `
    <tr style="border-top: 2px double;">
        <th colspan="3">Total Units:</th>
        <td class="text-center fw-bold">${Number(allSubUnit).toFixed(1) }</td>
    </tr>
    <tr>
        <th colspan="3">General Weighted Average:</th>
        <td class="text-center fw-bold">${(totalGr / totalUnit).toFixed(2)}</td>
    </tr>
    <tr>
        <th colspan="3">Cumulated GWA from Term 1 to ${termSelect.value}:</th>
        <td class="${
            FINALCGWA >= 3.75 ? "cgwa-high" : 
            FINALCGWA >= 3.5 ? "cgwa-mid" : ""
        } text-center fw-bold" data-bs-container="body" 
            data-bs-trigger="hover" data-bs-toggle="popover" 
            data-bs-custom-class="fw-bold" 
            data-bs-content="${
                FINALCGWA >= 3.75 ? "Summa Cum Laude" : 
                FINALCGWA >= 3.5 ? "Magna Cum Laude" : 
                FINALCGWA >= 3.25 ? "Cum Laude" : ""
            }">
            ${FINALCGWA}
        </td>
    </tr>`

    table.insertAdjacentHTML("afterbegin", strAppend)
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

