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
                Sign up
              </v-list-item-title>

              <p v-if="signupErr" class="error mb-4">
                {{ signupErr }}
              </p>

              <v-text-field
                ref="id"
                v-model="userId"
                outlined
                label="IC/Passport"
                validate-on-blur
                :rules="idRules"
                required
              />

              <v-text-field
                ref="pwd"
                v-model="userPwd"
                outlined
                label="Password"
                counter
                validate-on-blur
                :rules="pwdRules"
                required
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
              />

              <v-text-field
                ref="name"
                v-model="userName"
                outlined
                label="Name (as in IC)"
                validate-on-blur
                :rules="nameRules"
                required
              />

              <v-text-field
                ref="address"
                v-model="userAddress"
                outlined
                label="Address"
                validate-on-blur
                :rules="addressRules"
                required
              />

              <v-text-field
                ref="telephone"
                v-model="userTelephone"
                outlined
                label="Telephone"
                validate-on-blur
                :rules="telephoneRules"
                required
              />

              <v-text-field
                ref="email"
                v-model="userEmail"
                outlined
                label="Email"
                validate-on-blur
                :rules="emailRules"
                required
              />

              <nuxt-link
                to="/login"
                class="mynuxtlink"
              >
                Sign in instead
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="mr-6 mt-n6 mb-6"
            @click="createAccount()"
          >
            Create account
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
      userName: '',
      userAddress: '',
      userTelephone: '',
      userEmail: '',
      showPwd: false,
      signupErr: null,
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
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Passsword must be at least 8 characters long',
        v => !(/^.*[ ]+.*$/.test(v)) || 'Passsword is not allowed to contain space character'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'Name must contain alphabet characters only'
      ],
      addressRules: [
        v => !!v || 'Address is required'
      ],
      telephoneRules: [
        v => !!v || 'Telephone is required',
        v => !((v.match(/-/g) || []).length > 1) || 'Telephone number can contain only 1 hyphen character',
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_]/g) > -1) || 'Telephone number not allowed to contain space and special characters',
        v => !(v.search(/[a-zA-Z]/g) > -1) || 'Telephone number not allowed to contain alphabet characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) ||
           'Invalid email address'
      ]
    }
  },

  computed: {
    form () {
      return {
        id: this.userId,
        pwd: this.userPwd,
        name: this.userName,
        address: this.userAddress,
        telephone: this.userTelephone,
        email: this.userEmail
      }
    }
  },

  methods: {
    ...mapActions('auth', {
      signup: 'signup'
    }),

    validateSignUpForm () {
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

    async createAccount () {
      if (this.validateSignUpForm()) {
        try {
          const createAccResCode = await this.signup({
            userId: this.userId,
            userPwd: this.userPwd,
            userName: this.userName,
            userAddress: this.userAddress,
            userTelephone: this.userTelephone,
            userEmail: this.userEmail
          })

          if (createAccResCode === 1) {
            this.signupErr = 'This user account already exists, new account not created'
          } else if (createAccResCode === 0) {
            // this.signupErr = 'User account created' //for debugging purpose only
            this.$store.commit('auth/signupStatus', 'User account created')
            this.$router.push('/login')
          }
        } catch (error) {
          // this.signupErr = error //this gives an unfriendly error msg
          this.signupErr = 'Unable to signup at the moment, please try again later'
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
