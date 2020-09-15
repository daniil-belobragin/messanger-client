<template>
  <div class="header-wrapper">
    <div class="title-wrapper">
      <image-component :image-path="require('../assets/image/logo.svg')" image-alt="logo" />
      <span class="app-title">Chat App</span>
    </div>
  </div>
</template>

<script>
import ImageComponent from "@/components/ImageComponent";
export default {
  name: "HeaderBlock",
  components: {ImageComponent}
}
</script>

<style scoped>
  .header-wrapper {
    width: 100%;
    background: #0b2239;
    padding: 20px 30px;
    box-sizing: border-box;
  }

  .title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .app-title {
    color: white;
    font-weight: 700;
    margin-left: 12px;
  }
</style>