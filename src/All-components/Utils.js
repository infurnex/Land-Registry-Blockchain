import axios from "axios"
import { ethers } from "ethers"


export const PostRequestLists = (url , data , setlist , setisLogin)=>{
    axios.post(url , data)
    .then((e)=>{
      console.log(e)
      if(e === 'loginError'){
        setisLogin(false)
      }
      else{
        if(e ===[]){
          setlist([])
        }
        else{
         setlist(e)
        }
      }
    })
    .catch((e)=>{console.log(e) ; alert('Something went wrong , try again later')})
}

export const GetRequestLists = async (url , setlist , setisLogin)=>{
    const e = await axios.get(url)
    if(e.data === 'loginError'){
      setisLogin(false)
    }
    else{
      if(e.data===''){
        setlist([])
      }
      else{
       setlist(e.data)
      }
    }
}

export const PostRequestforApproval = (url , data , httpreqfunction, reloadurl , setlist ,setisLogin)=>{
    axios.post(url , data)
    .then((e)=>{
        if(e.data === 'loginError'){
            setisLogin(false)
          }
          else{
            if(e.data.modifiedCount === 1){
                httpreqfunction(reloadurl , setlist , setisLogin)
            }
            else if(e.data.modifiedCount === 0){
              alert('already registered')
            }
            else{
              alert('Approval rejected, try Signing with registered wallet')
            }
        } 
    })
    .catch((e)=>{console.log(e) ; alert('Something went wrong , try again later')})  
}

export const SignMessage = async ()=>{
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try{
        const res = await provider.send("eth_requestAccounts", []);
        console.log(res);
        const signer = provider.getSigner();
        const message = 'Signature';
        const messageHash =  ethers.utils.hashMessage(message)
        const signedMessage = await signer.signMessage(ethers.utils.arrayify(messageHash));
        console.log(signedMessage)
        return signedMessage
      }
      catch(e){
        alert('User Rejected Signing message')
        return null
      }
      
    }
    else{
      alert('install metamask')
    }
  }
