<script>
	let headers = {
		'Content-Type': 'application/json',
		// Authorization: `Bearer ${process.env.BEARER}`
	};
	let method = 'POST';
	let input_prompt = 'Can you improve this?';
	let prompt_text = '';
	let isLoading = false;
	const endpoint = '/api/chatgpt';
	// const endpoint = 'https://api.openai.com/v1/completions';
	let data;
	let posts = [];

	async function handleSubmit() {
		isLoading = true;
		let body = JSON.stringify({
			model: 'text-davinci-003',
			prompt: input_prompt + '\nStatement:' + prompt_text + '\nResult:',
			max_tokens: 2000,
			temperature: 0
		});
		const response = await fetch(endpoint, {
			method: method,
			headers: headers,
			body: body
		});
		data = await response.json();
		isLoading = false;
	}
	function copyToClipboard() {
		navigator.clipboard.writeText(data.choices[0].text);
	}
	function handleClear() {
		prompt_text = '';
	}
</script>

<svelte:head>
	<title>Sound Smarter</title>
	<meta name="description" content="Sound Smarter Powered by ChatGPT" />
</svelte:head>
<div class="container">
<h1>Sound Smarter</h1>
<h2>Powered By OpenAi</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="form-group row">
		<label for="input_prompt">Input Prompt:</label>
		<div class="col-sm-12">
			<input name="input_prompt" class="form-control" bind:value={input_prompt} />
		</div>
	</div>
	<div class="form-group row">
		<label for="prompt">Prompt:</label>
		<div class="col-sm-12">
			<textarea
				name="prompt"
				class="form-control"
				bind:value={prompt_text}
				rows="10"
				placeholder="What can I improve for you?"
			/>
		</div>
	</div>
	<div class="form-group row mt-3">
		<div class="col-sm-6">
			<button class="form-control btn btn-primary" type="submit"> Submit </button>
		</div>
		<div class="col-sm-6">
			<button class="form-control btn btn-primary" on:click={handleClear}>Clear</button>
		</div>
	</div>
</form>

<div class="alert alert-secondary mt-3">
	{#if isLoading}
		<div class="card-text loading"><p>Loading...</p></div>
	{:else if data}
		<p class="card-text">Response: {data.choices[0].text}</p>
	{:else}
		<p class="card-text">Response will appear here!</p>
	{/if}
</div>

<button class="form-control btn btn-primary" on:click={copyToClipboard}>Copy to Clipboard</button>
</div>
<style>
	.loading {
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
