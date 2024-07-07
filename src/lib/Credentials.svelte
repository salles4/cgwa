<script>
  import { fade, fly, slide } from "svelte/transition";
  import Login from "../components/Login.svelte";
  import Register from "../components/Register.svelte";

  let login = true;
  function toggle() {
    login = !login;
  }
</script>

<main class="container d-flex justify-content-center p-md-5 p-2">
  <div class="login overflow-hidden py-4 px-5 col-lg-6 col-md-8 col-12">
    {#if login}
      <Login on:toggle={toggle} />
    {:else}
      <Register on:toggle={toggle} />
    {/if}
  </div>
</main>

<style>
  .login {
    border: black 1px solid;
    border-radius: 1em;
    backdrop-filter: blur(2px);
    transition: all 0.4s ease;
  }
</style>
