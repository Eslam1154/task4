const request = require ('request')
const geocode = (address , callback)=>{
    const geocoderUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw'
    
    request ({url:geocoderUrl ,json:true},(error,response) =>{
    
        if (error){
            callback("Unable to connect geocde service ", undefined)
    
        } else if (response.body.message) {
            console.log(response.body.message)
        
        } else if (response.body.features.length== 0) {
            callback("Unable to find location",undefined)
        
        } else{
            callback(undefined , {
                longtitude :  response.body.features[0].center[0],
                latitude : response.body.features[0].center[1]
            })          
        }
    })
    }

    module.exports = geocode