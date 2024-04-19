
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers'
import './App.css';
import { getAccountName, getAllTransactions, getTransactionsThunk, getAccountNameThunk } from './Redux/blockChainReducer';

const shortenAddress = (address) => {
  return `${address.slice(0, 8)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}


function App() {
  const blockChainState = useSelector(state => state.blockChain)
  const dispatch = useDispatch()

  function handleChainChanged() {
    window.location.reload();
    alert('Вы сменили сеть, подключитесь заного')
  }
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('please install Metamask');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // const ens = await provider.lookupAddress(address);
      // console.log('ens - ', ens)
      // const avatar = await provider.getAvatar(ens);
      dispatch(getAccountName(address))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.ethereum
      .on("accountsChanged", connectWallet);
    window.ethereum
      .on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", connectWallet);
      window.ethereum.removeListener("chainChanged", handleChainChanged)
    }

  }, [])
  return (
    <div className="App">
      <div className='App-background'>
        <div className='App-background-1'></div>
        <div className='App-background-2'></div>
        <div className='App-background-3'></div>
        <div className='App-background-4'></div>
      </div>
      <header className="App-header">
        <div className="App-header-logo">
          <svg width="149" height="25" viewBox="0 0 149 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6606_7609)">
              <path d="M18.4613 19.8411L12.8993 24.6418C4.75734 24.3186 0 22.3568 0 16.2636H6.20111C6.20111 18.7563 8.28393 19.8872 16.1418 19.8872C16.9939 19.8872 17.7749 19.8872 18.4613 19.8411Z" fill="#092326" />
              <path d="M29.7988 8.53179H23.5977C23.5977 5.94679 20.9468 5.30054 14.4854 5.30054C13.9173 5.30054 13.373 5.30054 12.8996 5.32362L18.367 0.592163C25.5622 1.07685 29.7988 3.43104 29.7988 8.53179Z" fill="#092326" />
              <path d="M24.0469 18.687C24.4492 18.3408 24.6386 17.8792 24.6386 17.3484C24.6386 15.3865 23.2658 15.0634 15.4316 14.6941C4.92282 14.2094 0.733521 12.6169 0.733521 7.33151C0.733521 2.34617 5.75121 0.638229 14.2245 0.522827L7.73936 6.08518C7.14765 6.5237 6.93463 6.93915 6.93463 7.60848C6.93463 9.43182 8.3784 9.75495 15.4079 10.1704C24.9226 10.6782 30.816 11.1859 30.816 17.1406C30.816 23.1184 25.3013 24.5494 17.0884 24.6879" fill="#092326" />
              <path d="M39.2899 5.90048V10.9551H56.5442V16.0558H39.2899V24.3416H33.0888V0.822815H58.6033V5.90048H39.2899Z" fill="#092326" />
              <path d="M70.342 16.2872L61.0877 24.3653H52.5434L66.129 12.5944L52.5434 0.823425H61.0877L70.342 8.90153L74.3892 12.5944" fill="#092326" />
              <path d="M76.6851 10.7011L88.1169 0.822754H79.5727L72.4722 7.00828" fill="#092326" />
              <path d="M72.4483 18.1328L79.5725 24.3645H88.1167L76.6376 14.4399" fill="#092326" />
              <path d="M130.365 16.2872L121.134 24.3653H112.59L126.176 12.5944L112.59 0.823425H121.134L130.365 8.90153L134.436 12.5944" fill="#092326" />
              <path d="M136.685 10.7473L148.164 0.822754H139.62L132.472 7.05443" fill="#092326" />
              <path d="M132.519 18.1791L139.619 24.3646H148.164L136.732 14.4863" fill="#092326" />
              <path d="M115.904 12.5938C115.904 20.6026 110.413 24.3647 104.188 24.3647H86.6733V0.822815H104.188C110.436 0.822815 115.904 4.5849 115.904 12.5938ZM109.703 12.5938C109.703 6.86985 106.531 5.90048 101.845 5.90048H92.8745V19.2871H101.845C106.531 19.2871 109.703 18.3177 109.703 12.5938Z" fill="#092326" />
            </g>
            <defs>
              <clipPath id="clip0_6606_7609">
                <rect width="148.164" height="24.1882" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
          {blockChainState.adress ? (
            <div className="App-header-button-in">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5324 1.46002L13.2749 8.35622L14.8105 4.29206L21.5324 1.46002Z" fill="#E17726" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.48535 1.46002L10.6693 8.42061L9.20731 4.29206L2.48535 1.46002Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.5591 17.45L16.3621 21.2383L21.0666 22.7003L22.4143 17.5328L18.5591 17.45Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1.61133 17.5328L2.95081 22.7003L7.64721 21.2383L5.45827 17.45L1.61133 17.5328Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.3942 11.0503L6.0874 13.2755L10.7429 13.5146L10.5877 7.85968L7.3942 11.0503Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.6233 11.0504L13.3808 7.79535L13.2747 13.5146L17.9301 13.2755L16.6233 11.0504Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.64746 21.2383L10.4652 19.7027L8.03952 17.5695L7.64746 21.2383Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5525 19.7027L16.3621 21.2383L15.9782 17.5695L13.5525 19.7027Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.3621 21.2384L13.5525 19.7029L13.7811 21.7625L13.7566 22.6361L16.3621 21.2384Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.64746 21.2384L10.2611 22.6361L10.2447 21.7625L10.4652 19.7029L7.64746 21.2384Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.3098 16.2087L7.97388 15.4363L9.62371 14.5812L10.3098 16.2087Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7078 16.2087L14.3939 14.5812L16.0519 15.4363L13.7078 16.2087Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.6474 21.2383L8.05581 17.45L5.4585 17.5328L7.6474 21.2383Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.9619 17.45L16.3621 21.2383L18.5592 17.5328L15.9619 17.45Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.9301 13.2755L13.2747 13.5145L13.7075 16.2087L14.3936 14.5811L16.0516 15.4363L17.9301 13.2755Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.97411 15.4363L9.62394 14.5811L10.3101 16.2087L10.7429 13.5145L6.0874 13.2755L7.97411 15.4363Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.0874 13.2755L8.03949 17.5695L7.97411 15.4363L6.0874 13.2755Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.0518 15.4363L15.9783 17.5695L17.9303 13.2755L16.0518 15.4363Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.743 13.5145L10.3101 16.2087L10.8573 19.3901L10.9798 15.1972L10.743 13.5145Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.2749 13.5145L13.0461 15.188L13.1605 19.3901L13.7077 16.2087L13.2749 13.5145Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7076 16.2088L13.1604 19.3902L13.5525 19.7028L15.9782 17.5696L16.0517 15.4363L13.7076 16.2088Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.97388 15.4363L8.03926 17.5696L10.465 19.7028L10.857 19.3902L10.3098 16.2088L7.97388 15.4363Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.7568 22.636L13.7813 21.7625L13.5689 21.5602H10.4489L10.2447 21.7625L10.2611 22.636L7.64746 21.2383L8.5622 22.0843L10.4163 23.5279H13.5934L15.4557 22.0843L16.3622 21.2383L13.7568 22.636Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5525 19.7028L13.1604 19.3902H10.8571L10.4652 19.7028L10.2446 21.7625L10.4488 21.5602H13.5688L13.7812 21.7625L13.5525 19.7028Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21.8834 8.80676L22.5777 5.00009L21.5322 1.46002L13.5525 8.1264L16.6235 11.0503L20.9604 12.4756L21.9161 11.2159L21.4995 10.8756L22.1611 10.1953L21.6547 9.75387L22.3163 9.18377L21.8834 8.80676Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1.43994 5.00009L2.14236 8.80676L1.69314 9.18377L2.36288 9.75387L1.85649 10.1953L2.51806 10.8756L2.10152 11.2159L3.05713 12.4756L7.39414 11.0503L10.4651 8.1264L2.4854 1.46002L1.43994 5.00009Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.9605 12.4755L16.6235 11.0504L17.9303 13.2755L15.9783 17.5695L18.5592 17.5328H22.4143L20.9605 12.4755Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.39397 11.0504L3.05699 12.4755L1.61133 17.5328H5.45827L8.03919 17.5695L6.08717 13.2755L7.39397 11.0504Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.2747 13.5146L13.5524 8.12633L14.8102 4.29205H9.20728L10.465 8.12633L10.7428 13.5146L10.8489 15.2065L10.8571 19.3902H13.1604L13.1685 15.2065L13.2747 13.5146Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <label onClick={connectWallet}>{shortenAddress(blockChainState.adress)}
              </label>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6606_7016)">
                  <path d="M11.7713 10.3854L10.8287 9.44268L11.7713 8.50002C12.019 8.25239 12.2154 7.95841 12.3494 7.63487C12.4834 7.31132 12.5524 6.96455 12.5524 6.61435C12.5524 6.26415 12.4834 5.91738 12.3494 5.59383C12.2154 5.27029 12.019 4.97631 11.7713 4.72868C11.5237 4.48105 11.2297 4.28462 10.9062 4.15061C10.5827 4.01659 10.2359 3.94761 9.88568 3.94761C9.53548 3.94761 9.18871 4.01659 8.86517 4.15061C8.54162 4.28462 8.24765 4.48105 8.00002 4.72868L7.05735 5.67135L6.11468 4.72868L7.05735 3.78602C7.80956 3.04596 8.82372 2.63312 9.87894 2.63742C10.9342 2.64171 11.9449 3.0628 12.6911 3.80896C13.4372 4.55511 13.8583 5.56588 13.8626 6.6211C13.8669 7.67631 13.4541 8.69048 12.714 9.44268L11.7713 10.3854ZM9.88535 12.2713L8.94268 13.214C8.57236 13.5904 8.13118 13.8898 7.64459 14.0948C7.158 14.2999 6.63563 14.4065 6.1076 14.4087C5.57958 14.4108 5.05635 14.3084 4.56811 14.1073C4.07986 13.9063 3.63626 13.6105 3.26289 13.2371C2.88952 12.8638 2.59376 12.4202 2.39269 11.9319C2.19161 11.4437 2.0892 10.9205 2.09135 10.3924C2.0935 9.86441 2.20017 9.34203 2.40522 8.85544C2.61026 8.36885 2.90962 7.92767 3.28602 7.55735L4.22868 6.61468L5.17135 7.55735L4.22868 8.50002C3.98105 8.74765 3.78462 9.04162 3.65061 9.36517C3.51659 9.68871 3.44761 10.0355 3.44761 10.3857C3.44761 10.7359 3.51659 11.0827 3.65061 11.4062C3.78462 11.7297 3.98105 12.0237 4.22868 12.2713C4.47631 12.519 4.77029 12.7154 5.09383 12.8494C5.41738 12.9834 5.76415 13.0524 6.11435 13.0524C6.46455 13.0524 6.81132 12.9834 7.13487 12.8494C7.45841 12.7154 7.75239 12.519 8.00002 12.2713L8.94268 11.3287L9.88535 12.2713ZM9.88535 5.67135L10.8287 6.61468L6.11468 11.328L5.17135 10.3854L9.88535 5.67202V5.67135ZM3.85002 2.02868L5.13802 1.68335L5.82802 4.26002L4.54068 4.60535L3.85002 2.02935V2.02868ZM10.172 12.7407L11.4593 12.3954L12.15 14.9714L10.862 15.3167L10.172 12.7407ZM1.52868 4.35002L4.10468 5.04068L3.75935 6.32802L1.18335 5.63802L1.52868 4.35002ZM12.2407 10.672L14.8167 11.362L14.4714 12.65L11.8954 11.9593L12.2407 10.672Z" fill="#ABB6B7" />
                </g>
                <defs>
                  <clipPath id="clip0_6606_7016">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

          ) : (
            <button className="App-header-button" onClick={connectWallet}>Connect wall</button>
          )}

        </div>
      </header>
      <body className="App-body">
        <div className="App-body-A">
          <div>
            <label className='App-body-A-label'>Place the Order</label>
            <label className='App-body-A-label-limit'>Limit</label>
            <label className='App-body-A-label-market'>Market</label>
          </div>
          <div>
            <button className='App-body-A-button-buy'>Buy</button>
            <button className='App-body-A-button-sell'>Sell</button>
          </div>
          <div>
            <input className='App-body-A-token-A-adress' placeholder='Token A smart contract adress'></input>
            <input className='App-body-A-token-A-amount' placeholder='Token A amount'></input>
          </div>
          <div>
            <input className='App-body-A-token-B-adress' placeholder='Token B smart contract adress'></input>
            <input className='App-body-A-token-B-amount' placeholder='Token B amount'></input>
          </div>
          <div>
            <input className='App-body-A-order-price' placeholder='Expected order price'></input>
          </div>
          <div>
            <button className='App-body-A-button-placeOrder'>Place the order</button></div>
        </div>
        <div className="App-body-B">
          <div><label className='App-body-B-label'>My Orders</label></div>
          <div className='App-body-B-orders'>
            <label>Connect your wallet to start trading</label>
          </div>
        </div>
        <div className="App-body-C">
          <div><label className='App-body-C-label'>Order Book</label></div>
          <div><label className='App-body-C-label-prices'>Choose tokens to see prices</label> </div>
        </div>
      </body>
      <footer className="App-footer">
        <div className="App-footer-info">
          <div>Private polici</div>
          <br></br>
          <div>Terms&Conditions</div>
          <br></br>
          <div>Coockie Policy</div>
        </div>
        <div className="App-footer-logo">
          <svg width="149" height="25" viewBox="0 0 149 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6606_7609)">
              <path d="M18.4613 19.8411L12.8993 24.6418C4.75734 24.3186 0 22.3568 0 16.2636H6.20111C6.20111 18.7563 8.28393 19.8872 16.1418 19.8872C16.9939 19.8872 17.7749 19.8872 18.4613 19.8411Z" fill="#092326" />
              <path d="M29.7988 8.53179H23.5977C23.5977 5.94679 20.9468 5.30054 14.4854 5.30054C13.9173 5.30054 13.373 5.30054 12.8996 5.32362L18.367 0.592163C25.5622 1.07685 29.7988 3.43104 29.7988 8.53179Z" fill="#092326" />
              <path d="M24.0469 18.687C24.4492 18.3408 24.6386 17.8792 24.6386 17.3484C24.6386 15.3865 23.2658 15.0634 15.4316 14.6941C4.92282 14.2094 0.733521 12.6169 0.733521 7.33151C0.733521 2.34617 5.75121 0.638229 14.2245 0.522827L7.73936 6.08518C7.14765 6.5237 6.93463 6.93915 6.93463 7.60848C6.93463 9.43182 8.3784 9.75495 15.4079 10.1704C24.9226 10.6782 30.816 11.1859 30.816 17.1406C30.816 23.1184 25.3013 24.5494 17.0884 24.6879" fill="#092326" />
              <path d="M39.2899 5.90048V10.9551H56.5442V16.0558H39.2899V24.3416H33.0888V0.822815H58.6033V5.90048H39.2899Z" fill="#092326" />
              <path d="M70.342 16.2872L61.0877 24.3653H52.5434L66.129 12.5944L52.5434 0.823425H61.0877L70.342 8.90153L74.3892 12.5944" fill="#092326" />
              <path d="M76.6851 10.7011L88.1169 0.822754H79.5727L72.4722 7.00828" fill="#092326" />
              <path d="M72.4483 18.1328L79.5725 24.3645H88.1167L76.6376 14.4399" fill="#092326" />
              <path d="M130.365 16.2872L121.134 24.3653H112.59L126.176 12.5944L112.59 0.823425H121.134L130.365 8.90153L134.436 12.5944" fill="#092326" />
              <path d="M136.685 10.7473L148.164 0.822754H139.62L132.472 7.05443" fill="#092326" />
              <path d="M132.519 18.1791L139.619 24.3646H148.164L136.732 14.4863" fill="#092326" />
              <path d="M115.904 12.5938C115.904 20.6026 110.413 24.3647 104.188 24.3647H86.6733V0.822815H104.188C110.436 0.822815 115.904 4.5849 115.904 12.5938ZM109.703 12.5938C109.703 6.86985 106.531 5.90048 101.845 5.90048H92.8745V19.2871H101.845C106.531 19.2871 109.703 18.3177 109.703 12.5938Z" fill="#092326" />
            </g>
            <defs>
              <clipPath id="clip0_6606_7609">
                <rect width="148.164" height="24.1882" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="App-footer-social-buttons">
          <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3243_14423)">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12C22 6.477 17.523 2 12 2Z" fill="#ABB6B7" />
            </g>
            <defs>
              <clipPath id="clip0_3243_14423">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>
          <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3243_14426)">
              <path d="M22.1621 5.65593C21.3986 5.99362 20.589 6.2154 19.7601 6.31393C20.6338 5.79136 21.2878 4.96894 21.6001 3.99993C20.7801 4.48793 19.8811 4.82993 18.9441 5.01493C18.3147 4.34151 17.4804 3.89489 16.571 3.74451C15.6616 3.59413 14.728 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0772 6.14972C11.6979 6.98983 11.6068 7.93171 11.8181 8.82893C10.1552 8.74558 8.52838 8.31345 7.04334 7.56059C5.55829 6.80773 4.24818 5.75097 3.19805 4.45893C2.82634 5.09738 2.63101 5.82315 2.63205 6.56193C2.63205 8.01193 3.37005 9.29293 4.49205 10.0429C3.82806 10.022 3.17869 9.84271 2.59805 9.51993V9.57193C2.59825 10.5376 2.93242 11.4735 3.5439 12.221C4.15538 12.9684 5.00653 13.4814 5.95305 13.6729C5.33667 13.84 4.69036 13.8646 4.06305 13.7449C4.32992 14.5762 4.85006 15.3031 5.55064 15.824C6.25123 16.3449 7.09718 16.6337 7.97005 16.6499C7.10253 17.3313 6.10923 17.8349 5.04693 18.1321C3.98464 18.4293 2.87418 18.5142 1.77905 18.3819C3.69075 19.6114 5.91615 20.264 8.18905 20.2619C15.8821 20.2619 20.0891 13.8889 20.0891 8.36193C20.0891 8.18193 20.0841 7.99993 20.0761 7.82193C20.8949 7.23009 21.6017 6.49695 22.1631 5.65693L22.1621 5.65593Z" fill="#ABB6B7" />
            </g>
            <defs>
              <clipPath id="clip0_3243_14426">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>
          <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3243_14429)">
              <path d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z" fill="#ABB6B7" />
            </g>
            <defs>
              <clipPath id="clip0_3243_14429">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>
          <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3243_14432)">
              <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="#ABB6B7" />
            </g>
            <defs>
              <clipPath id="clip0_3243_14432">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>
        </div>
        <div className='App-footer-colontitul'>
          <label>©2022 All rights reserved. Powered by SFXDX</label>
        </div>
      </footer>
    </div>
  );
}

export default App;
