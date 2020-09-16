<template>
  <div class="page-wrapper">
    <div class="wrapper" v-bind:class="{blur: !isJoined}">
      <header-block />
      <div class="body-wrapper">
      </div>

    </div>
    <div class="join-wrapper" v-show="!isJoined">
      <input-component input-label="Username" :show-label="true" @inputChangedEvent="changeValues" />
      <input-component input-label="Room" :show-label="true" @inputChangedEvent="changeValues" />
      <filled-button button-label="Join" :is-available="isButtonAvailable" button-type="signin" :method="click" />
    </div>
  </div>
</template>

<script>
const io = require("socket.io-client")
import { uuid } from "vue-uuid"


import InputComponent from "@/components/InputComponent";
import FilledButton from "@/components/buttons/FilledButton";
import HeaderBlock from "@/components/HeaderBlock";
export default {
  name: "Home",

  components: {InputComponent, HeaderBlock, FilledButton},

  data () {
    return {
      isJoined: false,
      socket: io("localhost:1488"),
      userName: "",
      roomName: "",
    }
  },

  computed: {
    isButtonAvailable () {
      return this.roomName && this.userName
    },

    user () {
      return {
        uid: uuid.v1(),
        username: this.userName,
        room: this.roomName
      }
    }
  },

  methods: {
    click () {
      if (!this.isButtonAvailable) return

      this.socket.emit('connect_user', this.user)

      this.isJoined = true
    },

    changeValues(data) {

      if (data.target.toLowerCase() === "username") {
        this.userName = data.value
      }
      else if (data.target.toLowerCase() === "room") {
        this.roomName = data.value
      }
    }
  },

  mounted() {
    this.socket.on('user_connected', (user) => {
      user = {}
      user.toString()
    })
  },
}
</script>

<style lang="scss">

  .page-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .blur {
    filter: blur(4px);
  }

  .body-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    flex: 1;
  }

  .join-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #666666;
    border-radius: 6px;
    position: fixed;
    background: white;
    padding: 30px 20px;
  }

</style>