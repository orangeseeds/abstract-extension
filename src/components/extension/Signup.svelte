<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Eye from "./assets/Eye.svelte";
    import { signup } from "./lib/auth";
    import { fade } from "svelte/transition";
    import { jwtToken } from "./store";
    let fieldType = "password";

    const dispatch = createEventDispatcher();
    let email = "";
    let password = "";
    let username = "";

    const handleClick = () => {
        if (fieldType == "password") {
            fieldType = "text";
        } else {
            fieldType = "password";
        }
        const elem: HTMLInputElement = document.querySelector("#password");
        elem.type = fieldType;
    };

    const handleSubmit = () => {
        dispatch("signupComplete");
        signup(email, password).then((response) => {
            console.log(response);
            jwtToken.set(response.jwt.access_token);
        });
    };
</script>

<div class="flex flex-col justify-center px-6 py-24 lg:px-8" in:fade>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800"
        >
            SignUp to AbstractAI
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
            <div>
                <span class="block text-sm font-medium leading-6 text-gray-900"
                    >Email address</span
                >
                <div class="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        class="w-full rounded-md border border-gray-400 py-1 text-gray-700 focus:shadow-sm focus:outline focus:outline-1 outline-emerald-500 focus:shadow-sm focus:bg-gray-50 text-gray-700 font-medium"
                        bind:value={email}
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <span
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Username</span
                    >
                </div>
                <div class="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        class="w-full rounded-md border border-gray-400 py-1 text-gray-700 focus:shadow-sm focus:outline focus:outline-1 outline-emerald-500 focus:shadow-sm focus:bg-gray-50 text-gray-700 font-medium"
                        bind:value={username}
                    />
                </div>
                <div>
                    <div class="flex items-center justify-between mt-6">
                        <span
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Password</span
                        >
                    </div>
                    <div class="relative my-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            class="w-full rounded-md border border-gray-400 py-1 text-gray-700 focus:shadow-sm focus:outline focus:outline-1 outline-emerald-500 focus:shadow-sm focus:bg-gray-50 text-gray-700 font-medium"
                            bind:value={password}
                        />
                        <button
                            type="button"
                            class="absolute my-3.5 top-0 right-3"
                            on:click={handleClick}
                        >
                            <Eye />
                        </button>
                    </div>
                </div>

                <div class="mt-4">
                    <button
                        on:click|preventDefault={handleSubmit}
                        type="button"
                        class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-emerald-600"
                        >Sign Up</button
                    >
                </div>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <button
                on:click={() => dispatch("showLogin")}
                class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                >SignIn Now</button
            >
        </p>
    </div>
</div>
