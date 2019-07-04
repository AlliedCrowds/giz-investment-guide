<template>
  <div class="container">
    <div class="row">
      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          class="btn big-btn left-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="prev[groupKey]"
        />
      </div>

      <div class="col-xs-12 col-md-10">
        <div class="rightSideInner text-center">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <div class="midConScroll mCustomScrollbar minConHeight">
            <tooltip-render
              :text="marked(description)"
              :class="{
                'col-sm-6': $route.path.includes('discounted-cash-flow'),
              }"
              style="background-position: center; background-repeat: no-repeat; background-size: cover;"
            />
            <giga-calculator
              v-if="$route.path.includes('discounted-cash-flow')"
              class="gigacalculator"
              :class="{
                'col-sm-6': $route.path.includes('discounted-cash-flow'),
              }"
            />
          </div>
        </div>
      </div>

      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          class="btn big-btn right-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="next[groupKey]"
        />
      </div>
    </div>
    <div class="row">
      <div class="bottom_btn text-center col-12 hidden-md hidden-lg hidden-xl">
        <router-link class="btn big-btn back-btn" :to="prev[groupKey]"
          >BACK</router-link
        >
        <router-link class="btn big-btn next-btn" :to="next[groupKey]"
          >NEXT</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import Gigacalculator from '@/components/elements/GigaCalculator.vue'
import marked from 'marked'
import tooltipRender from '@/components/elements/tooltipRender.vue'

export default {
  name: 'text-content',
  components: {
    'giga-calculator': Gigacalculator,
    'tooltip-render': tooltipRender,
  },
  props: {
    prev: {
      type: Object,
      required: true,
    },
    next: {
      type: Object,
      required: true,
    },
    groupKey: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    backgroundImageName: {
      type: String,
      required: false,
    },
  },
  computed: {
    backGroundImageStyleObject() {
      if (this.backgroundImageName) {
        return (
          'background-image: url("' +
          require(`@assets/images/${this.backgroundImageName}`) +
          '");'
        )
      } else {
        return ''
      }
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
  },
}
</script>
<style scoped>
.gigacalculator {
  margin: auto;
}
</style>
