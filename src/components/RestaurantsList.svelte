<script>
  export let user, selectedId;
  import {slide, fly} from "svelte/transition";
  import store from "../stores/restaurants-store";
  import {db} from "../firebase";

  const deleteRestaurant = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}`)) {
      db.collection("restaurants")
        .doc(id)
        .delete()
        .catch(err => {
          alert(err.message);
        });
    }
  }
</script>

<style>
  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    display: flex;
    align-items: center;

    margin-bottom: 0.5rem;
    font: italic 700 1.6rem serif;
    letter-spacing: .05em;
    -webkit-font-smoothing: antialiased;

    transition: color 0.2s ease-out;
  }

  li.active {
    color: black;
  }

  li > a {
    color: inherit;
  }

  li > a:hover {
    text-decoration: underline;
  }

  .remove {
    display: none;
    padding: 0 0.2em;
    
    background: transparent;
    border: none;
    
    font-size: 2rem;
    line-height: 0;
    
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s ease-out;

  }

  li:hover .remove {
    display: initial;
  }

  .remove:hover {
    opacity: 1;
  }

  .selected-icon {
    opacity: 0;
    width: 0;
    transform: translateX(-1.6rem);
    transition: all 0.2s ease-out;
  }

  li.active .selected-icon {
    opacity: 1;
    width: 1.6rem;
    margin-right: 0.3rem;
    transform: translateX(0);
  }
</style>

{#if $store.isLoading}
  <p>Loading restaurants...</p>
{:else if $store.items.length > 0 }
  <ul>
    {#each $store.items as item (item.id)}
      <li transition:slide class:active={item.id === selectedId}>
        <div class="icon is-large selected-icon">
          <i class="fas fa-hand-point-right"></i>
        </div>
        {#if item.menuUrl}
          <a href={item.menuUrl} target="_blank" rel="noopener nofollow" title="View menu">{item.name}</a>
        {:else}
          {item.name}
        {/if}
        <button 
          type="button" 
          class="remove" 
          title="Remove" 
          on:click={() => {
            deleteRestaurant(item.id, item.name)
          }}
        >&times;</button>
      </li>
    {/each}
  </ul>
{:else}
  <div class="notification is-info">
    Uh-ohh! Your restaurants list is empty. Better add some...
  </div>
{/if}
