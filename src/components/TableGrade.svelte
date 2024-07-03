<script>
  import Tooltip from 'bootstrap/js/dist/tooltip'
  import {studGrades, subList} from '../store'
  export let termSelect;
  let grades = $studGrades;
  let subjects = $subList;
  studGrades.subscribe(value=>{
    grades = value
  })
  let totalUnits;
  let gwa;
  let cgwa;

  let tooltipEl;

  $: {
    console.log(subjects);
    if (grades && termSelect) {
      let totalUnit = 0;
      for (const subCode in grades[termSelect]) {
        totalUnit += subjects[subCode].unit;
      }
      totalUnits = totalUnit.toFixed(1);
      calculateGWA();
      calculateCGWA();
    }
  }
  function calculateGWA() {
    let gwaUnits = 0;
    let gwaHonor = 0;
    for (const subCode in grades[termSelect]) {
      if (!subjects[subCode].include) {
        continue;
      }
      let grade = grades[termSelect][subCode];
      let unit = subjects[subCode].unit;
      gwaUnits += unit;
      gwaHonor += grade * unit;
    }
    gwa = (Math.round((gwaHonor / gwaUnits) * 100) / 100).toFixed(2);
  }

  function calculateCGWA(){
    let cgwaHonor = 0;
    let cgwaUnits = 0;
    for (const term in grades) {
      for (const subCode in grades[term]){
        if(subjects[subCode].include){
          let grade = grades[term][subCode];
          let unit = subjects[subCode].unit;
          cgwaHonor += grade * unit;
          cgwaUnits += unit
        }
      }
      if (term == termSelect) {
        break;
      }
    }
    cgwa = (Math.round((cgwaHonor / cgwaUnits) * 100) / 100).toFixed(2);
  }
  $: if(tooltipEl){
    new Tooltip(tooltipEl);
  }

</script>

<table class="table table-bordered table-striped">
  <thead class="text-center align-middle">
    <tr>
      <th class="bg-blue text-bg-primary col-2">Subject Code</th>
      <th class="bg-blue text-bg-primary">Subject Description</th>
      <th class="bg-blue text-bg-primary col-2">Final Grade</th>
      <th class="bg-blue text-bg-primary col-1">Units</th>
    </tr>
  </thead>
  <tbody class="align-middle">
    {#if grades && subjects && termSelect}
      {#each Object.entries(grades[termSelect]) as [subject, grade]}
        <tr>
          <td
            >{subject}{#if !subjects[subject].include}
              <span class="text-danger">*</span>
            {/if}</td
          >
          <td>{subjects[subject].name}</td>
          <td class="text-center">{grade.toFixed(2)}</td>
          <td class="text-center">{subjects[subject].unit.toFixed(1)}</td>
        </tr>
      {/each}
      <tr style="border-top: 2px double;">
        <th colspan="3">Total Units:</th>
        <td class="text-center fw-bold">{totalUnits}</td>
      </tr>
      <tr>
        <th colspan="3">General Weighted Average (GWA):</th>
        <td class="text-center fw-bold">{gwa}</td>
      </tr>
      <tr>
        <th colspan="2"
          >Cumulated GWA from Term 1 {#if termSelect != "0"}
            to Term {Number(termSelect) + 1}:{/if}</th
        >
        <td class="text-center">Summa Cum Laude</td>
        <td
          bind:this={tooltipEl}
          data-bs-toggle="tooltip" 
          data-bs-title="{cgwa >= 3.75
            ? 'Summa Cum Laude'
            : cgwa >= 3.5
              ? 'Magna Cum Laude'
              : cgwa >= 3.25
              ? 'Cum Laude' : ''}"
          class="text-center fw-bold {cgwa >= 3.75
            ? 'cgwa-high'
            : cgwa >= 3.5
              ? 'cgwa-mid'
              : ''}">{cgwa}</td
        >
      </tr>
    {/if}
  </tbody>
</table>

<style>
  .cgwa-high {
    background: linear-gradient(
      45deg,
      #ffa2ff,
      #ff89eb,
      #fff56c,
      #feffbe,
      #fdffa4
    );
    background-size: 400% 400%;
    animation: gradient 10s ease-in-out infinite;
    color: black !important;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 90% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .cgwa-mid {
    background: linear-gradient(45deg, #ff4fd3, #fdff77);
    color: black !important;
  }
</style>
