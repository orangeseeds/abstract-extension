import SideBar from "src/components/extension/SideBar.svelte";
import { storage } from "src/storage";

const target = document.getElementById("app");

function render() {
    storage.get().then(({ count }) => {
        new SideBar({ target });
    });
}

document.addEventListener("DOMContentLoaded", render);
