<template>
  <h5 class="text-h5 d-flex align-center mt-2">
    <v-icon class="mr-3" size="32px">
      {{ icon }}
    </v-icon>
    {{ text }}
  </h5>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
