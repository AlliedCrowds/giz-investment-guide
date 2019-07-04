<template>
  <div class="container">
    <div class="row">
      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm"
        style="padding-top: 30%"
      >
        <router-link
          v-if="prev[groupKey] !== ''"
          class="btn big-btn left-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="prev[groupKey]"
        />
      </div>

      <div class="col-xs-12 col-md-10 ">
        <div class="rightSideInner">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <div class="midConScroll mCustomScrollbar">
            <div class="minConHeight">
              <p>
                <img
                  class="aligncenter"
                  :src="require(`@assets/images/${imageName}`)"
                  alt
                />
              </p>
              <!-- <div class="text-center" v-html="marked(description)" /> -->
              <div class="text-center">
                <p><tooltip-render :text="description" /></p>
              </div>
            </div>
            <!-- <div class="bottom_btn text-center">
              <router-link
                v-if="prev[groupKey] !== ''"
                class="btn big-btn back-btn"
                :to="prev[groupKey]"
                >BACK</router-link
              >
              <router-link class="btn big-btn next-btn" :to="next[groupKey]"
                >NEXT</router-link
              >
            </div> -->
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
      <div class="bottom_btn text-center hidden-md hidden-lg hidden-xl">
        <router-link
          v-if="prev[groupKey] !== ''"
          class="btn big-btn back-btn"
          :to="prev[groupKey]"
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
import marked from 'marked'
import tooltipRender from '@/components/elements/tooltipRender.vue'

export default {
  name: 'intro-content',
  components: {
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
    imageName: {
      type: String,
      required: true,
    },
  },
  methods: {
    marked(markdown) {
      return marked(markdown)
    },
  },
}
</script>
