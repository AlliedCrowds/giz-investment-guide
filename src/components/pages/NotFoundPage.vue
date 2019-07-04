<template>
  <div id="app">
    <home-page-header />
    <div class="homePage">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <div class="homeCont">
              <h1>The page you requested could not be found.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <home-page-footer />
  </div>
</template>
<script>
import HomePageHeader from '@/components/pages/HomePage/HomePageHeader.vue'
import HomePageFooter from '@/components/pages/HomePage/HomePageFooter.vue'

export default {
  name: 'not-found-page',
  components: {
    'home-page-header': HomePageHeader,
    'home-page-footer': HomePageFooter,
  },
}
</script>
