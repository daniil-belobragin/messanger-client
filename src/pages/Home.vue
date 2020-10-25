<template>
  <div class="page-wrapper">
    <div class="wrapper" v-bind:class="{blur: !isJoined}">
      <header-block :is-joined="isJoined" />
      <div class="body-wrapper">
      </div>
    </div>
    <span class="api-error" v-show="showError"> {{ errorMessage }} </span>
    <div class="join-wrapper" v-show="!isJoined">
      <input-component input-label="Username" :show-label="true" :input-changed="changeUserName" />
      <input-component input-label="Room" :show-label="true" :input-changed="changeRoomName" />
      <input-component input-label="Icon color" error-label="Value must be hex" :invalid="$v.$invalid"
                       :show-label="true" :input-changed="changeIconColor" />
      <filled-button button-label="Join" :is-available="isButtonAvailable" button-type="signin" :method="click" />
    </div>
  </div>
</template>

<script>
import {createUser} from "@/api/user";
import {createRoom} from "@/api/room";

import {validationMixin} from "vuelidate"
import {helpers} from "vuelidate/lib/validators"

const hexValidator = helpers.regex('hexValidator', /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)

import InputComponent from "../components/InputComponent";
import FilledButton from "../components/buttons/FilledButton";
import HeaderBlock from "../components/HeaderBlock";
import {User} from "@/util/user";

export default {
  name: "Home",

  components: {
    InputComponent,
    HeaderBlock,
    FilledButton
  },

  mixins: [validationMixin],

  data () {
    return {
      roomName: "",
      userName: "",
      iconColor: "0b2239",
      showError: false,
      errorMessage: "Unexpected error occurred"
    }
  },

  computed: {
    isButtonAvailable () {
      return this.roomName && this.userName && !this.$v.$invalid
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
        this.$store.commit("storeUser",
            new User(response.data.id, this.userName, this.iconColor))
        this.userCreated()
      }, (error) => {
        this.handleError(error)
        this.showError = true
      })
    },

    userCreated() {
      createRoom(this.roomName, this.currentUser.id, () => {
        this.redirectToRoom()
      }, (error) => {
        if (error.code === 409) {
          this.redirectToRoom()
        }
      })
    },

    redirectToRoom() {
      this.$store.commit("setIsJoined", true)
      this.$router.push({
        name: "room",
        params: {
          rid: this.roomName
        }
      })
    },

    handleError(error) {
      switch (true) {
        case error.code === 404 || error.code === 409:
          this.errorMessage = error.data.pointer.charAt(0).toUpperCase() +
              error.data.pointer.slice(1) + " " + error.data.message
          break
        case !error.executed:
          this.errorMessage = "Service unavailable"
          break
      }
    },

    changeUserName(value) {
      this.userName = value
      this.showError = false
    },

    changeRoomName(value) {
      this.roomName = value
      this.showError = false
    },

    changeIconColor(value) {
      this.iconColor = value
      this.showError = false
      this.$v.$touch()
    }
  },

  validations: {
    iconColor: {
      hexValidator
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/style/style";

  .api-error {
    width: 100%;
    text-align: center;
    font-size: 22px;
    color: crimson;
    position: fixed;
    top: 100px
  }

</style>