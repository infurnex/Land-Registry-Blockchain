const ethers = require('ethers');

const contract_address = '0x83C5eD455C65D96f03db5829CDA87A4e9256C987'
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "landID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "Owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "area",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "landAddress",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "LandL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imgUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "landtype",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isrestrict",
        "type": "bool"
      }
    ],
    "name": "_mintLandnft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "soldTo",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "_TransferLand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "subregistrar",
        "type": "address"
      }
    ],
    "name": "Addsubregistrar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "Owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "burn_landnft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "landAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "Landid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "updateLandNFTaddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "imgUrl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "updateLandNFTimg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "Type",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "UpdateLandType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "isrestricted",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "subregistrarID",
        "type": "uint256"
      }
    ],
    "name": "UpdateRestrictions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_Name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      }
    ],
    "name": "checkTranferable",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      }
    ],
    "name": "ViewLandnft",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_Owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_landArea",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_address",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_latitudeandlongitude",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_imageUrl",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_landType",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "_isRestricted",
            "type": "bool"
          }
        ],
        "internalType": "struct LandDNFT.land_dnft",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const provider = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org/");
const contract = new ethers.Contract(contract_address,abi,provider);
const signer = new ethers.Wallet('40eae0ddf700c5166b1488b5b55a5800221b08dbb194ec7a58eaf27c088a3c88' , provider)
const signedcontract =  contract.connect(signer)


module.exports.findLandwithID = async (ID)=>{
  const landid = await signedcontract.ViewLandnft(ID);
  return {_LandId : ID , nft : landid};
}



module.exports.CreateNft = async (landID ,Owner, area , landAddress, state, Landl, imgUrl , landtype , isrestrict)=>{
  const result = await signedcontract._mintLandnft(landID ,Owner, area , landAddress, state, Landl , imgUrl , landtype , isrestrict)
  return result;
}












///////////////////////////////////Middle Ware////////////////////////////////////


//////////////////////////////////Check Signature for wallet registration/////////////////////////////////

module.exports.CheckSignForWalletReg = (req , res , next)=>{
  const message = 'Signature';
  const messageHash =  ethers.utils.hashMessage(message)
  const pubkey = ethers.utils.recoverPublicKey(
    ethers.utils.arrayify(
        ethers.utils.hashMessage(ethers.utils.arrayify(messageHash))
    ),
    req.body.Signature
  )
  const address = ethers.utils.computeAddress(pubkey)
  console.log(address)
  if(address == req.body.WalletAddress){
    console.log('next')
    next()
  }
  else{
    res.send('Wrong Wallet Address')
  }
}

//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////Check Signature///////////////////////////////////
module.exports.GetAddressfromSignature = (Signature)=>{
  const message = 'Signature';
  const messageHash =  ethers.utils.hashMessage(message)
  const pubkey = ethers.utils.recoverPublicKey(
    ethers.utils.arrayify(
        ethers.utils.hashMessage(ethers.utils.arrayify(messageHash))
    ),
    Signature
  )
  const address = ethers.utils.computeAddress(pubkey)
  return address
}

//////////////////////////////////////////////////////////////////////////////////

