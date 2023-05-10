<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import Send from "./assets/Send.svelte";

    let textarea: HTMLTextAreaElement;
    let input = "";
    let pressedShift = false;
    const handleEnter = (e: KeyboardEvent) => {
        if (!e.shiftKey && e.key == "Enter" && !pressedShift) {
            e.preventDefault();
            sendData();
        } else if (e.shiftKey && e.key == "Enter") {
            pressedShift = true;
        }
    };
    const handleInput = () => {
        textarea.style.height = "70px";
        textarea.style.height = `${Math.max(textarea.scrollHeight, 70)}px`;
        textarea.scrollTop = textarea.scrollHeight;
    };

    const dispatch = createEventDispatcher();
    const sendData = () => {
        if (input.length > 0) {
            pressedShift = false;
            dispatch("sendInput", { value: input });
            input = "";
            textarea.style.height = "70px";
        }
    };

    onMount(() => {
        textarea.style.height = "70px";
    });
</script>

<div class="flex flex-col relative">
    <button
        class="absolute bottom-2 right-2 p-2 text-emerald-900"
        on:click={sendData}
    >
        <Send />
    </button>
    <textarea
        class="max-h-52 bg-white border border-gray-300 py-4 px-3 rounded-md m-2 focus:outline focus:outline-1 outline-emerald-500 focus:shadow-sm focus:bg-gray-50 text-gray-700 font-medium resize-none"
        bind:value={input}
        bind:this={textarea}
        placeholder="Type in your text..."
        on:keydown={handleEnter}
        on:input={handleInput}
    />
</div>
