<template>
  <button class="filled-button" v-on:click="method">
    <span> {{ buttonTitle }} </span>
  </button>
</template>

<script>
const io = require('socket.io-client');

export default {

  name: "FilledButton",

  data () {
    return {
      socket: io("http://localhost:1488"),
      user: {
        username: "Daniil",
        photo: null,
      }
    }
  },

  props: {
    buttonTitle: {
      required: true
    },
    method: {
    }
  },

  methods: {
    socketConnect () {
    }
  },

  mounted() {
    this.socket.on('customEmit', (msg) => {
      console.log('custom')
      console.log(msg)
    })

    this.socket.emit('connected_user', this.user)
  }
}
</script>

<style scoped>
  .filled-button {
    border: none;
    background: #48d294;
    color: black;
    outline: none;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  .filled-button:hover {
    filter: brightness(95%);
  }
</style>