<script lang="ts">
    import "../app.css";
    import Nav from "./Nav.svelte";
    import ArrowLeft from "./assets/ArrowLeft.svelte";
    import NoContent from "./NoContent.svelte";
    import Content from "./Content.svelte";
    import Input from "./Input.svelte";
    import { afterUpdate, onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { cubicInOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import { jwtToken, localStore } from "./store";
    import {
        getSummaryList,
        summarizeText,
        clearSummaryList,
    } from "./lib/summarize";
    import Login from "./Login.svelte";
    import Signup from "./Signup.svelte";

    let loginPrompt = true;
    let showSignup = false;
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

    const clearList = () => {
        try {
            let response = clearSummaryList(window.location.host);
            response.then((response) => {
                console.log(response);
            });
        } catch (error) {
            console.log(error);
        }
    };
    const loadList = () => {
        try {
            let response = getSummaryList(window.location.host);

            response.then((response) => {
                console.log(response);
                response.summaries.forEach((item) => {
                    contents.push({
                        summary: item,
                    });
                });
                contents = contents;
            });
        } catch (error) {
            console.log(error);
        }
    };

    let contentSection: HTMLDivElement;
    onMount(() => {
        sidebarContainer = document.querySelector("div#extensionContainer");
        contentSection = document.querySelector("#contentSection");

        loadList();
    });

    let contents = [];
    const handleInputSend = (event) => {
        let inputValue = event.detail.value;

        try {
            let response = summarizeText(inputValue, window.location.host);

            contents.push(response);
            contents = contents;
        } catch (error) {
            console.log(error);
            loginPrompt = true;
        }
    };

    afterUpdate(() => {
        if (contentSection && !showNotification) {
            contentSection.scrollTop = contentSection.scrollHeight;
        }
    });

    // Access the stored data using the store

    let showNotification = false;
    const handleNotification = () => {
        showNotification = true;
        setTimeout(() => {
            showNotification = false;
        }, 3000);
    };

    const handleReloadEvent = () => {
        localStore.clear();
        contents = [];
        loadList();
    };
    const handleClearEvent = () => {
        localStore.clear();
        contents = [];
        clearList();
    };

    $: {
        if (contents.length > 0) {
            contentPresent = true;
        } else {
            contentPresent = false;
        }
    }

    jwtToken.subscribe((data) => {
        // @ts-ignore
        if (data != "") {
            loginPrompt = false;
        } else {
            loginPrompt = true;
        }
    });
</script>

<div
    class="h-screen top-0 right-0 fixed p-2 antialiased flex flex-col"
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
            on:reloadContentSection={handleReloadEvent}
            on:logout={() => {
                loginPrompt = true;
                jwtToken.set("");
                contents = [];
            }}
        />
        {#if loginPrompt}
            {#if showSignup}
                <Signup
                    on:showLogin={() => {
                        showSignup = false;
                    }}
                    on:signupComplete={() => {
                        loginPrompt = false;
                        loadList();
                    }}
                />
            {:else}
                <Login
                    on:showSignUp={() => {
                        showSignup = true;
                    }}
                    on:loginComplete={() => {
                        loginPrompt = false;
                        loadList();
                    }}
                />
            {/if}
        {:else}
            <div
                id="contentSection"
                class="text-gray-700 h-full py-2 px-5 overflow-y-auto"
                class:invisible={containerCollapsed}
                style=" padding-left: 1.25rem !important; padding-right: 1.25rem !important; "
            >
                <!--Notification-->
                {#if showNotification}
                    <div
                        class="toast toast-top toast-end"
                        style="z-index: 10000000000000;"
                    >
                        <div
                            class="alert bg-gray-50 text-gray-500 border text-sm"
                        >
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
                                text={content.summary.response}
                                on:copiedToClipboard={handleNotification}
                            />
                        {:catch error}
                            <div class="text-gray-300 font-semibold text-sm">
                                Oops, some error occured... {error}
                            </div>
                        {/await}

                        <div class="divider my-0 border-0" />
                    {/each}
                {:else}
                    <NoContent />
                {/if}
            </div>

            <Input on:sendInput={handleInputSend} />
        {/if}
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
    </div>
</div>

<style>
    /**
    :global(div#extensionContainer) {
        font-size: 16px;         
line-height: 24px;    }
**/
</style>
