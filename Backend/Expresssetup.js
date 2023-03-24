//error101 = wrong profile name or passward


const express = require('express');
var cors = require('cors')
const { findLandwithID, CheckSignForWalletReg, GetAddressfromSignature } = require('./Ethers');
const { CreateJWT, Auth, getUser } = require('./JwtAuth');
var cookieParser = require('cookie-parser');

const mongoose = require('./mongoosesetup');

const mongoosee   = require('mongoose');
mongoosee.set('strictQuery', true); 
const url = 'mongodb+srv://Blockchain_Land_Registry:blockchainLR@UserRegistration.gsympyb.mongodb.net/?retryWrites=true&w=majority';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(cors());


app.listen(5000 , () =>{console.log('serving on port 5000')});

mongoosee.connect(url , { useNewUrlParser: true })
.then((e)=>{
    console.log('connected')
})
.catch((e)=>{
    console.log('error')
});


////////////////////////////////////////REGISTER/////////////////////////////////////////////////////////

//Register User 
app.post('/RegisterUser' ,async (req,res) => {
    const reqq = req.body;
    console.log(reqq)
    const resp = await mongoose.RegisterUser(reqq);
    console.log(resp);
    if(resp === 'success'){
        res.send(resp);
    }
    else{
        res.send('error in saving data');
    }
})

//Register Users Address
app.post('/RegisterAddress', Auth , async(req , res) =>{
    const reqq = req.body;
    console.log(reqq)
    const user = getUser(req).profile_name;
    console.log(user)
    const data = {...reqq , pn : user}
    const resp = await mongoose.RegisterAddress(data)
    console.log(resp)
    if(resp === 'Success'){
        res.send(resp)
    }
    else{
        res.send('error in saving data');
    }
})

//Register User Wallet Address 
app.post('/RegisterWallet' , mongoose.PnPp ,CheckSignForWalletReg, async(req , res) =>{
    const reqq = req.body;
    console.log(reqq)
    const resp = await mongoose.RegisterWallet(reqq.ProfileName , reqq.WalletAddress)
    console.log(resp)
    if(resp === 'Success'){
        res.send(resp)
    }
    else{
        res.send('error in saving data');
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////






//////////////////////////////////////////////LOGIN/////////////////////////////////////////////////


app.post('/login' , async (req , res)=>{
    const data = await mongoose.Login(req.body.profile_name , req.body.profile_passward);
    if(data){
        const token = CreateJWT(data.ProfileName);
        res.cookie("IndianLandRegistry" , token , {
            maxAge : 30*60000,
            httpOnly : true,
        })
        res.send("Success");
    }
    else{
        res.send('error101');
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////isLogin///////////////////////////////////////////////////////////////
app.get('/islogin' ,Auth, async (req,res)=>{
    const user = getUser(req).profile_name;
    res.send(user)
})
///////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////Profile/////////////////////////////////////////////////////

app.get('/profile', Auth , async (req  , res) =>{
    const user = getUser(req).profile_name;
    console.log(user)
    const landdetails = await mongoose.LandwithPN(user);
    console.log(landdetails)
    const data = await mongoose.GetUser(user);
    console.log(data)
    const resp = {land : landdetails , userinfo : data}
    res.send(resp)
})


////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////get my land/////////////////////////////////////////////////
app.get('/Myland' ,Auth ,  async (req , res)=>{
    const user = getUser(req).profile_name;
    console.log(user)
    //mongofunction
    const landid = await mongoose.LandwithPN(user);
    const list = [];
    for(let i = 0 ; i<landid.length; i++){
        const data = await findLandwithID(landid[i]._LandId);
        list.push(data);
    }
    //ethersfunction
    res.send(list)
})
////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Get Approval Land/////////////////////////////////////////////////
app.get('/ApprovepreNfts' , Auth ,async (req , res)=>{
    const user = getUser(req).profile_name;
    console.log(user)
    const resp = await mongoose.GetPreviewNft(user);
    console.log(resp)
    res.send(resp)
})
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Signature for land creation/////////////////////////////////////
app.post('/ApprovedNft' , Auth , async (req , res)=>{
    const data = req.body
    console.log(data)
    const user = getUser(req).profile_name;
    console.log(user)
    const resp = await mongoose.SignPreviewLand(req.body._Signature, req.body._LandId, user)
    res.send(resp)
})
//////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////Market search////////////////////////////////////////////
app.get('/Market', async (req , res)=>{
    //mongo function
    const dataa = await mongoose.market();
    //ethers function
    console.log(dataa)
    const list = [];
    for(let i = 0 ; i<dataa.length; i++){
        const data = await findLandwithID(dataa[i]._LandId);
        list.push(data);
    }
    //return function
    res.send(list);
})

///////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////Get Nfts////////////////////////////////////////////////////////////
app.get('/GetNfts' , Auth,async(req ,res)=>{
    const user = getUser(req).profile_name;
    const resp = await mongoose.GetNfts(user);
    console.log(resp)
    const list = []
    for(let i = 0 ; i<resp.length ; i++){
        const data = await findLandwithID(resp[i]._LandId)
        list.push(data)
    }
    console.log(list)
    res.send(list)
})
////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////Search nft////////////////////////////////////////////////////////
app.post('/searchNft' , async (req , res)=>{
    const data = await findLandwithID(req.body._LandId)
    console.log(data)
    res.send(data)
})
////////////////////////////////////////////////////////////////////////////////////////////////////












///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////API for SRO////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////Post Ownership////////////////////////////////////////

app.post('/setOS' ,mongoose.PnWallet, async (req , res)=>{
    console.log(req.body);
})

//////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////Proposed Land NFT///////////////////////////////////////

app.post('/ProposedNft' , mongoose.PnWallet, async(req , res)=>{
    const reqq = req.body
    console.log(reqq);
    const resp = await mongoose.PreviewNft(reqq._ProfileName , reqq._LandId , reqq._WalletAddress,reqq._LandArea  ,reqq._LandAddress , reqq._LandType , reqq._ReviewingAuthorityAddress )
    res.send(resp)
})

///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////Get Preview NFT////////////////////////////////////////

app.post('/getPreviewNft' , async (req , res)=>{
    const resp = await mongoose.GetpreviewNftSRO( req.body._ProfileName , req.body._LandId , req.body._WalletAddress)
    console.log(resp)
    res.send(resp)
})


//////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////Preview Land NFT////////////////////////////////////////

app.post('/Previewland', mongoose.PnWallet,async (req , res)=>{
    const reqq = req.body
    console.log(reqq);
    const resp = await mongoose.updatePreviewLand(reqq._ProfileName , reqq._WalletAddress ,reqq._LandId , reqq._datatoupdate , reqq._AuthorityASign);
    console.log(resp)
    res.send(resp)
})

//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////post Creation///////////////////////////////////////////
app.post('/PostCreate' , async (req , res)=>{
    const reqq = req.body
    const resp = await mongoose.postCreate(reqq._ProfileName , reqq._WalletAddress , reqq._LandId)
    res.send(resp)
})
//////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////get nft for creation///////////////////////////////////

app.post('/getApprovedNftForCreation', async (req , res)=>{
    const resp = await mongoose.GetnftsforCreation(req.body._ReviewingAuthorityAddress);
    res.send(resp)
})
///////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////Set Ownership//////////////////////////////////////////////
app.post('/setOwnership' , async(req, res)=>{
    const resp = await mongoose.setOwnership(req.body._ProfileName , req.body._WalletAddress , req.body._LandId , req.body._TransferAuthority)
    res.send(resp)
})

////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Initiate Transfer Ownership////////////////////////////////

app.post('/initTransferOwnerShip', Auth ,async (req ,res)=>{
    const user = getUser(req).profile_name;
    const resp = await mongoose.initTransferOwnership(user , req.body._LandId , req.body._TransferTo, req.body._TransferProfileName, req.body._Signature)
    res.send(resp)
})
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////Get Transfer Process Data//////////////////////////////////
app.get('/getTransferData' , Auth ,async (req , res)=>{
    const user = getUser(req).profile_name;
    const resp = await mongoose.getTransferData(user)
    res.send(resp)
})
///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////Get Transfer Proccess Data (transfer to)///////////////////
app.get('/getIncomingTransfer' , Auth , async (req, res)=>{
    const user = getUser(req).profile_name;
    console.log(user)
    const resp = await mongoose.getTransferDatafortranferto(user)
    console.log(resp)
    res.send(resp)
})
///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Transfer Confirmation/////////////////////////////////////
app.post('/TransferConfirmation' , Auth,async (req , res)=>{
    const user = getUser(req).profile_name;
    const resp = await mongoose.TransferConfirmation(req.body._ProfileName , req.body._WalletAddress , req.body._LandId , user , req.body._signature)
    res.send(resp)
})
////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////Get Transfer Land data////////////////////////////////////////
app.post('/TransferLand' , async (req, res)=>{
    const resp = await mongoose.TransferLand(req.body._TransferAuthority , req.body._ProfileName , req.body._LandId)
    res.send(resp)
})
////////////////////////////////////////////////////////////////////////////////////////////

app.post('/postTransfer' , async (req , res) =>{
    const resp = await mongoose.postTransfer(req.body._TransferAuthority , req.body._LandId)
})