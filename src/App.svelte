<script>
  import {fade} from "svelte/transition";
  import "./firebase";
  import user from "./stores/user-store";
  
  import GoogleLoginBtn from "./components/GoogleLoginButton";
  import PageTitle from "./components/PageTitle";
  import RestaurantsList from "./components/RestaurantsList";

  let isInitializing = true;
  setTimeout(() => {
    isInitializing = false;
  }, 650);
</script>

<style>
  .login {
    margin-top: 5vmin;
    display: flex;
    align-items: center;
  }

  .login > p {
    margin-left: 0.8rem;
  }

</style>

<div class="app">
  <PageTitle />
  {#if isInitializing}
    <div transition:fade>Loading...</div>
  {:else}
    <div transition:fade={{delay: 500}}>
      {#if $user}
        <RestaurantsList user={$user} />
      {:else}
        <div class="login">
          <GoogleLoginBtn />
          <p>Sign in to view restaurants</p>
        </div>
      {/if}
    </div>
  {/if}
</div>