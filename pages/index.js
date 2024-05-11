import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState("1");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts[0]);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceWei = await atm.getBalance();
      const balanceEth = ethers.utils.formatEther(balanceWei);
      const formattedBalance = parseFloat(balanceEth).toFixed(2);
      setBalance(formattedBalance);
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(ethers.utils.parseEther(amount));
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p className={styles.message}>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button className={styles.button} onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p className={styles.label}>Your Account: {account}</p>
        <p className={styles.label}>Your Balance: {balance}</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={deposit}>Deposit</button>
          <button className={styles.button} onClick={withdraw}>Withdraw</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Virtual Bank Online!</h1>
      </header>
      <main className={styles.container}>
        {initUser()}
      </main>
    </div>
  );
}
