const mongoose  = require('mongoose');
const {GetAddressfromSignature } = require('./Ethers');

const userSchema = new mongoose.Schema({
    Name : {type : String , required : true },
    Email : {type : String , unique : true},
    Phone : {type : Number, unique : true},
    ProfileName : {type : String , unique:true},
    ProfilePassword : {type : String},
    WalletAddress : {type: String},
    Address : {type:String},
})

const OwnerOFLand = new mongoose.Schema({
    _ProfileName : {type : String , require : true},
    _WalletAddress : {type : String , require : true},
    _LandId : {type : Number , require : true , unique : true},
    _isTransfer : {type : Boolean , require : true},
    _TransferTo : {type : String, require : true},
    _TransferValid : {type : Boolean, require : true},
    _TransferAuthority : {type : String , require : true},
    _TransferProfileName : {type : String , require : true}
})

const LandNFTDetails = new mongoose.Schema({
    _ProfileName : {type : String, require : true},
    _LandId  : {type : Number, require : true},
    _WalletAddress  : {type : String, require : true},
    _LandAddress : {type : String, require : true},
    _LandArea  : {type : Number, require : true},
    _LandLatitudeandLongitute : {type : String, require : true},
    _LandImg : {type : String, require : true},
    _LandType : {type : String , require : true},
    _isRestricted : {type : Boolean , require : true},
    _ReviewingAuthorityAddress : {type : String , require : true},
    _isReviewedbyAuthority : {type : Boolean, require : true},
    _ReviewComments : {type : String, require : true},
    _Signature : {type : String , require : true},
    _ValidSignature : {type : Boolean , require : true},
    _isNftCreated : {type : Boolean , require : true},
    _isupdatedArea : {type : Boolean , require : true},
    _isupdatedType : {type : Boolean , require : true},
    _isupdatedAddress: {type : Boolean , require : true},
})


const user = new mongoose.model('user', userSchema);
const Ownership = new mongoose.model('LandOwnership', OwnerOFLand);
const previewLandNFT = new mongoose.model('previewLandNFT' , LandNFTDetails)


///////////////////////////////MiddleWare//////////////////////////////////////////////////////

module.exports.PnWallet = async (req , res , next)=>{
    try{
        const find = await user.findOne({
            ProfileName : req.body._ProfileName,
            WalletAddress : req.body._WalletAddress
        })
        console.log(find)
        if(find.WalletAddress == null){
            res.send('wallet not registered')
        }
        else{
            next();
        }
    }
    catch(e){
        res.send("failed " + e)
    }
}

module.exports.PnPp = async (req , res, next)=>{
    const data = await user.findOne({
        ProfileName : req.body.ProfileName,
        ProfilePassword : req.body.ProfilePassword
    })
    if(data == null){
        res.send('wrong Profile Name or Passward')
    }
    else{
        next()
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////Register users data/////////////////////////////////////////////
module.exports.RegisterUser = async (data) =>{
    data = {...data ,WalletAddress : null , Address : null}
    await user(data).save();
    return "success";
    
}

module.exports.RegisterAddress = async (data) =>{
    const dataa = await  user.findOne({
        ProfileName : data.pn
    })
    if(dataa.Address == null){
        await dataa.updateOne({Address : data.Address})
        return 'Success'
    }
    else{
        return 'Already Registered Address'
    }
}

module.exports.RegisterWallet = async (userr , wallet) =>{
    const data = await user.findOne({
        WalletAddress : wallet,
    })
    if(data == null){
        const dataa = await user.findOne({
            ProfileName : userr,
        })
        if(dataa.WalletAddress == null){
            await dataa.updateOne({WalletAddress : wallet})
            return 'Success'
        }
        else{
            return 'Wallet Already Registered'
        }
    }
    else{
        return 'Wallet Already Registered'
    }
    
}
//////////////////////////////////////////////////////////////////////////////////////





/////////////////////////Login verification of users /////////////////////////////////
module.exports.Login = async (pn , pp) =>{
    const data = await user.findOne({
        ProfileName : pn,
        ProfilePassword : pp,
    })
    return data;
}
//////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////Get my land/////////////////////////////////////////////
module.exports.LandwithPN = async (pn)=>{
    console.log(pn)
    const UserAdd = await user.findOne({ProfileName : pn});
    console.log(UserAdd)
    const data = await Ownership.find({
        _Owner : UserAdd.Address,
    })
    return data;
}
//////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////market land////////////////////////////////////////////
module.exports.market = async ()=>{
    const data = await Ownership.find({
        _isOnSale : true,
    })
    return data;
}
///////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////General Purpose///////////////////////////////////////
module.exports.GetUser = async ( ProfileName ) =>{
    const data = await user.findOne({
        ProfileName : ProfileName
    })
    return data
}
//////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////Set Ownership///////////////////////////////////////


module.exports.setOwnership = async (dataa) =>{
    const data = {...dataa , _isTransfer : false , _TransferTo : null};
    const resp  = await user(data).save();
    console.log(resp);
    return resp
}


////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////Proposed Land NFT//////////////////////////////////

module.exports.PreviewNft = async (profileName , landID ,Owner, area , landAddress, LandType , reviewingAddress)=>{
    const data = {
    _ProfileName : profileName,
    _LandId  : landID,
    _WalletAddress  : Owner,
    _LandAddress : landAddress,
    _LandArea  : area,
    _LandLatitudeandLongitute  : null,
    _LandImg : null,
    _LandType : LandType,
    _isRestricted : null,
    _ReviewingAuthorityAddress : reviewingAddress,
    _isReviewedbyAuthority : null,
    _ReviewComments : null,
    _Signature : null,
    _ValidSignature : null,
    _isNftCreated : false,
    _isupdatedArea : null,
    _isupdatedType : null,
    _isupdatedAddress: null,
    }
    const dataa = await previewLandNFT(data).save();
    return dataa
}

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////Update Preview land/////////////////////////////////////

module.exports.updatePreviewLand = async (Name , wallet , id ,  datatoUpdate , sign)=>{
    const data = await previewLandNFT.findOne({
        _ProfileName : Name,
        _WalletAddress : wallet,
        _LandId : id
    })
    const address = GetAddressfromSignature(sign);
    console.log(address)
    if(address == data._ReviewingAuthorityAddress){
        if(data){
            const update = await data.updateOne(datatoUpdate)
            return update;
        }
        else{
            return 'data not found'
        }
    }
    else{
        return 'Wrong Signature of Authority'
    }
    
}

///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////Get PreviewLandnft////////////////////////////////

module.exports.GetPreviewNft = async (profilename) =>{
    const data = await previewLandNFT.find({
        _ProfileName : profilename,
    })
    console.log(data)
    return data
    
}
//////////////////////////////////////////////////////////////////////////////////


///////////////////////////Get Preview Land (S.R.O)///////////////////////////////

module.exports.GetpreviewNftSRO = async (profilename ,  landid , wallet) =>{
    const data = await previewLandNFT.findOne({
        _ProfileName : profilename,
        _LandId : landid,
        _WalletAddress : wallet
    })
    return data
}

//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////update Signature for PreviewLand/////////////////////
module.exports.SignPreviewLand = async (signature , Landid ,ProfileName) => {
    const Address = GetAddressfromSignature(signature);
    console.log(Address)
    const data = await previewLandNFT.findOne({
        _ProfileName : ProfileName,
        _LandId : Landid,
        _WalletAddress : Address
    })
    console.log(data)
    if(data){
        const update = await data.updateOne({
            _Signature : signature,
            _ValidSignature : true
        })
        console.log(update)
        return update
    }
    else{
        return 'Signature didnot Match'
    }
}

//////////////////////////////////////////////////////////////////////////////////


//////////////////////////GET nfts for creation////////////////////////////////////

module.exports.GetnftsforCreation = async (reviewingauthority)=>{
    const data = await previewLandNFT.find({
        _ReviewingAuthorityAddress : reviewingauthority,
        _ValidSignature : true,
        _isReviewedbyAuthority : true,
        _isNftCreated : false,
    })
    return data
}

//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////Set Ownership/////////////////////////////////

module.exports.setOwnership = async (pn , wa, li , transferAuthority)=>{
    const data = {
        _ProfileName : pn ,
        _WalletAddress : wa ,
        _LandId : li,
        _isTransfer : null,
        _TransferTo : null,
        _TransferPrice : null,
        _TransferValid : null,
        _TransferAuthority : transferAuthority,
        _TransferProfileName : null
    }
    const resp  = await Ownership(data).save();
    console.log(resp)
    return resp
}

/////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////after Nft creation//////////////////////////
module.exports.postCreate = async (profilename , owner , landid)=>{
    const data = await previewLandNFT.findOne({
        _ProfileName : profilename,
        _WalletAddress : owner,
        _LandId : landid
    })
    const resp = await data.updateOne({
        _isNftCreated : true
    })
    return(resp)
}
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Get Nfts//////////////////////////////////////////

module.exports.GetNfts = async (user) =>{
    const data = await Ownership.find({
        _ProfileName : user
    })
    return data
}
////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////Initialise Transfer Ownership////////////////////////////////

module.exports.initTransferOwnership = async (Name , id , transferTo , transferprofilename, sign)=>{
        const Address = GetAddressfromSignature(sign)
        const data = await Ownership.findOne({
            _ProfileName : Name,
            _LandId : id
        })
        
        if(data){
            if(Address == data._WalletAddress){
                const resp = data.updateOne({
                    _isTransfer : true,
                    _TransferTo: transferTo,
                    _TransferProfileName : transferprofilename
                })
                return resp
            }
            else{
                return 'Wrong Signature'
            }
        }
        else{
            return data
        }      

}
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////////Get transfer data////////////////////////////////
module.exports.getTransferData = async (User) =>{
    const data = await Ownership.find({
        _ProfileName : User
    })
    return data
}
/////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Get transfer data for (transfer to)////////////
module.exports.getTransferDatafortranferto = async (User) =>{
    const data = await Ownership.find({
        _TransferProfileName : User,
        _isTransfer : true
    })
    return data
}
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////Transfer Land///////////////////////////////////

module.exports.TransferConfirmation = async (Name , wallet , id , transferpn , tranfararsign)=>{
    const address = GetAddressfromSignature(tranfararsign)
    const data = await Ownership.findOne({
        _ProfileName : Name,
        _WalletAddress : wallet,
        _LandId : id,
        _isTransfer : true, 
        _TransferProfileName : transferpn
    })
    if(data){
        if(data._TransferTo == address){
            const resp = await data.updateOne({
                _TransferValid : true
            })
            return resp
        }
        else{
            return 'Wrong Signature'
        }
    }
    else{
        return data
    }
}

//////////////////////////Pull Data for Transfer(S.R.O)//////////////////////////

module.exports.TransferLand = async (TransferAuthority , profilename , Landid)=>{
    const data = await Ownership.find({
        _isTransfer : true,
        _TransferValid : true,
        _TransferAuthority : TransferAuthority,
        _ProfileName : profilename,
        _LandId : Landid
    })
    return data
}
/////////////////////////////////////////////////////////////////////////////////

module.exports.postTransfer = async (TransferAuthority , landid) =>{
    const data = await Ownership.find({
        _LandId : landid,
        _isTransfer : true,
        _TransferValid : true,
        _TransferAuthority : TransferAuthority
    })
    const update = await data.updateOne({
        _isTransfer : false
    })

    return update
}