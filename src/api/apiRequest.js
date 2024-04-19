

export const blockChainAPI = {
    getTransactions: async (adress) => {
        const response = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${adress}&startblock=&endblock=99999999&page=1&offset=10&sort=asc&apikey=141CG3KIIJ5YDIBXU12YEQ42CATBHGRJ5W`)
        const data = await response.json()
        return data.result
    },
    getAdressBalance: async () => {
        const response = await fetch('https://api-sepolia.etherscan.io/api?module=account&action=balance&address=0x242c0Cd4b612967668ef7aB57B88Ebbbff4e9Dc6&apikey=141CG3KIIJ5YDIBXU12YEQ42CATBHGRJ5W')
        const data = await response.json()
        return data.result
    }
}

