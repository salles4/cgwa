<script>
  const studID = localStorage.getItem("stud-id");
  let classTheme = localStorage.getItem("theme") || "light";
  function toggle() {
    classTheme = classTheme == "light" ? "dark" : "light";
    localStorage.setItem("theme", classTheme);
  }
  $: document.querySelector("body").setAttribute("data-bs-theme", classTheme);
  $: themeIcon =
    classTheme == "dark" ? "brightness-high-fill" : "moon-stars-fill";
</script>

<nav
  class="navbar navbar-expand-lg text-bg-primary bg-gradient border-bottom border-warning border-5"
>
  <div class="container-lg">
    <span class="navbar-brand fw-bold">
      <i class="bi bi-calculator"></i>
      cgwa
      <span
        class="fs-6 text-white-50 ms-2 d-xl-inline d-none fw-normal text-secondary"
        >Get your cgwa</span
      >
    </span>

    <div>
      {#if !studID}
        <a href="./#/login"><i class="bi bi-person-fill"></i> Log In</a>
      {:else}
        <a
          href="./#/"
          on:click|preventDefault={() => {
            localStorage.removeItem("stud-id");
            location.reload();
          }}><i class="bi bi-box-arrow-left"></i> Log Out</a
        >
      {/if}
      <button type="button" class="bg-transparent border-0" on:click={toggle}
        ><i class="bi bi-{themeIcon}"></i></button
      >
    </div>
  </div>
</nav>

<style>
  * {
    color: white !important;
  }
  a{
    text-decoration: none;
  }
  a:hover, a .bi:hover{
    /* text-decoration: underline; */
    color: rgb(148, 148, 148) !important;
  }
  .navbar {
    background-color: #0f587d !important;
  }
</style>
