<template>
  <div class="message-wrapper">
    <div class="icon-wrapper" :style="{background: iconColor}">
    </div>
    <div class="message">
    <span class="username"> {{ username }} </span>
      <div class="message-content">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageComponent",

  props: {
    username: {
      default: ""
    },

    iconColor: {
      default: "#eeeeee"
    },

    message: {
      default: ""
    }
  }
}
</script>

<style lang="scss">
  .message-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .message {
    margin-left: 8px;
    max-width: 80%;
  }

  .message-content {
    margin-left: 8px;
    word-wrap: break-word;
    font-size: 16px;
  }
</style>