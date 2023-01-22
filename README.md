<br />
<div align="center">

  <h3 align="center">Criptoarbitraje</h3>

  <p align="center">
    Criptoarbitrage website for technical test
    <br /> 
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a criptoarbitrage website created for a Full Stack Developer test.

This website:

* Obtains prices of three pairs of tokens (USDC/AAVE, USDC/wBTC, USDC/ETH) from Uniswap and Sushiswap DEXes.
* Compares both prices, and checks for a difference of price between both exchanges.
* If there is an arbitrage opportunity, it offers the option to take action with a button.



### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
* ![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

To run this App locally you should follow the next steps:

### Prerequisites

To run this app you need have installed:
* node and npm 


### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/agustinacassi/arbitrage-challenge.git
   ```
2. Install dependencies
    ```sh
    $ npm install
    ```
3. Edit `.env` and define your environments variables  

    `REACT_APP_u_USDC_WBTC `: endpoint to obtain USDC/WBTC price from Uniswap using 1inch API
  
    *To use the api provided for the developer use [https://docs.1inch.io/docs/aggregation-protocol/api/swagger/]*
4. Init the repository
   ```sh
   $ npm run start
   ```


<!-- CONTACT -->
## Contact

María Agustina Cassi - [@agustinacassi](http://linkedin.com/in/agustinacassi)
