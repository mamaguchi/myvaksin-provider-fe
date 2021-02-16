// import qs from 'qs'

const cookies = process.client ? require('js-cookie') : undefined

export default {
  async login (context, formData) {
    // const payload = {}
    // payload.userId = userId
    // payload.userPwd = userPwd
    // const payloadData = qs.stringify(payload)
    // const { data } = await this.$axios.post('http://localhost:8082/public/login', payloadData)

    const { data } = await this.$axios.post('http://localhost:8080/signin', formData)

    cookies.set('auth', data)
    context.commit('auth', data)
    // cookies.set('auth', payload.userId)
    // context.commit('auth', payload.userId)

    // this.$router.push('/clinicadmin')
  },

  logout ({ commit }) {
    cookies.remove('auth')
    commit('auth', null)
  },

  async signup (context, formData) {
    // const payloadData = qs.stringify(formData)
    // const { data } = await this.$axios.post('http://localhost:8082/public/signup', payloadData)
    // return data.createAccResCode

    const { data } = await this.$axios.post('http://localhost:8080/signup', formData)
    // return 0
    return data.signUpRespCode
  }
}
