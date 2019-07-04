<template>
  <div class="container">
    <div class="row">
      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm hidden-md"
        style="padding-top: 30%"
      >
        <router-link
          class="btn big-btn left-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="prev[groupKey]"
        />
      </div>

      <div class="col-xs-12 col-md-10">
        <div class="rightSideInner cms_style">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <tooltip-render
            class="text-center subTitle"
            :text="marked(description)"
          />
          <div class="midConScroll mCustomScrollbar">
            <div class="minConHeight">
              <div class="linksList">
                <div class="linksBox">
                  <ul class="links">
                    <li
                      class="linkItemContainer"
                      v-for="link of links"
                      :key="link.url"
                    >
                      <a
                        class="linkItem"
                        target="_blank"
                        :href="link.url"
                        :title="link.title"
                        >{{ link.title }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <tooltip-render
            class="text-center subTitle"
            style="margin-top: 50px;"
            v-if="conclusion"
            :text="marked(conclusion)"
          />
        </div>
      </div>

      <div
        class="bottom_btn text-center col-md-1 hidden-xs hidden-sm hidden-md"
        style="padding-top: 30%"
      >
        <router-link
          v-if="next[groupKey] !== ''"
          class="btn big-btn right-btn"
          style="padding: 20px; border-radius: 150px;"
          :to="next[groupKey]"
        />
      </div>
    </div>
    <div class="row">
      <div class="bottom_btn text-center hidden-lg hidden-xl">
        <router-link class="btn big-btn back-btn" :to="prev[groupKey]"
          >BACK</router-link
        >
        <router-link
          v-if="next[groupKey] !== ''"
          class="btn big-btn next-btn"
          :to="next[groupKey]"
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
  name: 'links-content',
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
    conclusion: {
      type: String,
      required: false,
    },
    links: {
      type: Array,
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

<style scoped>
@media screen and (min-width: 1000px) {
  .linksList .linksBox li {
    display: inline-block;
  }

  .linkItemContainer {
    width: 50%;
    vertical-align: top;
  }

  .linksBox {
    width: 100%;
  }

  .linkItem {
    margin-left: 10%;
  }
}
</style>
