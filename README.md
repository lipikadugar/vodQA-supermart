# vodQA-supermart

#### Setting up the Development Enviornment
* Node.js v6+ LTS and npm (comes with Node) https://nodejs.org/en/
* Git https://git-scm.com/
#### Install Truffle:
```
npm install -g truffle
```
#### Verify Truffle Version:
```
truffle version
```
#### Download Ganache
* http://truffleframework.com/ganache
* Double click the icon to launch the application.This will generate a blockchain running locally on port 7545. 
#### Compile the Solidity code
```
truffle compile
```
#### Migrate contracts to Blockchain
```
truffle migrate
```
#### Run the tests
```
truffle test
```
#### Creating a user interface to interact with the smart contract
1. Installing and configuring MetaMask
* Install MetaMask in your browser.
* Click Accept to accept the Privacy Notice.
* Then you'll see the Terms of Use. Read them, scrolling to the bottom, and then click Accept there too.
* Now you'll see the initial MetaMask screen. Click Import Existing DEN.
* In the box marked Wallet Seed, enter the mnemonic that is displayed in Ganache.
```
Warning: Do not use this mnemonic on the main Ethereum network (mainnet). If you send ETH to any account generated from this mnemonic, you will lose it all!
```
* Enter a password below that and click OK.
* Now we need to connect MetaMask to the blockchain created by Ganache. Click the menu that shows "Main Network" and select Custom RPC.
* In the box titled "New RPC URL" enter http://127.0.0.1:7545 and click Save.
* The network name at the top will switch to say "Private Network".
* Click the left-pointing arrow next to "Settings" to close out of the page and return to the Accounts page.
Configuration is now complete.
2. Start the local server
```
npm run dev
```
The dev server will launch and automatically open a new browser tab containing your dapp.
* To use the dapp, click the Buy button on the item of your choice.
* You'll be automatically prompted to approve the transaction by MetaMask. Click Submit to approve the transaction.
* You'll see the button next to the purchased item change to say "Success" and become disabled, just as we specified, because the item has now been purchased. If the button doesn't automatically change to say "Success", refreshing the app in the browser should trigger it.
* And in MetaMask, you'll see the transaction listed
* You'll also see the same transaction listed in Ganache under the "Transactions" section.
### Congratulations.!


