import React, { useContext, useEffect } from 'react';

// Contexts
import ContractContext from '../../contexts/ContractContext';

function Dashboard() {
  const { contract } = useContext(ContractContext);

  useEffect(() => {
    async function getFileList() {
      if (contract) {
        try {
          const fileList = await contract.methods.getUserFiles().call();
        } catch (err) {
          console.error(err);
        }
      }
    }

    getFileList();
  }, [contract]);

  return (
    <div>
      Dashboard Page
    </div>
  )
}

export default Dashboard;
