<template>
  <div class="wrapper">
    <div class="header-wrapper">

    </div>
    <div class="body-wrapper">

    </div>
  </div>
</template>

<script>
export default {
name: "Test"
}
</script>

<style scoped>

  .wrapper {
    width: 100%;
    height: 100vh;
    border: 2px solid green;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .header-wrapper {
    width: 100%;
    height: 200px;
    border: 2px solid deepskyblue;
    box-sizing: border-box;
  }

  .body-wrapper {
    height: 100%;
    width: 100%;
    border: 2px solid crimson;
    box-sizing: border-box;
    flex: 1;
  }

</style>