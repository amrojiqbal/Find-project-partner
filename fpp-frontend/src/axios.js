import axios from 'axios'

const port=process.env.PORT || 8000;

const app=process.env.NODE_ENV;
let url='';
if(app==='development'){
    url=`http://localhost:${port}`

}
else{
    url=`https://findprojectpartner.herokuapp.com`
    
}

const instance=axios.create({

    baseURL:url
})


export default instance