<script>
  import user from "../stores/user-store";
  import { auth } from "../firebase"
</script>

<style>
  h1.title {
    margin-bottom: 0;
  }

  .level-right > span {
    margin-right: 0.8rem;
  }
</style>

<header class="level">
  <h1 class="level-left title is-size-1">
    <slot>I'm Hungry!</slot>
  </h1>
  {#if $user}
    <div class="level-right">
      <span>Hello, {$user.displayName.split(" ")[0]}!</span>
      <button type="button" class="button is-primary is-rounded" on:click={() => auth.signOut()}>
        <span>Log out</span>
        <span class="icon is-medium">
          <i class="fas fa-unlock-alt"></i>
        </span>
      </button>
    </div>
  {/if}

</header>