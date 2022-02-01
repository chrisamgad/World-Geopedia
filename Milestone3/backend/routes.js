const express = require('express')


const pool = require('./connectsql')

var router = express.Router()

router.get('/getcountrynames', (req, res) => {
    try{    
            
        pool.query("SELECT * FROM country", function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getpresidentnames', (req, res) => {
    try{    
            
        pool.query('SELECT * FROM president p WHERE p.PresidentName != "Null" ', function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})
  
router.get('/getcapitalcitiestnames', (req, res) => {
    try{    
            
        pool.query('SELECT * FROM capitalcity WHERE CapitalCityName != "Unspecified" ', function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getcountrywithlegis/:legis', (req, res) => {
    try{    
        const legis=req.params.legis
        // //console.log("tsdf")
        // //console.log(req.params)
        pool.query(`SELECT CountryName FROM country WHERE Legislature = "${legis}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getcountrywithds/:ds', (req, res) => {
    try{    
        const driving=req.params.ds
        // //console.log("tsdf")
        // //console.log(req.params)
        pool.query(`SELECT CountryName FROM country WHERE Driving_side = "${driving}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.get('/getcountryofcity/:city', (req, res) => {
    try{    
        const city=req.params.city
        //console.log(city)
        // //console.log("tsdf")
        // //console.log(req.params)
        pool.query(`SELECT CountryName from capitalcity WHERE CapitalCityName = "${city}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }  
})

router.get('/getcountrybyphone/:callcode', (req,res)=>{
    
    try{    
        const callingcode=req.params.callcode
        //console.log(callingcode)
        // //console.log("tsdf")
        // //console.log(req.params)
        pool.query(`SELECT CountryName from country WHERE Calling_code = "${callingcode}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }  
})

router.get('/getcountrybyphone/:callcode', (req,res)=>{
    
    try{    
        const callingcode=req.params.callcode
        //console.log(callingcode)
        // //console.log("tsdf")
        // //console.log(req.params)
        pool.query(`SELECT CountryName from country WHERE Calling_code = "${callingcode}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err)
                console.log(err)
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }  
})

router.get('/get_globally_top_ten_countries_by/:attribute', (req,res)=>{

    try{    
        const attribute=req.params.attribute
        //console.log(attribute)
        // //console.log("tsdf")
        // //console.log(req.params)
        if(attribute !== "Density" && attribute !== "gdp_per_cap")
        {
            pool.query(`SELECT CountryName from country ORDER BY ${attribute} DESC LIMIT 10  `, function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })
        }
        else if (attribute === "gdp_per_cap"){
            pool.query(`    
            SELECT CountryName
            FROM country
            ORDER BY PPP_GDP/Population DESC
            LIMIT 10  `
            , function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })   
        }
        else{
            pool.query(`    
            SELECT CountryName
            FROM country
            ORDER BY Population/Area DESC
            LIMIT 10  `
            , function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })   
        }
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }  
})

router.get('/get_by_continent_top_ten_countries_by/:attribute/:continent', (req,res)=>{

    try{    
        const attribute=req.params.attribute
        const continent=req.params.continent
        console.log(attribute)
        //console.log(continent)
        // //console.log("tsdf")
        // //console.log(req.params)
        if(attribute !== "Density" && attribute !== "gdp_per_cap")
        {
            pool.query(`SELECT CountryName from country WHERE Continent="${continent}" ORDER BY ${attribute} DESC LIMIT 10  `, function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })
        }
        else if(attribute === "gdp_per_cap"){ //gdp per capita
            console.log("asdasd")
            pool.query(`    
            SELECT CountryName
            FROM country
            WHERE Continent="${continent}"
            ORDER BY PPP_GDP/Population DESC
            LIMIT 10  `
            , function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })  
        }
        else{ //density
            
            pool.query(`    
            SELECT CountryName
            FROM country
            WHERE Continent="${continent}"
            ORDER BY Population/Area DESC
            LIMIT 10  `
            , function(err, rows, fields) {
                // Connection is automatically released when query resolves
                if (err)
                    console.log(err)
                //console.log(rows)   
                res.send(rows)
            })   
        }
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }  
})

router.get('/getcountries_textreviewed',(req,res)=>{
    try{
        pool.query("SELECT * FROM usercountriestravelled", function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }catch(e){
        //console.log(err)
        res.status(500).send(err)
    }
})

router.get('/checkifusernameindb/:username',(req,res)=>{
    try{
        const username=req.params.username
        pool.query(`SELECT * FROM user WHERE Username="${username}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            if(rows.length>0)//if duplicates found
                res.send(true)
            else//No duplicates found
                res.send(false)
        })
    }catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
})

router.get('/checkifemailindb/:email',(req,res)=>{
    try{
        const email=req.params.email
        pool.query(`SELECT * FROM user WHERE Email_address="${email}" `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            if(rows.length>0)//if duplicates found
                res.send(true)
            else//No duplicates found
                res.send(false)
        })
    }catch(e){
        //console.log(err)
        res.status(500).send(err)
    }
})


router.post('/insertuser',(req,res)=>{
    try{
        const username=req.body.username
        const email=req.body.email
        const gender=req.body.gender
        const BOD = req.body.BOD


        pool.query(`
        INSERT INTO user (username,Email_address,Gender,UserBOD)
        VALUES ("${username}","${email}", '${gender}','${BOD}') 
        `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if(err)
                console.log(err)
            else{
                //console.log(rows)
                res.send(rows)
            }
        })
    }catch(err){
        //console.log(err)
        res.status(500).send(err)
    } 

})


router.get('/getusers', (req, res) => {
    try{    
            
        pool.query("SELECT * FROM user", function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})

router.post('/insertcountryreview', (req,res)=>{
    try{    
        const Username=req.body.Username;
        const countryname=req.body.countryname;
        const travel_date=req.body.travel_date;
        const rating=req.body.rating
        const review= req.body.review

        //console.log(travel_date)
        pool.query(`
        INSERT INTO usercountriestravelled (Username,CountryName,Travel_date,Visit_rating,Textual_review)
        VALUES ("${Username}","${countryname}",'${travel_date}',${rating},"${review}")
        `, function(err, rows, fields) {
            // Connection is automatically released when query resolves
            if(err)
                console.log(err)
            else{
                //console.log(rows)
                res.send(rows)
            }
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
})

router.get('/getusercountriestravelled', (req, res) => {
    try{    
            
        pool.query("SELECT * FROM usercountriestravelled", function(err, rows, fields) {
            // Connection is automatically released when query resolves
            //console.log(rows)   
            res.send(rows)
        })
    }
    catch(err){
        //console.log(err)
        res.status(500).send(err)
    }
    
})
module.exports = router;