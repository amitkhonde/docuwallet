import React, { useState, useEffect, createContext } from "react";

import getWeb3 from "./utils/getWeb3";

import DocuWallet from "./contracts/DocuWallet.json";

// Pages
import Dashboard from './pages/Dashboard';

// Components
import Loader from "./components/Loader";
import PropertyControlledComponent from "./components/PropertyControlledComponent";
import Error from './components/Error';

// Contexts
import ContractContext from './contexts/ContractContext';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [isWeb3Error, setIsWeb3Error] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function initApp() {
      try {
        setIsLoading(true);
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const accountsFromWeb3 = await web3Instance.eth.getAccounts();
        setAccounts(accountsFromWeb3);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = DocuWallet.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          DocuWallet.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
        setIsWeb3Error(false);
      } catch (err) {
        console.error(err);
        setIsWeb3Error(true);
      } finally {
        setIsLoading(false);
      }
    }

    initApp();
  }, []);

  return (
    <ContractContext.Provider value={{ contract }}>
      <div className="app-container background-primary">
        <PropertyControlledComponent controllerProperty={isWeb3Error}>
          <Error message="There was an error connecting to web3. Please check if you are connected to Metamask or using the correct browser!" />
        </PropertyControlledComponent>
        <PropertyControlledComponent controllerProperty={!isWeb3Error}>
          <PropertyControlledComponent controllerProperty={isLoading}>
            <Loader containerClassName="global-loader-container" />
          </PropertyControlledComponent>
          <Dashboard />
        </PropertyControlledComponent>
      </div>
    </ContractContext.Provider>
  );
}

export default App;
