<script lang="ts">
    import "./app.css"
    import { storage } from "src/storage";
    import { onMount } from "svelte";
    import Nav from "./extension/Nav.svelte";
    import UserIcon from "./extension/assets/UserIcon.svelte";
    import SideBar from "./extension/SideBar.svelte";

    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

    <SideBar />

<style>
    .overlay {
        position: fixed;
        top: 16px;
        left: 16px;
        background-color: white;
        border: 1px solid black;
        padding: 4px;
    }
</style>
