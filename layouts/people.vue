<template>
  <v-app>
    <v-main class="grey lighten-4">
      <nuxt />
      <core-footer class="mb-n8" />
    </v-main>
  </v-app>
</template>

<script>
import Footer from '@/components/core/Footer'

export default {
  components: {
    CoreFooter: Footer
  }
}
</script>

<style>

body > div {
    display: none;
}

body > footer#dashboard-core-footer {
    display: none;
}

body > div#__nuxt {
    display: block;
}

</style>
