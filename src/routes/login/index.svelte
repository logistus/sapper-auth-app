<script context="module">
export function preload(page, session) {
    const { token } = session;
    if (token) {
        this.redirect(302, '/');
    }
}
</script>
<script>
    let errors = {}, username = "", password = "", remember_me = false, loading = false, loginDone = false, loginError = "";
    import { goto, stores } from '@sapper/app';
    const { session } = stores();

    function checkForm() {
        if (username === "") {
            errors.username = "Username is required";
        } else {
            errors.username = "";
            delete errors.username;
        }

        if (password === "") {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be minimum 6 characters";
        } else {
            errors.password = "";
            delete errors.password;
        }
    }

    async function login() {
        checkForm();

        if (Object.keys(errors).length === 0) {
            loading = true;
            loginError = "";
            fetch('login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username": username, "password": password, "remember_me": remember_me})
            })
            .then(r => {
                r.json()
                    .then(function(result) {
                        if (result.token) {
                            loading = false;
                            loginDone = true;
                            loginError = "";
                            $session.token = result.token;
                            goto('/');
                        } else {
                            loading = false;
                            loginError = result.msg;
                        }
                    })
            })
            .catch(err => {
                loading = false;
                console.log('POST error', err.message)
            })
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

{#if loading}
<img src="loading.svg" width="48" class="mx-auto" alt="Loading" />
{/if}
{#if loginError}
<div class="border-red-700 border bg-red-300 text-red-800 p-2 font-bold rounded">{loginError}</div>
{/if}
<p class="w-full sm:w-1/2 mx-auto font-bold antialiased text-4xl">Login</p>
<form class="border-gray-400 border rounded px-8 pt-6 pb-8 my-4 w-full sm:w-1/2 mx-auto" method="POST" on:submit|preventDefault={login} novalidate>
    <div class="mb-4">
        <label for="username">
            Username
        </label>
        <input id="username" type="text" placeholder="Username" bind:value={username} aria-required="true">
        {#if errors.username}
        <p class="text-error">{errors.username}</p>
        {/if}
    </div>
    <div class="mb-6">
        <label for="password">
            Password
        </label>
        <input id="password" type="password" placeholder="Password" bind:value={password} aria-required="true">
        {#if errors.password}
        <p class="text-error">{errors.password}</p>
        {/if}
    </div>
    <div class="flex justify-between">
        <label for="remember_me">
            <input type="checkbox" id="remember_me" bind:checked={remember_me}> Remember Me
        </label>
        <a class="text-link" href=".">Forgot Password?</a>
    </div>
    <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
    </button>
    <p class="text-center my-2">or</p>
    <div class="my-4">
        <button class="bg-red-700 hover:bg-red-600 outline-none text-white px-1 py-2 mb-2 rounded w-full font-semibold font-sans">Login with Google</button>
        <button class="bg-blue-800 hover:bg-blue-700 outline-none text-white px-1 py-2 rounded w-full font-semibold font-sans">Login with Facebook</button>
    </div>
</form>
<p class="text-center">Don't have an account? <a href="register" class="text-link">Create one</a></p>