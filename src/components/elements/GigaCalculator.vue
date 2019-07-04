<template>
  <div data-tool="/calculators/dcf-calculator.php">
    <div class="gigacalctitle">Discounted Cash Flow Calculator</div>
    <div class="gigacalcfooter">
      <a href="https://www.gigacalculator.com/calculators/dcf-calculator.php"
        >Discounted Cash Flow Calculator</a
      >
      by
      <a class="gigacalclink" href="https://www.gigacalculator.com/"
        >Gigacalculator.com</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'giga-calculator',
  created() {
    let gigacalc = document.createElement('script')
    gigacalc.setAttribute('src', 'https://cdn.gigacalculator.com/embed.min.js')
    document.head.appendChild(gigacalc)
  },
}
</script>
