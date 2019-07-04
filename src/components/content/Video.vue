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
        <div class="rightSideInner videoPage">
          <h3 class="secTitle text-center">{{ title }}</h3>
          <!-- <div class="subTitle text-center" v-html="marked(description)" /> -->
          <tooltip-render
            classType="subTitle text-center;"
            :text="marked(description)"
          />
          <div class="videosMain midConScroll mCustomScrollbar">
            <div class="minConHeight">
              <div class="videoList">
                <div class="videoBox" v-for="video of videos" :key="video.url">
                  <h3
                    class="videoTitle"
                    style="height: 100px; font-size: 20px;"
                    v-html="video.title"
                  ></h3>
                  <div class="videoIframe" v-if="video.embedable">
                    <iframe
                      width="100%"
                      :src="video.url"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    />
                  </div>
                  <a v-else width="100%" :href="video.url" target="blank">
                    <img :src="video.thumbnailUrl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
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
      <div class="col-12 hidden-lg hidden-xl">
        <div class="bottom_btn text-center">
          <router-link class="btn big-btn back-btn" :to="prev[groupKey]"
            >BACK</router-link
          >
          <router-link class="btn big-btn next-btn" :to="next[groupKey]"
            >NEXT</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import tooltipRender from '@/components/elements/tooltipRender.vue'

export default {
  name: 'videos-content',
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
    videos: {
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
