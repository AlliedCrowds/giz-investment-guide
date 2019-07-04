<script>
import tooltipData from '@/assets/data/shared/tooltips.js'
import Vue from 'vue'

export default {
  name: 'render-tooltips',
  props: ['styleType', 'classType', 'text'],
  computed: {
    generateRenderString: function() {
      var components = this.text
      Object.keys(tooltipData).forEach((key) => {
        var re = new RegExp(`(.${key}|${key})(?![a-zA-Z0-9])`, 'i')
        components = components.replace(re, function(match) {
          var str = match
          if (str[0] == ' ') {
            str = str.slice(1)
            return ` |${str}0key|`
          } else if (str.toLowerCase().indexOf(key) > 0) {
            return str
          }
          return `|${str}0key|`
        })
      }, this)

      var retArr = []
      var htmlText = components.split('|')
      htmlText.forEach((item) => {
        if (item.includes('0key')) {
          var word = item.slice(0, -4)
          var key = word
            .replace(',', '')
            .replace('"', '')
            .replace('.', '')
            .replace('-', '')
          key = key.trim().toLowerCase()
          retArr.push(
            `<span style="    text-decoration: underline; color: #00b4e1; cursor:pointer;" v-tooltip="'${
              tooltipData[key]
            }'">${word}</span>`,
          )
        } else {
          retArr.push(item)
        }
      }, this)
      return `<div class="${this.classType}" style="${
        this.styleType
      }">${retArr.join('')}</div>`
    },
  },
  render(h) {
    return h(Vue.compile(this.generateRenderString))
  },
}
</script>
