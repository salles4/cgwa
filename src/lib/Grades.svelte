<script>
  import { fade } from "svelte/transition";
  import { push } from "svelte-spa-router";
  import TableGrade from "../components/TableGrade.svelte";
  import { Alert } from "bootstrap";
  let termSelect;

  new Alert(document.querySelector("#alert"));
</script>

<div class="container-lg my-4" in:fade={{ duration: 400 }}>
  <!-- <h4 class="my-4 mx-4">
    <strong>Flowchart Information:</strong>
  </h4>
  <small>
    <div class="mx-auto w-75">
      <p>
        <span class="fw-bold">Flowchart Code:</span>
        1-2021-BSIT-MWA
      </p>
      <p>
        <span class="fw-bold">Flowchart Name:</span> CURRICULUM FOR BACHELOR OF SCIENCE
        IN INFORMATION TECHNOLOGY WITH SPECIALIZATION IN MOBILE AND WEB APPLICATIONS
      </p>
    </div>
  </small> -->
  <div class="mx-3">
    <label class="mx-4 d-inline" for="selectTerm"
      ><strong>Select Term:</strong></label
    >
    <select
      class="form-select w-auto d-inline"
      style="font-size: 14px;"
      name="selectTerm"
      id="selectTerm"
      bind:value={termSelect}
    >
      <option value="0">Term 1</option>
      <option value="1">Term 2</option>
      <option value="2">Term 3</option>
      <option value="3">Term 4</option>
      <option value="4">Term 5</option>
      <option value="5" >Term 6</option>
      <option value="6" >Term 7</option>
      <option value="7" >Term 8</option>
      <option value="8">Term 9</option>
      <option value="9" selected>Term 10</option>
    </select>
  </div>
  <fieldset>
    <legend
      class="border-bottom border-2 my-3 py-2 d-flex justify-content-between"
    >
      <div class="fw-semibold fs-4">
        <i class="bi-table mx-2"></i>Grades
      </div>
      <div class="mx-2">
        <button
          id="edit"
          class="btn btn-primary btn-sm"
          type="button"
          on:click={() => {
            push(`/edit?term=${termSelect}`);
          }}><i class="bi-pencil-square"></i> Edit</button
        >
      </div>
    </legend>
    {#if termSelect}
      <TableGrade {termSelect} />
    {/if}
    <div id="asterisk">
      <div
        class="alert alert-warning alert-dismissible fade show my-4 container-xs mx-auto"
        role="alert"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
        <div class="d-flex justify-content-between">
          <span
            ><strong>Note:</strong> Subjects with asterisk(*) are not included in
            GWA and CGWA</span
          >
          <a href="./#">Do not show again</a>
        </div>
      </div>
    </div>
  </fieldset>
</div>