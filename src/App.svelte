<script>
  import {fade} from "svelte/transition";
  import "./firebase";
  import user from "./stores/user-store";
  
  import GoogleLoginBtn from "./components/GoogleLoginButton";
  import PageTitle from "./components/PageTitle";
  import RestaurantsList from "./components/RestaurantsList";

  let isInitializing = true;
  let title = "Loading...";
  
  const updateTitle = () => {
    if ($user) {
      title = "Your Restaurants";
    } else {
      title = "Welcome";
    }
  }

  setTimeout(() => {
    updateTitle();
    isInitializing = false;
  }, 650);

  user.subscribe(() => updateTitle());
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
  <PageTitle>{title}</PageTitle>
  {#if !isInitializing}
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