<script>
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Grades from "./lib/Grades.svelte";
  import EditGrades from "./lib/EditGrades.svelte";
  import { studID, studGrades, subList } from "./store";
  import { get, ref, onValue } from "firebase/database";
  import database from "./Firebase";
  import InitGrades from "./lib/Import.svelte";
  import LogIn from "./lib/Credentials.svelte";

  /**
  * if local id get grade
  * if local grade get local grade
  * else get template
  * 
  */
  let localID;
  let localGrades;
  async function initData(){
    localID = localStorage.getItem("stud-id");
    localGrades = localStorage.getItem("grades");

    if(localID){
      localStorage.removeItem("grades");
      getDBGrades()
    }else if(localGrades){
      const grades = JSON.parse(localGrades)
      studGrades.set(grades)
    }else{
      const response = await fetch('./importTemplate.json')
      const templateJson = await response.json()
      const template = JSON.stringify(templateJson)
      localStorage.setItem('grades', template)
      initData();
    }
    getSubjects()
  }

  async function getDBGrades() {
    const idRef = ref(database, `${localID}/`);
    onValue(idRef, (snapshot) => {
      console.log("gettedData");
      let grades = snapshot.val().grades;
      studGrades.set(grades);
    });
  }
  async function getSubjects(){
    const snapshotSub = await get(ref(database, "subjects/"));
    let sub_list = snapshotSub.val();
    subList.set(sub_list);
  }
  
  initData()
  
</script>
<Navbar />
{#if !localID && $studGrades != {} && $subList && $studGrades}
  <Router
    routes={{
      "/": Grades,
      "/login": LogIn,
      "/edit": EditGrades,
    }}
  />
{:else if $studGrades != {} && $subList}
  <Router
    routes={{
      "/": Grades,
      "/edit": EditGrades,
      "/import": InitGrades,
    }}
  />
{:else}
  <div class="d-flex justify-content-center">
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{/if}
