<template>
  <td style="text-align: center;">
    <tr style="display: inline-block; width: 100%; border-bottom:none;">
      <router-link tag="a" :to="{ path: `investor/${providerId}` }">
        <img class="logoImg" :src="provider.logo" alt />
      </router-link>
    </tr>
    <tr
      style="display: inline-block; width: 100%; border-top:none; border-bottom:none"
    >
      <router-link tag="a" :to="{ path: `investor/${providerId}` }">
        <h4 stlye="overflow:hidden">{{ provider.name }}</h4>
        <p>
          {{ urlFormat }}
        </p>
      </router-link>
    </tr>
    <tr style="display: inline-block; width: 100%; border-top:none;">
      <router-link tag="a" :to="{ path: `investor/${providerId}` }">
        <p>
          <strong v-if="avgInvestment">Average Funding Amount:</strong
          >{{ avgInvestment }}
        </p>
      </router-link>
    </tr>
  </td>
</template>

<script>
export default {
  name: 'investor-profile-card',
  props: {
    // key: {
    //   type: Number,
    //   requred: true,
    // },
    provider: {
      type: Object,
      requred: true,
    },
  },
  computed: {
    urlFormat: function() {
      if (this.provider.url.length > 40) {
        return this.provider.url.replace(/(.{40})..+/, '$1...')
      } else {
        return this.provider.url
      }
    },
    avgInvestment: function() {
      if (this.provider.max_investment && this.provider.min_investment) {
        return ` $${this.provider.min_investment}-$${this.provider.max_investment}`
      } else {
        return null
      }
    },
    capitalType: function() {
      var capTypeString = this.provider.capital_type_code.toLowerCase()
      return ` ${capTypeString.charAt(0).toUpperCase() +
        capTypeString.slice(1)}`
    },
    providerId: function() {
      return this.provider.provider_id
        ? this.provider.provider_id
        : this.provider.id
    },
  },
}
</script>
<style scoped>
.logoImg {
  width: 105px;
}
tr {
  padding: 0px !important;
}
tr a {
  display: block !important;
  padding: 15px;
}
</style>
