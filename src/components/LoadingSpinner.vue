<template>
    <div class="col-md-8 mx-auto py-4">
        <div class="spinner"></div>
        <p class="mt-2">Please wait the articles list is loading... </p>
    </div>
</template>

<script>


export default {
  name: 'LoadingSpinner',
  components: {
    
  },

  setup() {


  } 

}
</script>

<style>
.spinner {
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(82, 0, 255, 0) 0deg,
    #5200ff 360deg
  );
  animation: spin 2s infinite linear;
}
.spinner::before {
  content: "";
  border-radius: 50%;
  width: 80%;
  height: 80%;
  background-color: #000;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>