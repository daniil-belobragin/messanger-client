<template>
  <div class="page-wrapper">
    <div class="wrapper" v-bind:class="{blur: !isJoined}">
      <header-block :is-joined="isJoined" :click-func="redirectToHome" />
      <div class="body-wrapper">
        <ul class="online-users-wrapper">
          <li class="online-users-title">Online users:</li>
          <li class="online-user" v-for="user in users" :key="user.id">
            <user-component :user-name="user.name" :icon-color="user.iconColor" />
          </li>
        </ul>
        <div class="chat-wrapper">
          <ul class="messages-wrapper" v-show="messages.length !== 0">
            <li v-for="message in messages" :key="message.id">
              <message-component :username="message.user[0].name"
                                 :icon-color="message.user[0].iconColor"
                                 :message="message.message" />
            </li>
          </ul>
          <div class="message-input-component">
            <input-component ref="messageInput" input-label="message" :show-label="false"
                             input-type="message" :input-changed="changeMessageContent"
                             :send-message="sendMessage" />
          </div>
        </div>
      </div>
    </div>
    <span class="api-error" v-show="showError"> {{ errorMessage }} </span>
    <div class="join-wrapper" v-show="!isJoined">
      <span class="join-title">You're joining {{ $route.params.rid }} room</span>
      <input-component input-label="Username" :show-label="true"
                       :input-changed="changeUserName" />
      <input-component input-label="Icon color" :show-label="true"
                       :input-changed="changeIconColor"
                       error-label="Value must be hex" :invalid="$v.$invalid" />
      <filled-button button-label="Join" :is-available="isButtonAvailable"
                     button-type="signin" :method="click" />
    </div>
  </div>
</template>

<script>
import {createUser} from "@/api/user";

import {User} from "@/util/user";
import {Message} from "@/util/message";

const io = require('socket.io-client')

import {validationMixin} from "vuelidate"
import {helpers} from "vuelidate/lib/validators"

const hexValidator = helpers.regex('hexValidator', /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)

import InputComponent from "../components/InputComponent";
import HeaderBlock from "../components/HeaderBlock";
import FilledButton from "../components/buttons/FilledButton";
import UserComponent from "@/components/UserComponent";
import MessageComponent from "@/components/MessageComponent";
import {SOCKETS_DEFAULT_URL} from "@/api/base";

export default {
  name: "Room",

  components: {
    MessageComponent,
    UserComponent,
    FilledButton,
    HeaderBlock,
    InputComponent
  },

  mixins: [validationMixin],

  data () {
    return {
      socket: io(SOCKETS_DEFAULT_URL, {
        upgrade: false,
        transports: ['websocket']
      }),
      users: [],
      errorMessage: "Unexpected error occurred",
      showError: false,
      userName: this.isJoined ? this.currentUser.name : "",
      iconColor: this.isJoined ? this.currentUser.iconColor: "0b2239",
      roomName: this.$route.params.rid,
      messages: [],
      messageContent: ""
    }
  },

  computed: {
    isButtonAvailable () {
      return this.userName && !this.$v.$invalid
    },

    socketData () {
      return {
        user: this.currentUser,
        room_id: this.roomName
      }
    },

    isJoined () {
      return this.$store.state.isJoined
    },

    currentUser () {
      return this.$store.state.user
    }
  },

  methods: {
    click () {
      createUser(this.userName, this.iconColor, (response) => {
        this.socketData.user = new User(response.data.id, this.userName, this.iconColor)
        this.socket.emit("join_room", this.socketData)

        this.$store.commit("storeUser",
            new User(response.data.id, this.userName, this.iconColor))
        this.$store.commit("setIsJoined", true)
      }, () => {
        this.$store.commit("setIsJoined", false)
        this.showError = true
      })
    },

    redirectToHome() {
      this.$store.commit("setIsJoined", false)
      this.$router.push({name: "home"})
    },

    onlineUsers (users) {
      this.users = []
      for (let i in users) {
        this.users.push(new User(users[i].user.id, users[i].user.name,
            users[i].user.icon_color))
      }
    },

    messagesHistory (messages) {
      this.messages = []
      for (let i in messages) {
        this.messages.push(new Message(this.users.filter(obj => obj.id === messages[i].owner),
            messages[i].message))
      }
    },

    changeUserName (value) {
      this.userName = value
      this.showError = false
    },

    changeIconColor (value) {
      this.iconColor = value
      this.showError = false
      this.$v.$touch()
    },

    changeMessageContent (value) {
      this.messageContent = value
    },

    handleClose () {
      this.socket.emit("leave_room", this.socketData)
      this.socket.close()
    },

    sendMessage () {
      let data = {message_content: this.messageContent, user: this.currentUser,
        room_id: this.roomName}
      this.socket.emit("send_message", data)
      this.$refs.messageInput.model = ""
    },

    scrollToEnd () {
      let element = document.getElementsByClassName("messages-wrapper")
      element[0].scrollTop = element[0].scrollHeight
    }
  },

  validations: {
    iconColor: {
      hexValidator
    }
  },

  created () {
    if (this.isJoined) {
      this.socket.emit("join_room", this.socketData)
    }

    this.socket.on("user_connected", (data) => {
      this.onlineUsers(data.participants)
      this.messagesHistory(data.messages)
    })

    this.socket.on("user_disconnected", (user_id) => {
      this.users = this.users.filter(obj => obj.id !== user_id)
      if (this.users === []) {
        console.log()
      }
    })

    this.socket.on("creator_disconnected", () => {
      this.redirectToHome()
    })

    this.socket.on("conflict_error", () => {
      this.redirectToHome()
    })

    this.socket.on("not_found_error", () => {
      this.redirectToHome()
    })

    this.socket.on("message_received", (message) => {
      this.messages.push(new Message(this.users.filter(obj => obj.id === message.owner),
      message.message))
      this.scrollToEnd()
    })

    window.setTimeout(() => {
      this.scrollToEnd()
    }, 500)

    window.addEventListener("beforeunload", this.handleClose)
  },

  destroyed() {
    this.handleClose()
  }
}

</script>

<style lang="scss">
  @import "../assets/style/style";

  .join-title {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .body-wrapper {
    padding: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;
  }

  .online-users-wrapper {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    border: 1px solid #666666;
    background: #e6e6e6;
    border-radius: 8px;
    height: 100%;
    box-sizing: border-box;
  }

  .online-users-title {
    font-weight: 600;
  }

  .online-user {
    width: 100%;
  }

  .chat-wrapper {
    width: 70%;
    height: 100%;
    padding: 16px;
    border: 1px solid #666666;
    background: #e6e6e6;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .messages-wrapper {
    height: 100%;
    overflow: scroll;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
  }

  .messages-wrapper:hover {
    overflow-y: scroll;
  }

  .message-input-component {
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-device-width: 280px) and (max-device-width: 425px) {
    .body-wrapper {
      flex-direction: column;
      justify-content: space-between;
    }

    .online-users-wrapper {
      flex-direction: row;
      overflow-y: scroll;
      width: 100%;
      height: 20%;
    }

    .chat-wrapper {
      width: 100%;
      height: 75%;
    }

    .user-wrapper {
      margin-top: 0;
      margin-left: 10px;
    }
  }

</style>