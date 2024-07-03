<script>
  // @ts-nocheck
  import { onDestroy } from "svelte";
  import { querystring, pop } from "svelte-spa-router";
  import { studGrades, subList } from "../store";
  import { update, ref } from "firebase/database";
  import Modal from "bootstrap/js/dist/modal";
  import database from "../Firebase";

  const studID = localStorage.getItem("stud-id");
  const queryParams = new URLSearchParams($querystring);
  let termSelect = queryParams.get("term") || "";

  let grades = $studGrades;
  let subjects = $subList;
  let changes = {};

  let modalElement;
  let modalObject;
  let modalContent = {
    title: "",
    content: "",
    primaryText: "",
    secondaryText: "Cancel",
    primaryColor: "",
    secondaryColor: "secondary",
    primaryFunction: () => {
      modalObject.dispose();
      pop();
    },
  };
  $: if (modalElement) {
    modalObject = new Modal(modalElement, { backdrop: "static" });
  }
  const gradeValues = [4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0];
  export function isGradeSame() {
    let isSame = true;
    let subChanges = Object.keys(changes);
    subChanges.forEach((subCode) => {
      if (!gradeValues.includes(changes[subCode])) {
        alert("Invalid grades detected, Please avoid editing values.");
        pop();
        isSame = true;
        return;
      }
      if (grades[termSelect][subCode].toFixed(2) != changes[subCode]) {
        isSame = false;
        return;
      }
    });
    return isSame;
  }
  function updateGrades() {
    if (studID) {
      update(ref(database, `${studID}/grades/${termSelect}`), changes)
        .then(() => {
          changes = {};
          modalObject.dispose();
          pop();
        })
        .catch((e) => console.error(e));
    } else {
      let subChanges = Object.keys(changes);
      subChanges.forEach(subCode => {
        grades[termSelect][subCode] = changes[subCode]
      });
      const gradesString = JSON.stringify(grades)
      localStorage.setItem('grades', gradesString);
      changes = {};
      modalObject.dispose();
      pop();
    }
  }
  export function discard() {
    if (!isGradeSame()) {
      modalContent = {
        ...modalContent,
        title: "Discard Changes?",
        content: "Are you sure you want to discard changes?",
        primaryText: "Discard",
        primaryColor: "danger",
      };
      modalObject.show();
    } else {
      pop();
    }
  }
  export function save() {
    if (!isGradeSame()) {
      modalContent = {
        ...modalContent,
        title: "Save Changes?",
        content: "Are you sure you want to save all changes?",
        primaryText: "Save",
        primaryColor: "success",
        primaryFunction: updateGrades,
      };
      toggleModal()
    } else {
      pop();
    }
  }
  export function toggleModal() {
    modalObject.toggle();
  }
</script>

<table class="table table-bordered table-striped">
  <thead class="text-center align-middle">
    <tr>
      <th class="bg-blue text-bg-primary col-2">Subject Code</th>
      <th class="bg-blue text-bg-primary">Subject Name</th>
      <th class="bg-blue text-bg-primary col-2">Final Grade</th>
      <th class="bg-blue text-bg-primary col-1">Units</th>
    </tr>
  </thead>
  <tbody id="tablebody">
    <!-- Table Data -->
    {#if grades && termSelect}
      {#each Object.entries(grades[termSelect]) as [subject, grade]}
        <tr class="align-middle">
          <td
            >{subject}{#if !subjects[subject].include}
              <span class="text-danger">*</span>
            {/if}</td
          >
          <td>{subjects[subject].name}</td>
          <td class="text-center">
            <select
              class="form-select w-auto d-inline py-0"
              name="grade"
              value={grade.toFixed(2)}
              on:change={(event) => {
                changes[subject] = parseFloat(event.target.value);
                console.log(changes);
              }}
            >
              <option>4.00</option>
              <option>3.50</option>
              <option>3.00</option>
              <option>2.50</option>
              <option>2.00</option>
              <option>1.50</option>
              <option>1.00</option>
            </select>
          </td>
          <td class="text-center">{subjects[subject].unit.toFixed(1)}</td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<!-- Modal -->
<div
  bind:this={modalElement}
  class="modal fade"
  tabindex="-1"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">{modalContent.title}</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        {modalContent.content}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-{modalContent.secondaryColor}"
          data-bs-dismiss="modal">{modalContent.secondaryText}</button
        >
        <button
          type="button"
          class="btn btn-{modalContent.primaryColor}"
          on:click={() => {
            modalContent.primaryFunction();
          }}>{modalContent.primaryText}</button
        >
      </div>
    </div>
  </div>
</div>
