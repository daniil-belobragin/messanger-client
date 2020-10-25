<template>
  <div class="user-wrapper">
    <div class="icon-wrapper" :style="{background: iconColor}">
    </div>
    <div class="username">
      {{ userName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UserComponent",

  props: {
    userName: {
      required: true
    },

    iconColor: {
      required: true
    }
  }
}
</script>

<style>
  .user-wrapper {
    display: flex;
    align-items: center;
    margin-top: 16px;
    width: 100%;
  }

  .username {
    margin-left: 8px;
    font-size: 18px;
    font-weight: 600;
    word-wrap: break-word;
    max-width: 75%;
  }

  .icon-wrapper {
    min-width: 28px;
    height: 28px;
    margin: 0;
    border-radius: 8px;
    border: 2px solid black;
  }

</style>