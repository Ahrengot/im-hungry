<script>
  import {fade} from "svelte/transition";
  import "./firebase";
  import user from "./stores/user-store";
  
  import GoogleLoginBtn from "./components/GoogleLoginButton";
  import PageTitle from "./components/PageTitle";

  let isInitializing = true;
  setTimeout(() => {
    isInitializing = false;
  }, 650);
</script>

<div class="app">
  <PageTitle />
  {#if isInitializing}
    <div transition:fade>Loading...</div>
  {:else}
    <div transition:fade={{delay: 500}}>
      {#if $user}
        <h2>Hello user!</h2>
      {:else}
        <div class="box">
          <h3>Sign in to access your personalized recommendations</h3>
          <GoogleLoginBtn />
        </div>
      {/if}
    </div>
  {/if}
</div>