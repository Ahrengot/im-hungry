<script>
  import firebase from "firebase/app";
  import { auth } from "../firebase"
  
  // Use device langue for the auth flow
  auth.useDeviceLanguage();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  let isLoading = false;

  const logIn = () => {
    isLoading = true;
    auth.signInWithPopup(provider).catch(err => {
      isLoading = false;
      alert(err.message);
    });
  }
</script>

<button type="button" class="button is-medium is-link" class:is-loading={isLoading} on:click={logIn}>
  <span class="icon is-medium">
    <i class="fab fa-google" />
  </span>
  <span>Sign in with Google</span>
</button>