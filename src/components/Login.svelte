<script>
  import { replace } from "svelte-spa-router"
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import InputGroup from "./InputGroup.svelte";
  const pattern = "2022-[1-9]{6}";

  const dispatch = createEventDispatcher();
  let studID;
</script>

<form
  on:submit|preventDefault={() => {
    localStorage.setItem("stud-id", studID)
    replace('/')
    location.reload();
  }}
  transition:slide={{ duration: 400, axis: "y" }}
  class="d-flex flex-column gap-1 justify-content-center align-items-center"
>
  <h2 class="mb-4">Log In</h2>
  <InputGroup id="studID" icon="person-badge-fill" label="Student ID">
    <input
      bind:value={studID}
      type="text"
      class="form-control"
      id="studID"
      placeholder="2022-******"
      {pattern}
      required
    />
  </InputGroup>
  <InputGroup id="pass" icon="key-fill" label="Password">
    <input type="password" class="form-control" id="pass" placeholder="" />
  </InputGroup>
  <button type="submit" class="btn btn-primary w-100 mb-3">Log In</button>
  <div>
    No Account?
    <a href="./#/" on:click|preventDefault={() => dispatch("toggle")}
      >Import your Grades!</a
    >
  </div>
</form>
