<script>
  import { replace } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import InputGroup from "./InputGroup.svelte";
  import { get, ref } from "firebase/database";
  import database from "../Firebase";
  const pattern = "2022-[1-9]{6}";

  const dispatch = createEventDispatcher();
  let studID;
  let passwordValue;

  let idClass;
  let passClass;

  async function login() {
    const idRef = ref(database, `${studID}/password`);
    const idSnapshot = await get(idRef);
    const idValue = idSnapshot.val();
    if (!idValue) {
      idClass = "is-invalid"
    } else if (passwordValue != idValue) {
      passClass = "is-invalid"
    } else {
      localStorage.setItem("stud-id", studID)
      replace('/')
      location.assign("/")
    }
  }
</script>

<form
  on:submit|preventDefault={login}
  transition:slide={{ duration: 400, axis: "y" }}
  class="d-flex flex-column gap-1 justify-content-center align-items-center"
>
  <h2 class="mb-4">Log In</h2>
  <InputGroup id="studID" icon="person-badge-fill" label="Student ID">
    <input
      bind:value={studID}
      on:keyup={() => idClass = ""}
      class="form-control {idClass}"
      type="text"
      id="studID"
      placeholder="2022-******"
      {pattern}
      required
    />
  </InputGroup>
  <InputGroup id="pass" icon="key-fill" label="Password">
    <input
      bind:value={passwordValue}
      on:keyup={() => passClass = ""}
      type="password"
      class="form-control {passClass}"
      id="pass"
    />
  </InputGroup>
  <button type="submit" class="btn btn-primary w-100 mb-3">Log In</button>
  <div>
    No Account?
    <a href="./#/" on:click|preventDefault={() => dispatch("toggle")}
      >Import your Grades!</a
    >
  </div>
</form>

<style>
  input{
    border-radius: 0 0.375rem 0.375rem 0 !important;
  }
</style>