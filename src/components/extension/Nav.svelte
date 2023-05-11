<script>
    import { createEventDispatcher } from "svelte";
    import ArrowRight from "./assets/ArrowRight.svelte";
    import OpenWindow from "./assets/OpenWindow.svelte";
    import UserIcon from "./assets/UserIcon.svelte";
    import ConfigIcon from "./assets/ConfigIcon.svelte";
    import { fade } from "svelte/transition";
    import { expoIn } from "svelte/easing";
    import Reload from "./assets/Reload.svelte";

    const dispatch = createEventDispatcher();
    const collapseContainer = () => {
        dispatch("squishContainer");
    };

    const openProfile = () => {};

    let configVisible = false;
    const openConfig = () => {
        configVisible = !configVisible;
    };
    const reloadContentSection = () => {
        dispatch("reloadContentSection");
    };

    const dispatchClearEvent = () => {
        dispatch("clearContentSection");
    };

    const dispatchLogoutEvent = () => {
        dispatch("logout");
    };
</script>

<div class="m-1 p-0.5 border-b border-gray-300 shadow-sm">
    <div class="flex justify-between items-center">
        <button
            class="flex w-1/4 justify-center py-2 m-1 hover:bg-gray-300 rounded-md"
            on:click={collapseContainer}
        >
            <ArrowRight />
        </button>
        <button
            class="flex w-1/4 justify-center py-2 m-1 hover:bg-gray-300 rounded-md"
            on:click={openProfile}
        >
            <UserIcon />
        </button>
        <button
            class="flex w-1/4 justify-center py-2 m-1 hover:bg-gray-300 rounded-md"
            on:click={openConfig}
        >
            <ConfigIcon />
        </button>
        <button
            class="flex w-1/4 justify-center py-2 m-1 hover:bg-gray-300 rounded-md"
            on:click={reloadContentSection}
        >
            <Reload />
        </button>
    </div>
</div>

{#if configVisible}
    <div
        in:fade={{
            duration: 100,
            easing: expoIn,
        }}
        out:fade={{
            duration: 100,
            easing: expoIn,
        }}
        class="bg-gray-50 rounded-md p-2 py-6 border shadow-md absolute w-full mt-14 mx-1 space-y-4 z-50"
        style="width: 98%;"
    >
        <div>
            <div class="tooltip tooltip-right" data-tip="depth information">
                <label for="depth" class="text-gray-500 text-sm font-semibold"
                    >depth</label
                >
            </div>
            <input
                name="depth"
                type="range"
                min="0"
                max="100"
                value="25"
                class="range range-xs"
                step="25"
            />
            <div
                class="w-full flex justify-between text-xs px-2 font-semibold text-gray-400"
            >
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
        </div>
        <div>
            <div class="tooltip tooltip-right" data-tip="listings information">
                <label for="depth" class="text-gray-500 text-sm font-semibold"
                    >listings</label
                >
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value="40"
                class="range range-xs"
            />
        </div>

        <button
            class="text-gray-500 font-semibold text-sm"
            on:click={dispatchLogoutEvent}>Logout</button
        >
        <button
            class="text-gray-500 font-semibold text-sm"
            on:click={dispatchClearEvent}>Clear</button
        >

        <!-- The button to open modal -->
        <label
            for="my-modal"
            class="text-gray-500 font-semibold text-sm cursor-pointer"
            >open modal</label
        >

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">
                    Congratulations random Internet user!
                </h3>
                <p class="py-4">
                    You've been selected for a chance to get one year of
                    subscription to use Wikipedia for free!
                </p>
                <div class="modal-action">
                    <label for="my-modal" class="btn">Yay!</label>
                </div>
            </div>
        </div>
    </div>
{/if}
