const axios = require('axios')

const fun = async ()=>{
    const res = await axios('http://www.amazon.com');
    console.log(res);
}

fun()