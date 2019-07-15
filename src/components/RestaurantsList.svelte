<script>
  export let user;
  import store from "../stores/restaurants-store";

  store.subscribe(console.log);
</script>

<style>
  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 0.5rem;
    font: italic 700 1.6rem serif;
    letter-spacing: .05em;
    -webkit-font-smoothing: antialiased;
  }

  li > a {
    color: inherit;
  }

  li > a:hover {
    text-decoration: underline;
  }
</style>

{#if $store.isLoading}
  <p>Loading restaurants...</p>
{:else if $store.items.length > 1 }
  <ul>
    {#each $store.items as item (item.id)}
      {#if item.menuUrl}
        <li><a href={item.menuUrl} target="_blank" rel="noopener nofollow">{item.name}</a></li>
      {:else}
        <li>{item.name}</li>
      {/if}
    {/each}
  </ul>
{:else}
  <div class="notification is-info">
    Uh-ohh! Your restaurants list is empty. Better add some...
  </div>
{/if}
