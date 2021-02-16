<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-card
        ref="form"
        class="mx-auto"
        max-width="400"
      >
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content class="mt-4">
              <div class="my_text_h4 text-center font-weight-bold">
                <span class="blue--text text--lighten-1">m</span><span class="blue--text text--lighten-2">y</span><span class="blue--text text--lighten-1">Vaksin</span>
              </div>

              <v-list-item-title class="my_text_h5 text-center mt-2 mb-6">
                Sign in
              </v-list-item-title>

              <p v-if="loginErr" class="error">
                {{ loginErr }}
              </p>

              <p v-if="signupStatus" class="blue--text text--lighten-1">
                {{ signupStatus }}
              </p>

              <v-text-field
                ref="id"
                v-model="userId"
                outlined
                label="IC Number"
                validate-on-blur
                :rules="idRules"
                required
              />

              <v-text-field
                ref="pwd"
                v-model="userPwd"
                outlined
                label="Password"
                validate-on-blur
                :rules="pwdRules"
                required
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                @input="pwdErrMsg=''"
              />

              <nuxt-link
                to="/"
                class="mynuxtlink"
              >
                Forgot password?
              </nuxt-link>

              <span class=" mt-2">
                No account?
                <nuxt-link
                  to="/signup"
                  class="mynuxtlink"
                >
                  Sign up now!
                </nuxt-link>
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="mr-6 mt-n6 mb-6"
            @click="signin"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  components: {
    //
  },

  data () {
    return {
      userId: '',
      userPwd: '',
      showPwd: false,
      loginErr: null,
      idRules: [
        v => !!v || 'IC is required',
        v => (
          /^[0-9]{6,6}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{4,4}$/.test(v) ||
          /^[0-9]{6,6}[0-9]{2,2}[0-9]{4,4}$/.test(v) ||
          /^[a-zA-Z]{1,2}[0-9]{6,8}[a-zA-Z]{0,1}$/.test(v) ||
          'Invalid IC/Passport'
        )
      ],
      pwdRules: [
        v => !!v || 'Password is required'
      ]
    }
  },

  computed: {
    form () {
      return {
        id: this.userId,
        pwd: this.userPwd
      }
    },

    signupStatus () {
      return this.$store.getters['auth/signupStatus']
    }

  },

  methods: {
    ...mapActions('auth', {
      login: 'login'
    }),

    validateSignInForm () {
      let isValid = true
      const formKeys = Object.keys(this.form)
      for (let i = 0; i < formKeys.length; i++) {
        if (!this.$refs[formKeys[i]].validate(true)) {
          isValid = false
          break
        }
      }
      return isValid
    },

    async signin () {
      if (this.validateSignInForm()) {
        try {
          this.$store.commit('auth/signupStatus', '')
          await this.login({
            userId: this.userId,
            userPwd: this.userPwd
          })
        } catch (error) {
          this.loginErr = 'Unable to login at the moment, please try again later'
        }
      }
    }

  }
}
</script>

<style scoped>

.mynuxtlink {
    text-decoration: none;
}

.my_text_h4 {
   font-size: xx-large;
}

.my_text_h5 {
   font-size: x-large;
}

</style>
