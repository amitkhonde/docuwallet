// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract DocuWallet {
    struct File {
        string name;
        string fileType;
        string ipfsHash;
        string id;
        uint updateTime;
    }

    mapping (address => File[]) userFiles;
    mapping (string => address) fileIdToOwner;

    function getUserFiles() view external returns (File[] memory) {
        return userFiles[msg.sender];
    }

    function addFile(string calldata _name, string calldata _fileType, string calldata _ipfsHash, string calldata _id) external {
        require(!compareStrings(_name, ''), "Data must not be empty");
        require(!compareStrings(_fileType, ''), "Data must not be empty");
        require(!compareStrings(_ipfsHash, ''), "Data must not be empty");
        require(!compareStrings(_id, ''), "Data must not be empty");

        userFiles[msg.sender].push(File(_name, _fileType, _ipfsHash, _id, block.timestamp));
        fileIdToOwner[_id] = msg.sender;
    }

    function getFileDetails(string calldata _id) view external returns(File memory) {
        require(fileIdToOwner[_id] == msg.sender, "Sender not authorized.");
        File[] memory files = userFiles[msg.sender];
        for (uint i = 0; i < files.length; i++) {
            File memory file = files[i];
            if (compareStrings(file.id, _id)) {
                return file;
            }
        }

        return File('', '', '', '', 0);
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
