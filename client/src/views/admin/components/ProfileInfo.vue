<template>
  <v-card class="spaced">
    <v-card-title class="title  u-flex  u-flex--center ">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-subtitle class="title  u-flex  u-flex--center ">
      <h4>{{ subtitle }}</h4>
    </v-card-subtitle>

    <v-card-text>
      <v-card
        v-for="groupInfo of profileInfo"
        :key="groupInfo[0][1]"
        class="spaced"
      >
        <div
          v-for="([groupTitle, value]) of groupInfo"
          :key="groupTitle"
        >
          <div class="u-flex  u-flex--v-center">
            <strong class="label">{{ groupTitle }}&nbsp;:</strong>

            <span
              class="value"
              v-html="value"
            />
          </div>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    profileInfo: {
      type: Array,
      default () {},
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
p {
  display: flex;
  color: black;
}

.title {
  margin: auto;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-size: 1 rem;
  text-transform: uppercase;
  font-weight: 600;
}

.spaced {
  padding: 1em;
  margin: 0.5em 0;
}

.label {
  line-height: 1.5em;
  flex-basis: 15rem;
}

.value {
  flex-shrink: 1;
}
</style>
