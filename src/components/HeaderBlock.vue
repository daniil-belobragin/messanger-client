<template>
  <div class="header-wrapper">
    <router-link :to="'/'" class="link" :disabled="false" >
      <text-button :with-image="true" :image-path="require('../assets/image/logo.svg')"
                 image-alt="logo" button-label="Chat App" />
    </router-link>
  </div>
</template>

<script>
import TextButton from "@/components/buttons/TextButton";
export default {
  name: "HeaderBlock",
  components: {TextButton}
}
</script>

<style lang="scss">
  @import "../assets/style/style.scss";

  .header-wrapper {
    width: 100%;
    background: #0b2239;
    padding: 20px 30px;
    box-sizing: border-box;
  }

</style>