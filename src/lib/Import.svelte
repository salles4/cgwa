<script lang="ts">
  import { fade } from "svelte/transition";
  import { subList } from "../store";
  import { onMount } from "svelte";

  let subDetails = $subList;
  let gradeTemplate: Object[];
  let changes = {};

  let stickyDiv: String;
  let stickyElement: Element;

  async function initData() {
    let response = await fetch("./importTemplate.json");
    let data = await response.json();
    gradeTemplate = data;
  }
  function selectOnChange(event: Event){
    
    let selectElement = event.target as HTMLSelectElement;
    console.log(selectElement.value);
    let subject = selectElement.id
    let term = selectElement.getAttribute('data-term')
    changes[subject] = parseFloat(selectElement.value)
    console.log(changes);
  }
  const observer = new IntersectionObserver(
    ([entries]) => {
      stickyDiv = entries.intersectionRatio < 1 ? "shadow" : "";
    },
    { threshold: [1] }
  );

  onMount(() => {
    observer.observe(stickyElement);
  });
  initData();
</script>

<main class="" in:fade={{ duration: 400 }}>
  <div
    bind:this={stickyElement}
    class="sticky-top {stickyDiv}"
    style:background-color="var(--bs-body-bg)"
    style:top="-1px"
    style:transition="all ease 0.2s"
  >
    <div class="container-lg d-flex justify-content-between align-items-center">
      <div class="mt-3">
        <h4>Importing Grades</h4>
        <p>Select your Final Grade for each subject to compute for CGWA.</p>
      </div>
      <div>
        <button class="btn btn-success"
          >Import <i class="bi-arrow-right-short"></i></button
        >
      </div>
    </div>
  </div>
  <section class="container-lg">
    {#if gradeTemplate}
      {#each gradeTemplate as term, index}
        <fieldset>
          <legend class="border-bottom border-2 mb-2 py-2">
            <div class="">
              <i class="bi-table mx-2"></i>Term {index + 1}
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
              {#each Object.keys(term) as subCode}
                <tr class="align-middle">
                  <td
                    >{subCode}{#if !subDetails[subCode].include}<span
                        style="color: red;">*</span
                      >{/if}</td
                  >
                  <td>{subDetails[subCode].name}</td>
                  <td class="text-center">
                    <select
                      class="form-select bg-transparent w-auto d-inline py-0"
                      id={subCode}
                      data-term={term}
                      on:change={selectOnChange}
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
                  <td class="text-center"
                    >{subDetails[subCode].unit.toFixed(1)}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </fieldset>
      {/each}
    {/if}
  </section>
</main>
