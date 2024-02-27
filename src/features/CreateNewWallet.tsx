import { Wallet as WalletType } from "@/constants/types/wallet";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

// Contract ABI
const cabi = [
  {
    "type": "function",
    "name": "createBackpack",
    "inputs": [
      {
        "name": "quantity",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  }
];

const contractAddress = "0xE15c65F038782314C803B94f0813Abc853feC2B0";

export default function CreateNewWallet({
  addWallet
}: {
  addWallet: (wallet: WalletType) => void
}) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      requestAccount();
    } else {
      console.error("MetaMask is not installed!");
    }
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const createNewWallet = async () => {
    if (!window.ethereum) {
      console.error("Ethereum object doesn't exist!");
      return;
    }

    setIsButtonLoading(true);

    try {
      // Correctly initialize the provider by wrapping window.ethereum
      const provider = ethers.getDefaultProvider();
      
      // Obtain the signer from the provider
      // const signer = provider.getSigner();

      // Now, create the contract instance
      // documentation says signerOrProvider so here we pass provider
      const contract = new ethers.Contract(contractAddress, cabi, provider);


      const transaction = await contract.createBackpack(1);
      await transaction.wait();

      // Here, you should handle the successful transaction
      // For example, updating the state or UI based on the transaction result
      const wallet = {}; // This should be replaced with actual wallet handling logic
      addWallet(wallet);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsButtonLoading(false);
      closeModal();
    }
  };

  const closeModal = () => {
    (document.getElementById('close-btn') as HTMLDialogElement)?.click();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}>Create New Wallet</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-background flex flex-col items-center gap-5">
          <p className="text-lg">
            Creating a wallet involves minting a Michi NFT and registering a wallet that is owned by the NFT. Once minted, the wallet will show up on your dashboard.
          </p>
          <button className="btn" onClick={createNewWallet} disabled={isButtonLoading}>
            {isButtonLoading ? <span className="loading loading-spinner"></span> : "Create New Wallet"}
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button id="close-btn">close</button>
        </form>
      </dialog>
    </>
  );
}
