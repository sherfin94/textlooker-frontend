<script lang="typescript">
  import NavBar from './nav_bar/NavBar.svelte'
</script>

<div class="top-section">
  <NavBar />

  <div class="container title-container">
    <p class="title">
      Create actionable insights from <span class="text">text data</span>
    </p><br />
    <div class="buttons">
      <button class="button is-danger">Try Free</button>
    </div>
  </div>
</div>

<div class="container mt-3 illustrations-container">
  <div class="columns">
    <div class="column">
      <img src="/illustrations/text.png" alt="text" />
      <p class="subtitle">Add text</p>
    </div>
    <div class="column">
      <img src="/illustrations/analysis.png" alt="analysis" />
      <p class="subtitle">Drill down and analyze</p>
    </div>
    <div class="column">
      <img src="/illustrations/insight.png" alt="insight" />
      <p class="subtitle">Arrive at valuable insights</p>
    </div>
    <div class="column">
      <img src="/illustrations/publish.png" alt="publish" />
      <p class="subtitle">Share with your clients!</p>
    </div>
  </div>
</div>

<div class="pricing-container">

</div>

<style type="scss">
  div.top-section {
    background-color: #fbfcfd;
    padding-left: 12%;
    padding-right: 12%;
  }

  div.title-container {
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p.title {
      margin: 0 auto;
      color: #3273dc;
      text-transform: capitalize;
      font-size: 70px;
      width: 800px;
      text-align: center;
      margin-top: 50px;
    }

    span.text {
      color: lightseagreen;
    }

    div.buttons {
      margin-top: 20px;

      button.button {
        width: 180px;
        height: 60px;
        font-size: 25px;
        font-weight: bold;
      }
    }
  }

  div.illustrations-container {
    padding-top: 120px;
    padding-bottom: 120px;

    div.column {

      display: flex;
      flex-direction: column;
      align-items: center;

      p.subtitle {
        font-weight: bold;
        text-align: center;
        padding-top: 20px;
      }

      img {
        width: 100px;
        height: 100px;
      }
    }

  }

  div.pricing-container {
    padding-top: 60px;
    padding-bottom: 60px;
    background-color: #fbfcfd;
  }
</style>