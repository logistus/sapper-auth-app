<script>
    let errors = {}, loading = false, regDone = false, regError = "", username="", email="", password="", confirmPassword="";
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function checkForm() {
        if (username === "") {
            errors.username = "Username is required";
        } else {
            errors.username = "";
            delete errors.username;
        }

        if (email === "") {
            errors.email = "E-Mail address is required";
        } else if (!emailRegExp.test(email)) {
            errors.email = "Invalid email address";
        } else {
            errors.email = "";
            delete errors.email;
        }

        if (password === "") {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be minimum 6 characters";
        } else {
            errors.password = "";
            delete errors.password;
        }

        if (confirmPassword === "") {
            errors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        } else {
            errors.confirmPassword = "";
            delete errors.confirmPassword;
        }
    }

    async function submitForm() {

        checkForm();
        
        if (Object.keys(errors).length === 0) {
            loading = true;
            regError = "";
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': username, 'email':  email, 'password': confirmPassword})
            })
            .then(r => {
                r.json()
                    .then(function(result) {
                        if (result.msg === 1) {
                            loading = false;
                            regDone = true;
                            regError = "";
                            username="", email="", password="", confirmPassword="";
                        } else {
                            loading = false;
                            regError = result.msg;

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
    <title>Register</title>
</svelte:head>

{#if regDone}
<div class="border-green-700 border bg-green-300 text-green-800 p-2 font-bold rounded">Your account has been created.</div>
{/if}
{#if regError}
<div class="border-red-700 border bg-red-300 text-red-800 p-2 font-bold rounded">{regError}</div>
{/if}
{#if loading}
<img src="loading.svg" width="48" class="mx-auto" alt="Loading" />
{/if}
{#if !regDone}
<div>
    <p class="w-full sm:w-1/2 mx-auto font-bold antialiased text-4xl">Register</p>
    <form class="border-gray-400 border rounded px-8 pt-6 pb-8 my-4 w-full sm:w-1/2 mx-auto" method="POST" id="form" on:submit|preventDefault={submitForm} novalidate>
        <div class="mb-4">
            <label for="username">
                Username
            </label>
            <input id="username" type="text" bind:value={username} placeholder="Username" aria-required="true" class:input-has-error={errors.username}>
            {#if errors.username}
            <p class="text-error">{errors.username}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label for="email">
                Email
            </label>
            <input id="email" type="email" bind:value={email} placeholder="E-Mail" aria-required="true" class:input-has-error={errors.email}>
            {#if errors.email}
            <p class="text-error">{errors.email}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label for="password">
                Password
            </label>
            <input id="password" type="password" bind:value={password} placeholder="Password" aria-required="true" class:input-has-error={errors.password}>
            {#if errors.password}
            <p class="text-error">{errors.password}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label for="password-confirm">
                Confirm Password
            </label>
            <input id="password-confirm" type="password" bind:value={confirmPassword} aria-required="true" placeholder="Confirm Password" class:input-has-error={errors.confirmPassword}>
            {#if errors.confirmPassword}
            <p class="text-error">{errors.confirmPassword}</p>
            {/if}
        </div>
        <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
        </button>
        <p class="text-center my-2">or</p>
        <div class="my-4">
            <button class="bg-red-700 hover:bg-red-600 outline-none text-white px-1 py-2 mb-2 rounded w-full font-semibold font-sans">Register with Google</button>
            <button class="bg-blue-800 hover:bg-blue-700 outline-none text-white px-1 py-2 rounded w-full font-semibold font-sans">Register with Facebook</button>
        </div>
    </form>
    <p class="text-center">Already have an account? <a href="login" class="text-link">Login now</a></p>
</div>
{/if}