import { writable } from "svelte/store";

const studID = writable(localStorage.getItem("studID") || null)
const studGrades = writable(null);
const subList = writable(null);

export {studID, studGrades, subList}