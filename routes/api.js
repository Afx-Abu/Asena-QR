require('../settings');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const fs = require('fs');
const axios = require('axios');
const qs = require("qs");
const cheerio = require('cheerio');
const mem = require('../lib/memes');
const mongoose = require('mongoose');
const { BufferToFile } = require('../lib/buffer');
const {makeid, vStore} = require('../lib/scan/Function');
const truecallerjs = require('truecallerjs');
const {phone} = require('phone');
let router = express.Router()
const { Configuration, OpenAIApi } = require("openai");
let options = {
root:path.join()
}
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
function IgDl(insta_url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://saveinsta.net/igram.php#downloadhere",
        {
          link: insta_url,
        }
      );
      const html = response.data;
      const $ = cheerio.load(html);
      const urls = $('a[target="_blank"]')
        .map((i, a) => $(a).attr("href"))
        .get();
      resolve({ status: 200, result: urls });
    } catch (error) {
      resolve({ status: 404, result: error.message });
    }
  });
}
router.get('/truecaller', async (req, res, next) => {
	let number = req.query.number
	if (!number ) return res.json({ status : false, creator : `${creator}`, message : "need phone number to get their data" })   
let perfix = phone("+"+number);
let searchData = {
    number: number,
    countryCode: perfix.countryIso2,
    installationId: "a2i0_--azrJsyVF-Mv9mp1tZMOu1DtBC6qZCh4JhzWATRhnZ-2kMD_Von6_gD-D-",
    output: "JSON"
}
let sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
let rslt = JSON.parse(response);
    res.json({status : true, creator : `${creator}`, name : `${rslt.data[0].name}`, score : `${rslt.data[0].score}`, "alternativeName" : `${rslt.data[0].altName}`, "access" : `${rslt.data[0].access}`, "type" : `${rslt.data[0].phones[0].numberType}`, "country" : `${rslt.data[0].phones[0].countryCode}`, "carrier" : `${rslt.data[0].phones[0].carrier}`, "city" : `${rslt.data[0].addresses[0].city}`, "timeZone" : `${rslt.data[0].addresses[0].timeZone}`,format : `${rslt.data[0].phones[0].nationalFormat}` })
      })
})
router.get('/session', async (req, res, next) => {
mongoose.connect('mongodb+srv://jasilmp00:qEsReyr6NAgPIyK1@cluster0.fr4wicm.mongodb.net')
 .then(() => console.log('Connected!'))
const {storedb} = require('../lib/scan/db');
let id = req.query.id
await storedb.find({id:id}).then(async(v)=>{
if(v[0]){
      await res.json({
		status: true,
		creator: `${creator}`,
		result: v
                })
        } else {
      await res.json({
		status: false,
		creator: `${creator}`,
		result: "no data for your session"
	        })
setTimeout(()=>{
return mongoose.connection.close(function(){console.log("test")});
}, 4500);
           }
     })
})
router.get('/apkmod', async (req, res, next) => {
let query = req.query.query
const cheerio = require('cheerio');
const axios = require('axios');
		axios.get('https://rexdl.com/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
                                const ford = [];
				const category = [];
				const date = [];
				const desc = [];
				const link = [];
				const thumb = [];
				const result = [];
				$('div > div.post-content').each(function(a, b) {
                                        ford.push($(b).find('h2.post-title > a').attr('title'))
					category.push($(b).find('p.post-category').text())
					date.push($(b).find('p.post-date').text())
					desc.push($(b).find('div.entry.excerpt').text())
					link.push($(b).find('h2.post-title > a').attr('href'))
				})
				$('div > div.post-thumbnail > a > img').each(function(a, b) {
					thumb.push($(b).attr('data-src'))
				})
				for (let i = 0; i < ford.length; i++) {
					result.push({
						category: category[i],
						upload_date: date[i],
						description: desc[i],
						thumb: thumb[i],
						link: link[i]
					})
		           }
		res.json({
		status: true,
		creator: `${creator}`,
		result: result
                })
            });
})
router.get('/github', async (req, res, next) => {
let id = req.query.id
  url = `https://api.github.com/users/${id}`;
  return axios.get(url).then((data) => {
    res.json({
		status: true,
		creator: `${creator}`,
		result: data.data
                })
        });
})
router.get('/film', async (req, res, next) => {
let id = req.query.name
    axios
      .get(`http://167.99.31.48/?s=${id}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $("#content > div > div.los").each(function (a, b) {
          $(b)
            .find("article")
            .each(function (c, d) {
              const judul = $(d)
                .find("div > a > div.addinfox > header > h2")
                .text();
              const quality = $(d).find("div > a > div > div > span").text();
              const type = $(d)
                .find("div > a > div.addinfox > div > i.type")
                .text();
              const upload = $(d)
                .find("div > a > div.addinfox > div > span")
                .text();
              const link = $(d).find("div > a").attr("href");
              const thumb = $(d).find("div > a > div > img").attr("src");
              const result = {
                name: judul,
                quality: quality,
                type: type,
                upload: upload,
                link: link,
                thumb: thumb,
              };
              hasil.push(result);
            });
        });
        res.json({
		status: true,
		creator: `${creator}`,
		result: hasil
                })
        })
})
router.get('/apk', async (req, res, next) => {
let id = req.query.name;
let gplay = require('google-play-scraper');
gplay.search({
    term: id,
    num: 4
  }).then((b)=>res.json({
		status: true,
		creator: `${creator}`,
		result: b
                }));
});
router.get('/mediafire', async (req, res, next) => {
let id = req.query.url;
const mediafiredownload = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const response = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const name = seplit[5]
mime = name.split('.')
mime = mime[1]
response.push({ name, mime, size, link })
return response
}
let re = await mediafiredownload(id);
        res.json({
		status: true,
		creator: `${creator}`,
		result: re
                });
});
router.get('/qrcode', async (req, res) => {
	let id = req.query.text;
	if(!id) return res.json({ status : false, creator : `${creator}`, message : "need text to conver qrcode" })  
	await QRCode.toFile('./qrcode.png', id, {
    errorCorrectionLevel : "H",
    width : 648,
    color: {
    dark: '#000000',  // black dots
    light: '#0000' // Transparent background
           }
     });
	return res.sendFile('/qrcode.png', { root: "." });
})
router.get('/chatgpt', async (req, res) => {
	let id = req.query.text;
	if(!id) return res.json({ status : false, creator : `${creator}`, message : "need text to get ai result" })  
  const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: id,
  temperature: 0.3,   
  max_tokens: 3000,   
  top_p: 1.0, 
  frequency_penalty: 0.0,   
  presence_penalty: 0.0
});
return res.json({status : true, creator : `${creator}`, result : completion.data.choices[0].text});
});
router.get('/memgen', async (req, res, next) => {
        let text = req.query.text;
	let url = req.query.url;
        let poss = req.query.pos||50;
        let topposstion = req.query.tpos||10;
        let top = req.query.top || "";
        let botum = req.query.botum || "";
if(!url||!text) return res.json({status : false, creator : `${creator}`, reason : "need text and url, ex:- '?text=inrl&url=https://xamp.jpg'"});
let options = {
    imageURL: url, // URL of image
    topText: top, // optionel
    top_Pos : topposstion,//optionel
    bottomText: text, // bottom text of meme
    bot_Pos : poss,//optionel
    fileName: 'my_meme', //optionel
}

await mem(options, function(ress, error) {
    if(error) return res.json({status : false, creator : `${creator}`, reason : "unknown error?!"});
    return res.sendFile('/'+ress.fileName, { root: "." });
     });
});
router.get('/insta', async (req, res, next) => {
let id = req.query.url;
if(!id) return res.json({ status : false, creator : `${creator}`, message : "need url to get instagaram result" });
    let result = [];
    let a = await IgDl(id)
    if(a.result.length <=1){ 
    result.push({url:a.result[0]})
    } else {
    a.result.map(async(m)=>{
    await result.push({url:m});
   })
}
return await res.json({ status : true, creator : `${creator}`, result : result });
});
router.get('/fb', async (req, res, next) => {
let id = req.query.url;
if(!id) return res.json({ status : false, creator : `${creator}`, message : "need url to get fb result" });
	let config = {
		'url': id
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data)	
		res.json({
                        status : true,
                        creator : `${creator}`,
			Normal_video: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			HD: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr('href')
			})
           });
});
router.get('/lyrics', async (req, res, next) => {
let id = req.query.text;
if(!id) return res.json({ status : false, creator : `${creator}`, message : "need text to get lyrics" });
    let lyrics = await requestLyricsFor(`${id}`); 
    let author = await requestAuthorFor(`${id}`);
    let cover_image = await requestIconFor(`${id}`) ||'not found';
    let title = await requestTitleFor(`${id}`);
let result = {};
result.cover_image = cover_image;
result.author = author;
result.lyrics = lyrics;
result.title = title;
return await res.json({ status : true, creator : `${creator}`, result : result });
});
router.get('/ssweb', async (req, res, next) => {
let id = req.query.url;
if(!id) return res.json({ status : false, creator : `${creator}`, message : "need to get buffer  of the web" });
const base = 'https://www.screenshotmachine.com'
			 const param = {
			   url: url,
			   device: 'desktop',
			   cacheLimit: 0
			 }
			 axios({url: base + '/capture.php',
				  method: 'POST',
				  data: new URLSearchParams(Object.entries(param)),
				  headers: {
					   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
			 }).then((data) => {
				  const cookies = data.headers['set-cookie']
				  if (data.data.status == 'success') {
					   axios.get(base + '/' + data.data.link, {
							headers: {
								 'cookie': cookies.join('')
							},
							responseType: 'arraybuffer'
					   }).then(({ data }) => {
		res.send(data)
					   })
				  } else {
	       return res.json({ status : false, creator : `${creator}`, message : "need undefined erro found" });
				  }
			 })
});
router.get('/twitter', async (req, res, next) => {
let id = req.query.url;
if(!id) return res.json({ status : false, creator : `${creator}`, message : "need url to get twitter video" });
let config = {
			'URL': id
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		res.json({
                                status : true,
                                creator : `${creator}`,
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a').attr('href')
			})
		})
});
module.exports = router
