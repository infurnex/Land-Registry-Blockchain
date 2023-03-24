import axios from "axios";
import { ethers } from "ethers";
const provider =  new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract_address = '0x9BF0f231E7d684f0F6249D959a09cAa32937150D'
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
        "name": "state",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "postNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "subDistrict",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "longitute",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "latitute",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imgUrl",
        "type": "string"
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
      }
    ],
    "name": "updateLandNFTimg",
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
    "name": "checkIDAvailability",
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
        "internalType": "address",
        "name": "claimedOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "landid",
        "type": "uint256"
      }
    ],
    "name": "checkOwner",
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
            "internalType": "uint256",
            "name": "_landId",
            "type": "uint256"
          },
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
            "name": "_state",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_postalNumber",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_district",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_subDistrict",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_longitute",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_latitute",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_imageUrl",
            "type": "string"
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
// const iface = new ethers.utils.Interface(abi);
const contract = new ethers.Contract(contract_address,abi,provider );
const usecontract = contract.connect(signer);

export async function test(){
  // const tryy = await provider.send("eth_requestAccounts", []);
  // console.log('hi')
  // console.log(signer);
  // console.log(tryy)

}

export async function getAddress(){
  const Address = await provider.send("eth_requestAccounts", []);
  return Address;
}

export async function RetrieveData(landId){
  const data = await usecontract.ViewLandnft(landId);
  return(data);
}

export async function CreateLandNft(){
  const tx = await usecontract._mintLandnft(256,"0xF1f58A647883bC6Fc6C63f178541a54A0DdD47cd",1255,'vellachery chennai','Tamil Nadu',600036,'noidea', 'noidea','11.1111','8.120',"https://ipfs.io/ipfs/QmarSHHcTj5zdMFYJMMEKmK2XsksMW5nasBt6PMrkyzjGw?filename=dummy3.png");
  console.log(tx.hash)
}

export async function CheckOwnership(Owner , landid){
  const res = await usecontract.checkOwner(Owner,landid);
  return res;
}

export async function postOwnership(Owner , landid){
  const res = await axios.post('/postOwnership',{_Owner : Owner , _LandId: landid})
  console.log(res.data);
  return res.data;
}

export async function GetOwnership(Owner){
  const res = await axios.post('/getOwnership', {_Owner : Owner});
  return res.data;
}

export async function setlandonSale(){
  const res = await axios.post('/SetOnSale' , {Name : 'setlandonsale'});
  return res.data;
}

export async function getlandonSale(){
  const res = await axios.post('/GetLandOnSale',{Name : 'getmesellers'})
  return res.data;
}








//emergency search
// const user = '0xE1AA703F275D260fD9bD0CC93fb0A76c2Bfe1f9B';
// const blocknumber = 2470200
// export async function retiebe(){
//     for(let i = 0; i<100;i++){
//         const txs = (await provider.getBlockWithTransactions(blocknumber + i)).transactions;
//         for(let i = 0; i<txs.length ;i++){
//             if(txs[i].to === contract_address){
//                 const hash = txs[i].hash;
//                 console.log('found and transection hash'+" "+hash);
//                 break
//             }
//             else{
//                 continue;
//             }
//         console.log('searching...')

//     }
// //     const end = Date.now() - start;
//     console.log('executionTime'+" "+end);
    
    
// }
// }