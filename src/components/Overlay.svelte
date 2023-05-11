<script lang="ts">
    import "./app.css";
    import { storage } from "src/storage";
    import { onMount } from "svelte";
    import SideBar from "./extension/SideBar.svelte";
    import { refreshToken } from "./extension/lib/auth";
    import { jwtToken } from "./extension/store";
    import { get } from "svelte/store";

    let count = 0;

    const poll = () => {
        refreshToken()
            .then((data) => {
                jwtToken.set(data.jwt.access_token);
            })
            .catch((error) => {
                console.log(error);
                jwtToken.set("");
            });
    };

    if (get(jwtToken) != "") {
        poll();
        setInterval(() => poll(), 555 * 1000);
    }

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<SideBar />

<!-- The button to open modal -->

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
