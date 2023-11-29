let table = document.getElementById('tablebody');

// Term {}: [subCode, subName, grade, units, include gwa?]
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
    ]
}
const termSelect = document.getElementById('selectTerm')
$(function(){
    //$("#navbar").load("navbar.html")

    //change table when selected term changed
    $("#selectTerm").on("change", () => {
        appendRows(subs[$("#selectTerm").val()])
    })

    
});


//returns cgwa until term given
function cgwa(termLimit){
    let terms = Object.keys(subs)
    let totalGrUnit = [0,0]
    terms.every(term => {
        subs[term].forEach(sub => {
            if(sub[4]){
                totalGrUnit[0] += sub[2] * sub[3]
                totalGrUnit[1] += sub[3]
            }
        })
        if(term == termLimit){
            return false;
        }
        return true;
    })
    return((totalGrUnit[0] / totalGrUnit[1]).toFixed(2))

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
    return (totalGrAndUnit[0] / totalGrAndUnit[1]).toFixed(2)
}

//put table data of given term
function appendRows(data){
    table.innerHTML = '';
    let strAppend = ``;
    let allSubUnit = 0
    let totalGrAndUnit = [0, 0] //total [0]: final grade [1]: unit
    data.forEach(sub => {
        strAppend += `
        <tr>
            <td>${sub[0]}${sub[4] ? "" : `<span style="color: red;">*</span>`}</td>
            <td>${sub[1]}</td>
            <td class="text-center">${Number(sub[2]).toFixed(2)}</td>
            <td class="text-center">${Number(sub[3]).toFixed(1)}</td>
        </tr>`
        allSubUnit += sub[3];
        if(sub[4]){
            totalGrAndUnit[0] += sub[2] * sub[3]
            totalGrAndUnit[1] += sub[3]
        }
    })
    strAppend += `
    <tr style="border-top: 2px double;">
        <th colspan="3">Total Units:</th>
        <td class="text-center fw-bold">${Number(allSubUnit).toFixed(1) }</td>
    </tr>
    <tr>
        <th colspan="3">General Weighted Average:</th>
        <td class="text-center fw-bold">${(totalGrAndUnit[0]/totalGrAndUnit[1]).toFixed(2)}</td>
    </tr>
    <tr>
        <th colspan="3">Cumulated GWA from Term 1 to ${termSelect.value}:</th>
        <td class="text-center fw-bold">${cgwa(termSelect.value)}</td>
    </tr>`

    table.insertAdjacentHTML("afterbegin", strAppend)
}

appendRows(subs[termSelect.value])