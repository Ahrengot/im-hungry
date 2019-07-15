<script>
  import {beforeUpdate, onMount} from "svelte"
  import {spring} from "svelte/motion";
  import {fade} from "svelte/transition";
  import "./firebase";
  import user from "./stores/user-store";
  import restaurants from "./stores/restaurants-store";
  
  import GoogleLoginBtn from "./components/GoogleLoginButton";
  import PageTitle from "./components/PageTitle";
  import RestaurantsList from "./components/RestaurantsList";
  import RestaurantForm from "./components/RestaurantForm";

  let isInitializing = true;
  let title = "Loading...";
  let isFormOpen = false;
  let didPick = false;
  let numPicks = 0;
  let pickBtnMsg = "Pick something, I'm hungry!";
  let selectedRestaurantId = null;

  const retryMessages = [
    "Nope, try again!",
    "Try again...",
    "Not that one",
    "Not feeling it",
    "Hmm... no...",
    "Getting closer. Try again.",
    "Getting closer. Try again.",
    "Nah, had that yesterday",
    "Suggest something else",
    "One. More. Suggestion.",
  ]

  const agressiveRetryMessages = [
    "Dude, come on!",
    "Getting impatient!",
  ]

  const veryAgressiveRetryMessages = [
    "This app is complete garbage!",
    "Why did I even sign up for this?!",
    "I'm not even sure I'm hungry anymore",
  ]

  const pickRandom = (list, lastValue) => {
    const newValue = list[~~(Math.random() * list.length)];
    if (newValue === lastValue) {
      return pickRandom(list, lastValue);
    } else {
      return newValue;
    }
  }

  const pickRandomId = (list, lastValue) => {
    const obj = pickRandom(list);
    if (obj.id === lastValue) {
      return pickRandomId(list, lastValue);
    } else {
      return obj.id;
    }
  }

  const scaleX = spring({val: 1}, {
    stiffness: 0.08,
    damping: 0.3,
  });

  const scaleY = spring({val: 1}, {
    stiffness: 0.08,
    damping: 0.3,
  });

  onMount(() => {
    setTimeout(() => {
      isInitializing = false;
    }, 650);
  })

  beforeUpdate(() => {
    if ($user) {
      title = "Your eateries";
    } else if (isInitializing) {
      title = "Loading..."
    } else {
      title = "Welcome";
    }
  });

  const pickRandomRestaurant = () => {
    numPicks++;
    if (numPicks >= 8 && Math.random() > 0.8) {
      pickBtnMsg = pickRandom(veryAgressiveRetryMessages, pickBtnMsg);
    } else if (numPicks >= 3 && Math.random() > 0.4) {
      pickBtnMsg = pickRandom(agressiveRetryMessages, pickBtnMsg);
    } else {
      pickBtnMsg = pickRandom(retryMessages, pickBtnMsg);
    }

    if ($restaurants.items.length > 0) {
      selectedRestaurantId = pickRandomId($restaurants.items, selectedRestaurantId);
    }
  }

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

  section {
    padding: 2.5vmin 0;
  }

  section.is-grouped {
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  section.is-grouped .control {
    margin-bottom: 1rem;
  }

</style>

<div class="app">
  <PageTitle>{title}</PageTitle>
  {#if !isInitializing}
    <div transition:fade={{duration: 220}}>
      {#if $user}
        
        <section>
          <RestaurantsList user={$user} selectedId={selectedRestaurantId} />
        </section>
        
        <section class="field is-grouped">
          <div class="control">
            <button 
              type="button" 
              on:click={pickRandomRestaurant} 
              class="button is-medium"
              on:mousedown={() => {
                scaleY.set({val: $scaleY.val > 0 ? -1 : 1});
                scaleX.set({val: 1.3});
              }}
              on:mouseup={() => {
                scaleX.set({val: 1});
              }}
            >
              <div class="icon is-medium" style={`transform: scale(${$scaleX.val}, ${$scaleY.val});`}>
                <i class="fas fa-random" />
              </div>
              <span>{pickBtnMsg}</span>
            </button>
          </div>
          <div class="control">
            {#if !isFormOpen}
            <button type="button" class="button is-medium" on:click={() => isFormOpen = true} in:fade={{delay: 200, duration: 200}}>
              <div class="icon">
                <i class="fas fa-plus" />
              </div>
              <span>Add restaurant</span>
            </button>
            {/if}
          </div>
        </section>
        
        <RestaurantForm user={$user} bind:isOpen={isFormOpen} />

      {:else}
        <div class="login">
          <GoogleLoginBtn />
          <p>Sign in to view restaurants</p>
        </div>
      {/if}
    </div>
  {/if}
</div>