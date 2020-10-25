'use strict';

var cheerio = require('cheerio');
const axios = require('axios').default;

const author_queue = [
    "なかじまゆか",
    // "井上雄彦",
    // "ヤングジャンプ",
    // "呉マサヒロ"
]

for(let ii = 0; ii < author_queue.length; ii++){
    const url = "https://www.doujinshi.org/search/simple/?T=author&sn="+ encodeURIComponent(author_queue[ii]);
    axios.get(url, {
        // proxy: "socks5://localhost:10808"
    })
        .then(function (response) {
            // handle success
            console.log(response);
            parseLink(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
    });
}

function parseLink(response){
    const $ = cheerio.load(response.data);

    const links =  $("a[title^='More']");
    for(let ii = 0; ii < links.length; ii = ii + 2){
        const infoLink = links[ii];
        const authorLink = links[ii+1];

        let str = authorLink.textContent;
        let tokens = str.split("/")
        //mil (Xration)
        //Morinaga Milk / 森永みるく (Myao)

        if(tokens.length > 1){
            str = tokens[1];
        }
        const sep = /[ \.,\/#!$%\^&＆\*;:{}=\-_`~()\[\]\–-、｀～？！＠@、。／『』「」；’：・｜＝＋]/;
        const author = str.split(sep).filter(e => !!e);

    }
}

