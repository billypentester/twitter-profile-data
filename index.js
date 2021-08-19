const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const port = process.env.port || 3000

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const web  = "https://nitter.net"

var url = ""

app.get('/', (req, res) => {
    const out = {
        "usage" : "/YOUR-USERNAME",
        "example" : `${req.hostname}/billypentester`
    }
    res.header('Content-type', 'application/json', Access-Control-Allow-Origin: *);
    res.json(out)
})

app.get('/:name', (req, res) => {

    var user = "/" + req.params.name

    var options = {
        url : web + user,
        timeout: 10000
    }
    
    if(!req.params.name)
    {
        const out = {
            "error" : "parameters must required"
        }
        res.json(out)
    }
    else
    {
        request(options, async(error, res, html) => {

            try 
            {
    
                var $ = cheerio.load(html)
                var bann = $('.profile-banner').find('img').attr('src')
                var banner = web + bann
                var prof = $('.profile-card-avatar').find('img').attr('src')
                var profile = web + prof
                var name = $('.profile-card-fullname').text()
                var username = $('.profile-card-username').text()
                var bio = $('.profile-bio p').text()
                var location = $('.profile-location span').text()
                var website = $('.profile-website span a').attr('href')
                var joindate = $('.profile-joindate span div').text()
                var tweets= $('.posts').find('.profile-stat-num').text()
                var following= $('.following').find('.profile-stat-num').text()
                var followers= $('.followers').find('.profile-stat-num').text()
                var likes= $('.likes').find('.profile-stat-num').text()
        
                var header = { 
                    "data" : {
                        "banner" : `${banner}`, 
                        "profile" : `${profile}`, 
                        "name" : `${name}`,
                        "username" : `${username}`,
                        "bio" : `${bio}`,
                        "location" : `${location}`,
                        "website" : `${website}`,
                        "joindate" : `${joindate}`,
                        "tweets" : `${tweets}`,
                        "following" : `${following}`,
                        "followers" : `${followers}`,
                        "likes" : `${likes}`,
                    }
                }
                    
                
                await trigger(header)
        
                console.log(header) 
        
                
            } 
            catch (error) 
            {
                console.log(error)
            }
    
    
        })
    
        var trigger = async(header) => {
            var result = await header
            res.header('Content-type', 'application/json');
            res.json(result)
        } 

    }  

})

 app.listen(port, () => console.log(`app is listening on port!`))

