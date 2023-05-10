<script>
    import { cubicInOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import GhostPng from "./assets/GhostPng.svelte";
</script>

<div
    in:fade={{ duration: 200, easing: cubicInOut }}
    class="flex flex-col pt-44 items-center text-gray-900 relative opacity-25"
>
    <GhostPng />
    <span class="font-black text-3xl absolute top-36 left-1/3">!!</span>
    <span class="mt-4 font-black text-center text-2xl w-4/5"
        >Noting to see here../</span
    >
    <span class="font-bold text-sm"> Generate a new summary</span>
</div>
