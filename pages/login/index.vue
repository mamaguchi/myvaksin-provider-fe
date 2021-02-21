<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-card
        ref="form"
        class="mx-auto elevation-3"
        max-width="400"
      >
        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content class="mt-4">
              <v-row justify="center">
                <div
                  class="ml-1 mt-n1"
                >
                  <v-icon
                    x-large
                    color="pink"
                  >
                    mdi-heart-plus
                  </v-icon>
                  <v-icon
                    class="ml-n2 mt-n2"
                    color="blue lighten-3"
                  >
                    mdi-needle
                  </v-icon>
                </div>
                <div class="text-h4">
                  <span class="blue--text">m</span><span class="blue--text">y</span><span class="blue--text text--darken-2">Vaksin</span>
                </div>
              </v-row>

              <v-list-item-title class="my_text_h5 text-center mt-2 mb-8">
                Sign in
              </v-list-item-title>

              <!-- <span>Auth status: <h3>{{ auth }}</h3></span> -->

              <p v-if="loginErr" class="red--text mb-4">
                {{ loginErr }}
              </p>

              <p v-if="signupStatus" class="blue--text text--lighten-1">
                {{ signupStatus }}
              </p>

              <v-text-field
                id="ident"
                ref="ident"
                v-model="ident"
                outlined
                label="IC/Passport"
                validate-on-blur
                :rules="idRules"
                required
              />

              <v-text-field
                id="pwd"
                ref="pwd"
                v-model="pwd"
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

              <!-- <nuxt-link
                to="/"
                class="mynuxtlink"
              >
                Forgot password?
              </nuxt-link> -->

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

  layout: 'auth',

  data () {
    return {
      ident: '',
      pwd: '',
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
        ident: this.ident,
        pwd: this.pwd
      }
    },

    signupStatus () {
      return this.$store.getters['auth/signupStatus']
    },

    auth () {
      return this.$store.getters['auth/auth']
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
          document.querySelector(`#${formKeys[i]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          break
        }
      }
      return isValid
    },

    async signin () {
      this.loginErr = ''
      if (this.validateSignInForm()) {
        // try {
        //   this.$store.commit('auth/signupStatus', '')
        //   await this.login(this.form)
        // } catch (error) {
        //   this.loginErr = 'Unable to login at the moment, please try again later'
        // }
        this.$store.commit('auth/signupStatus', '')
        this.loginErr = await this.login(this.form)
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
