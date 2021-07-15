<script lang="typescript">
  import { navigate } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  import Pricing from './Pricing.svelte'
</script>

<div class="container">

  <div class="top-section">
    <NavBar />
  
    <div class="container title-container">
      <p class="title">
        Create actionable insights from <span class="text">text data</span>
      </p><br />
      <div class="buttons">
        <button class="button is-danger" on:click={() => navigate('/login')}>Try Free</button>
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
    <Pricing />
  </div>
  
  <footer>
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <p class="subtitle is-size-6 is-text-justified">
            <b>Legal disclaimer</b>
          </p>
          </div>
        <div class="column is-four-fifths">
          <p class="subtitle is-size-6 is-text-justified">
            This is a beta version of TextLooker. The owner and developers of the application or this website is not responsible for any malfunction or illegal usage of the application, or the works derived from it.
            We're not responsible for the data that users upload to TextLooker, we only operate on and transform the data that users provide at their discretion.
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>


<style type="scss">
  div.container {
    div.columns {
      margin: 0;
    }
  }
  div.top-section {
    background-color: #fbfcfd;
    padding-left: 12%;
    padding-right: 12%;
  }

  div.title-container {
    height: 43vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    p.title {
      margin: 0 auto;
      color: #3273dc;
      text-transform: capitalize;
      font-size: 70px;
      text-align: center;
      margin-top: 50px;
    }

    @media screen and (max-width: 600px) {
      p.title {
        font-size: 30px;
      }
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
    padding-bottom: 105px;
    background-color: #fbfcfd;
  }

  footer {
    margin:0;
    background-color: #202020;
    padding-top: 40px;

    .column.is-one-fifth {
      width: auto;
    }

    p {
      padding-top: 20px;
      color: white;
      text-align: justify;
      padding-bottom: 40px;
    }

  }
</style>