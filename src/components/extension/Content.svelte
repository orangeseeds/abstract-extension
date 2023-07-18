<script>
    import { createEventDispatcher } from "svelte";
    import Typewriter from "./assets/Typewriter.svelte";

    const dispatch = createEventDispatcher();
    export let text = "";
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text).catch((error) => {
            console.error("Error copying text to clipboard:", error);
        });
        dispatch("copiedToClipboard");
    };
    let article;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article
    bind:this={article}
    class="relative hover:bg-gray-100 rounded-md cursor-pointer"
    on:click={copyToClipboard}
    style=" padding-top: 1.25rem !important; padding-bottom: 1.25rem !important; "
>
    <Typewriter phrase={text} />
</article>
