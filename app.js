const request= require ("request")
const forcast = require('./data1.js/forecast')
const geocode = require ('./data1.js/geocode')
const country ="egypt" //process.argv[2]


///////////////////////////////////////////
const express  = require('express')
const app = express ()
const port = process.env.PORT || 3000

const path = require("path") // => core modules
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get('/home',(req, res ) =>{
    res.send ("Eslam Mostafa")
})
app.set('view engine', 'hbs');
///////////////////////////////////
var hbs = require('hbs')
const partialPath = path.join(__dirname , "./partials")
hbs.registerPartials(partialPath)

app.get('/',(req, res)=>{
    res.render('home',{
        title:"Home",
        desc:"this is home page"
    })
})
app.get('/check',(req, res ) =>{
    res.render ('check',
    
    geocode(country,(error , data)=>{
        
        console.log("Error", error)
        console.log("Data", data)
        if (data){
            forcast (data.latitude , data.longtitude , (error , data)=>{
                console.log("Error: ", error)
                console.log("Data: ", data)

            })
        } else {
            console.log("Undeifine Country")
            

        }
        
    },{
        title:"Check",
        // desc:"This is home page"
    })
    
    
    // {
    //     //////////////////////////
    //     longtitude:longtitude
    // //     latitude,
    // //     country
    // }

)
})

app.listen(port,()=> {
console.log(`Example app listening on port${port}`)
})
