<style>
  .submit {
    margin-top: 1.5rem;
  }

  .button.is-text {
    text-decoration: none;
  }

  .help {
    font-size: 1rem;
  }
</style>

<script>
  import { slide, fade } from "svelte/transition";
  import { db } from "../firebase";
  export let user;

  let name = "", menuUrl = "", isSubmitting = false, error = null;

  let showForm = false;

  const submitForm = async () => {
    error = null;
    isSubmitting = true;

    try {
      await db.collection("restaurants").add({
        name,
        menuUrl,
        authorId: user.uid
      });

      isSubmitting = false;
      name = menuUrl = "";
    } catch(err) {
      isSubmitting = false;
      error = err.message;
    }
  }
</script>

{#if showForm}
<form on:submit|preventDefault={submitForm} class="box" in:slide out:slide={{duration: 270}}>
  <fieldset disabled={isSubmitting}>
    <h2 class="title is-size-4">Add new restaurant</h2>
    <div class="field">
      <label for="name" class="label">Name</label>
      <input type="text" name="name" class="input" bind:value={name} placeholder="E.g. Taco Bell" required>
    </div>

    <div class="field">
      <label for="url" class="label">Menu card (optional)</label>
      <input type="url" name="url" class="input" bind:value={menuUrl} placeholder="E.g. https://some.website/menucard.pdf">
    </div>

    <div class="submit field is-grouped">
      <div class="control">
        <button type="submit" class="button is-primary" class:is-loading={isSubmitting} disabled={name === ""}>Submit</button>
      </div>
      <div class="control">
        <button type="button" class="button is-text" on:click={() => showForm = false}>Cancel</button>
      </div>
    </div>
    {#if error}
      <div class="help is-danger" transition:slide>{error}</div>
    {/if}
  </fieldset>
</form>
{:else}
<button type="button" class="button is-medium" on:click={() => showForm = true} in:fade={{delay: 200, duration: 200}}>
  <div class="icon is-medium">
    <i class="fas fa-hamburger"></i>
  </div>
  <span>Add restaurant</span>
</button>
{/if}