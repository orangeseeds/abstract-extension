<script>
    import { createEventDispatcher } from "svelte";
    import Typewriter from "./assets/Typewriter.svelte";

    const dispatch = createEventDispatcher();
    export let text = "";
    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(text)
            .catch((error) => {
                console.error("Error copying text to clipboard:", error);
            });
        dispatch("copiedToClipboard");
    };
    let article;
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<article
    bind:this={article}
    class="relative py-5 hover:bg-gray-50 rounded-md cursor-pointer"
    on:click={copyToClipboard}
>
    <Typewriter phrase={text}/>
</article>
