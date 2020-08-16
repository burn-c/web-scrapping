const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://uol.com.br');


  // function will be executed in the browser
  const imgList = await page.evaluate(() => {

    // get all images in the posts
    const nodeList = document.querySelectorAll('figure img');

    // transform nodeList into array
    const imgArray = [...nodeList];

    // transform the nodes (elements html) into JS objects
    const imglist = imgArray.map( ({ src }) => ({
      src
    }))

    return imglist;
  })

  // write data in local json file
  fs.writeFile('uol.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done!')
  })

  await browser.close();
})();