<script>
  import {beforeUpdate, onMount} from "svelte"
  import {fade} from "svelte/transition";
  import "./firebase";
  import user from "./stores/user-store";
  
  import GoogleLoginBtn from "./components/GoogleLoginButton";
  import PageTitle from "./components/PageTitle";
  import RestaurantsList from "./components/RestaurantsList";
  import RestaurantForm from "./components/RestaurantForm";

  let isInitializing = true;
  let title = "Loading...";

  onMount(() => {
    setTimeout(() => {
      isInitializing = false;
    }, 650);
  })

  beforeUpdate(() => {
    if ($user) {
      title = "Your restaurants";
    } else if (isInitializing) {
      title = "Loading..."
    } else {
      title = "Welcome";
    }
  });

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
    <div transition:fade={{duration: 220}}>
      {#if $user}
        <RestaurantsList user={$user} />
        <RestaurantForm user={$user} />
      {:else}
        <div class="login">
          <GoogleLoginBtn />
          <p>Sign in to view restaurants</p>
        </div>
      {/if}
    </div>
  {/if}
</div>