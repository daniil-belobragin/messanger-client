<template>
  <div class="image-wrapper" v-bind:class="{image16: imageSize === '16px'}">
    <img class="image" :src="imagePath" :alt="imageAlt" />
  </div>
</template>

<script>
export default {
  name: "ImageComponent",

  props: {
    imagePath: {
      required: true
    },
    imageAlt: {
      required: true
    },
    imageSize: {
      default: ""
    }
  }
}
</script>

<style lang="scss">
  .image-wrapper {
    width: 24px;
    height: 24px;
  }

  .image16 {
    width: 20px;
    height: 20px;
  }

  .image {
    width: 100%;
    height: 100%;
  }
</style>