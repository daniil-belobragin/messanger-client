<template>
  <button class="button-wrapper">
    <image-component v-show="withImage" :image-path="imagePath" :image-alt="imageAlt" />
    <span class="label"> {{ buttonLabel }} </span>
  </button>
</template>

<script>
import ImageComponent from "@/components/ImageComponent";
export default {
  name: "TextButton",
  components: {ImageComponent},
  props: {
    buttonLabel: {
      required: true
    },
    withImage: {
      default: false
    },
    imageAlt: {
    },
    imagePath: {
    }
  }
}
</script>

<style lang="scss">

  .button-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }

  .label {
    color: white;
    font-weight: 700;
    margin-left: 12px;
    font-size: 20px;
  }
</style>