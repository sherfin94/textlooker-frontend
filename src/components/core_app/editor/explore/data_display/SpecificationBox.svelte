<script lang='typescript'>
  export let analyzedTextCount: number
  export let totalCountQualification: string

  $: {
    console.log(totalCountQualification)
  }
</script>

<div class="container mt-3 p-3">
  <div class="columns">
    <div class="column is-half">
      <div class="subtitle">
        Specifications
      </div>
      <p>
        Analyzed text count: <span class="textCount">
          {
            totalCountQualification === 'gte' ?
              'greater than'
            :
              totalCountQualification === 'lte' ?
                'less than'
              :
                ''
          }
          {analyzedTextCount}
        </span>
      </p>
    </div>
    <div class="column is-half">
      <div class="subtitle">
        Filters
      </div>
    </div>
  </div>
</div>

<style type='scss'>
  span.textCount {
    color: purple;
    font-weight: bold;
  }
</style>