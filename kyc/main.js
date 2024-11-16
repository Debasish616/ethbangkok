import { createKintoSDK } from 'kinto-web-sdk';

// Initialize Kinto SDK
const appAddress = 'your-app-address'; // Replace with your app address
const kintoSDK = createKintoSDK(appAddress);

// Elements
const connectButton = document.getElementById('connect-wallet');
const sendButton = document.getElementById('send-transaction');
const createButton = document.getElementById('create-wallet');
const accountInfoDiv = document.getElementById('account-info');

// Connect Wallet
connectButton.addEventListener('click', async () => {
    try {
        const accountInfo = await kintoSDK.connect();
        accountInfoDiv.innerHTML = `
            <p>Wallet Address: ${accountInfo.walletAddress}</p>
            <p>App Name: ${accountInfo.app.name}</p>
        `;
        sendButton.disabled = false;
        createButton.disabled = false;
    } catch (error) {
        console.error('Connection failed:', error);
        accountInfoDiv.textContent = 'Failed to connect wallet.';
    }
});

// Send Transaction
sendButton.addEventListener('click', async () => {
    try {
        const transactions = [
            {
                to: '0xRecipientAddress', // Replace with recipient address
                value: '1000000000000000000', // 1 ETH in wei
                data: '0x'
            }
        ];
        const hash = await kintoSDK.sendTransaction(transactions);
        alert(`Transaction successful! Hash: ${hash}`);
    } catch (error) {
        console.error('Transaction failed:', error);
        alert('Transaction failed.');
    }
});

// Create Wallet
createButton.addEventListener('click', async () => {
    try {
        await kintoSDK.createNewWallet();
        alert('New wallet created successfully.');
    } catch (error) {
        console.error('Failed to create wallet:', error);
        alert('Failed to create wallet.');
    }
});
