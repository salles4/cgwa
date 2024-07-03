<script>
  import { fade } from "svelte/transition";
  import { querystring } from 'svelte-spa-router'
  import TableEdit from "../components/TableEdit.svelte";
  const queryParams = new URLSearchParams($querystring);
  
  let tableEdit;

  let termSelect = queryParams.get("term") || "";
</script>

<fieldset class="container-lg" in:fade={{duration:400}}>
  <legend
    class="border-bottom border-2 my-4 py-2 d-flex justify-content-between"
  >
    <div class="fw-semibold fs-4">
      <i class="bi-table mx-2"></i>Edit Term {parseInt(termSelect) + 1} Grades
    </div>
    <div class="text-end">
      <small
        class="d-sm-inline d-none"
        style="font-size: 14px; color: red; margin-right: 1em;"
        >Leaving the site will discard changes</small
      >
      <button id="discard" class="btn btn-danger" on:click={()=>{tableEdit.discard()}}
        ><i class="bi-trash"></i> Discard</button
      >
      <button id="save" class="btn btn-success" type="button" on:click={()=>{tableEdit.save()}}
        ><i class="bi-download"></i> Save</button
      >
    </div>
  </legend>
  <TableEdit bind:this={tableEdit}/>
</fieldset>
