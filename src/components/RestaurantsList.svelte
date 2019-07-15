<script>
  export let user, items = [];
</script>

{#if items.length > 1}
  <ul>
    <li>Restaurants list not yet implemented</li>
  </ul>
{:else}
  <div class="notification is-info">
    Uh-ohh! Your restaurants list is empty. Better add some...
  </div>
{/if}
