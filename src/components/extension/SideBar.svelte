<script lang="ts">
    import "../app.css"
    import { onMount } from "svelte";
    import Nav from "./Nav.svelte";
    import ArrowLeft from "./assets/ArrowLeft.svelte";
    import { tweened } from "svelte/motion";
    import { cubicInOut } from "svelte/easing";
    import NoContent from "./NoContent.svelte";
    import Content from "./Content.svelte";
    import Input from "./Input.svelte";
    import { fade } from "svelte/transition";
    import { localStore } from "./store";
    import { getDataWithDelay } from "./api";

    let sidebarContainer: HTMLElement;
    let containerCollapsed = true;
    let contentPresent = false;
    const widthMax = 340;
    const heightMax = window.innerHeight;
    const minWidth = 30;
    const minHeight = 30;
    const radiusMax = 20;
    const radiusMin = 6;

    let width = tweened(minWidth, {
        duration: 300,
        easing: cubicInOut,
    });
    let height = tweened(minHeight, {
        duration: 300,
        easing: cubicInOut,
    });

    let radius = tweened(radiusMax, {
        duration: 300,
        easing: cubicInOut,
    });

    const toggleContainer = () => {
        if (containerCollapsed) {
            containerCollapsed = false;
            width.set(widthMax);
            height.set(heightMax);
            radius.set(radiusMin);
            // sidebarContainer.style.borderRadius = "6px";
            sidebarContainer.style.overflow = "auto";
        } else {
            containerCollapsed = true;
            width.set(minWidth);
            height.set(minHeight);
            radius.set(radiusMax);
            // sidebarContainer.style.borderRadius = "20px";
            sidebarContainer.style.overflow = "hidden";
        }
    };

    let contentSection: HTMLDivElement;
    onMount(() => {
        sidebarContainer = document.querySelector("div#extensionContainer");
        contentSection = document.querySelector("#contentSection");

        const unsubscribe = localStore.subscribe((data) => {
            // @ts-ignore
            data.forEach((item) => {
                contents.push(item.response);
                contents = contents;
            });
        });

        unsubscribe();
    });

    let contents = [];
    const handleInputSend = (event) => {
        let inputValue = event.detail.value;

        let response = getDataWithDelay(inputValue, 2000);
        contents.push(response);
        contents = contents;

        response.then((response) => {
            localStore.update((data) => {
                // @ts-ignore
                data.push({
                    time: Date(),
                    request: response,
                    response: response,
                });
                return data;
            });
        });
        contentSection.scrollTop = contentSection.scrollHeight;
    };

    // Access the stored data using the store

    let showNotification = false;
    const handleNotification = () => {
        showNotification = true;
        setTimeout(() => {
            showNotification = false;
        }, 3000);
    };

    const handleClearEvent = () => {
        localStore.clear();
        contents = [];
    };

    $: {
        if (contents.length > 0) {
            contentPresent = true;
        } else {
            contentPresent = false;
        }
    }
</script>

<div class="h-screen top-0 right-0 fixed p-2 antialiased flex flex-col"
style="z-index: 10000000;"
>
    <div
        id="extensionContainer"
        class="relative bg-white h-full rounded-md flex flex-col overflow-clip shadow-xl border border-2 border-gray-600"
        style="width: {$width}px; height: {$height}px ; border-radius: {$radius}px"
    >
        <Nav
            on:squishContainer={toggleContainer}
            on:clearContentSection={handleClearEvent}
        />
        <div
            id="contentSection"
            class="px-5 text-gray-700 h-full py-2 overflow-y-auto"
            class:invisible={containerCollapsed}
        >
            {#if showNotification}
                <div class="toast toast-top toast-end">
                    <div class="alert bg-gray-50 text-gray-500 border text-sm">
                        <div>
                            <span>Copied Text</span>
                        </div>
                    </div>
                </div>
            {/if}
            <h3 class=" text-xl font-extrabold text-gray-600 mb-6">
                Summary
            </h3>
            {#if contentPresent}
                {#each contents as promise}
                    {#await promise}
                        <div class="my-5 animate-pulse animate-bounce">
                            <div
                                class="mx-2 text-center text-gray-400 font-bold text-sm"
                            >
                                Loading...
                            </div>
                        </div>
                    {:then content}
                        <Content
                            text={content}
                            on:copiedToClipboard={handleNotification}
                        />
                    {/await}

                    <div class="divider my-0 border-0" />
                {/each}
            {:else}
                <NoContent />
            {/if}
        </div>

        {#if containerCollapsed}
            <button
                in:fade={{
                    duration: 350,
                }}
                on:click={toggleContainer}
                class="absolute left-0 top-0 bg-white hover:bg-gray-200 w-full p-[6px]"
            >
                <ArrowLeft />
            </button>
        {/if}
        <Input on:sendInput={handleInputSend} />
    </div>
</div>

<style>
:global(div#extensionContainer) {
    font-size: 16px; /* 16px */
    line-height: 24px; /* 24px */
}
</style>
