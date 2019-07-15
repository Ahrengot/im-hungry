<script>
  import { slide, fade } from "svelte/transition";
  import { backOut } from "svelte/easing";
  export let user;

  let name = "", menuUrl = "";

  let showForm = false;

  const submit = () => {
    alert("Submit new restaurant: ");
  }
</script>

<style>
  .submit {
    margin-top: 1.5rem;
  }

  .button.is-text {
    text-decoration: none;
  }
</style>


{#if showForm}
<form on:submit|preventDefault={submit} class="box" in:slide={{easing: backOut}} out:slide={{duration: 270}}>
  <h2 class="title is-size-4">Add new restaurant</h2>
  <div class="field">
    <label for="name" class="label">Name</label>
    <input type="text" name="name" class="input" bind:value={name} placeholder="E.g. Taco Bell" required>
  </div>

  <div class="field">
    <label for="url" class="label">Menu card URL (optional)</label>
    <input type="url" name="url" class="input" bind:value={menuUrl}>
  </div>

  <div class="submit field is-grouped">
    <div class="control">
      <button type="submit" class="button is-primary" disabled={name === ""}>Submit</button>
    </div>
    <div class="control">
      <button type="button" class="button is-text" on:click={() => showForm = false}>Cancel</button>
    </div>
  </div>
</form>
{:else}
<button type="button" class="button is-medium" on:click={() => showForm = true} in:fade={{delay: 200, duration: 200}}>
  <div class="icon is-medium">
    <i class="fas fa-hamburger"></i>
  </div>
  <span>Add restaurant</span>
</button>
{/if}