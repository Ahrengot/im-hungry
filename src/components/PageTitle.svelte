<script>
  import user from "../stores/user-store";
</script>

<style>
  h1.title {
    margin-bottom: 0;
  }
</style>

<header class="level">
  <h1 class="level-left title is-size-1">
    <slot>I'm Hungry!</slot>
  </h1>
  {#if $user}
    <div class="level-right">
      <button type="button" class="button is-primary is-rounded">
        <span>Log out</span>
        <span class="icon is-medium">
          <i class="fas fa-unlock-alt"></i>
        </span>
      </button>
    </div>
  {/if}

</header>