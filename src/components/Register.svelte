<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import InputGroup from "./InputGroup.svelte";

  const dispatch = createEventDispatcher();
</script>

<div
  transition:slide={{ duration: 400, axis: "y" }}
  class="d-flex flex-column gap-1 justify-content-center align-items-center"
>
  <h2 class="mb-4">Register</h2>
  <InputGroup id="regid" icon="person-badge-fill" label="Student ID">
        <input
        type="text"
        class="form-control"
        id="regid"
        placeholder="2022-******"
      />
  </InputGroup>
  <InputGroup id="regpass" icon="key-fill" label="Password">
    <input type="password" class="form-control" id="regpass" placeholder="" />
  </InputGroup>
  <InputGroup id="regconfpass" icon="key-fill" label="Confirm Password">
    <input type="password" class="form-control" id="regconfpass" placeholder="" />
  </InputGroup>
  <button class="btn btn-primary w-100 mb-3">Continue</button>
  <div>
    Already have an account? <a
      href="./#/"
      on:click|preventDefault={() => dispatch("toggle")}>Log In</a
    >
  </div>
</div>
