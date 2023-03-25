export const CropSupplyChain = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "farmers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "seed_producers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "add",
        "type": "address"
      },
      {
        "internalType": "enum Entity_Type",
        "name": "entity_type",
        "type": "uint8"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "add",
        "type": "address"
      },
      {
        "internalType": "enum Entity_Type",
        "name": "entity_type",
        "type": "uint8"
      }
    ],
    "name": "deregister",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
