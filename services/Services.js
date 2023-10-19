/* 
 * This project is licensed to Kodesayap Inc
 * You can contribute to make this project better by contact me.
 * Please contact me via Phone +6282302021799.
 * Your Regards,Andika Leonardo, s.kom
 */
const puppeteer = require('puppeteer');


const getCekDptOnline = async(nik) => {
    // const delay = time => new Promise(res=>setTimeout(res,time));
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null,
    args: [
    '--ignore-certificate-errors',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--window-size=1920,1080',
    // '--mute-audio'
    // '--disable-features=GlobalMediaControls'
    ],
    ignoreHTTPSErrors: true,});
    const page = await browser.newPage();

    try {
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36')
        const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" })
        await page.goto('https://cekdptonline.kpu.go.id/')
        await navigationPromise
        var suara
        suara = await page.$("#root > main > div:nth-child(2) > i"),
        await suara.click(),
        await page.waitForSelector('input[type="text"]')
        await page.type('input[type="text"]', nik);
        var tombols
        Promise.all([
            await page.waitForSelector('#root > main > div.container > div > div > div > div > div > div.wizard-buttons > button:nth-child(2)'),
            tombols = await page.$("#root > main > div.container > div > div > div > div > div > div.wizard-buttons > button:nth-child(2)"),
            await tombols.click(),
            // page.waitForNavigation({ timeout: 0 }),
        ])
        var datakirim = []
        await page.waitForSelector('.sr-only', { hidden: true});
        const cek = await page.evaluate(() => {
            return !!document.querySelector('.watermarked')
        })
        if(cek){
            await navigationPromise
            await page.waitForSelector('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.top > div.top--side > div > div:nth-child(2)')
            let tps = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.top > div.top--side > div > div:nth-child(2)')
            let tpsnya = await page.evaluate(el => el.textContent, tps)
            let dpt = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.top > div.top--side > div > div:nth-child(3)')
            let dptnya = await page.evaluate(el => el.textContent, dpt)
            let nama = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div.row.row-1 > p:nth-child(1)')
            let namanya = await page.evaluate(el => el.textContent, nama)
            let tpsdetail = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div.row.row-1 > p.row--right')
            let tpsdetailnya = await page.evaluate(el => el.textContent, tpsdetail)
            let nik = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div.row.\\32  > p:nth-child(1)')
            let niknya = await page.evaluate(el => el.textContent, nik)
            let nkk = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div.row.\\32  > p.row--right')
            let nkknya = await page.evaluate(el => el.textContent, nkk)
            let kabupaten = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div:nth-child(5) > div:nth-child(1) > p.row--left')
            let kabupatennya = await page.evaluate(el => el.textContent, kabupaten)
            let kecamatan = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div:nth-child(5) > div:nth-child(1) > p.row--center')
            let kecamatannya = await page.evaluate(el => el.textContent, kecamatan)
            let kelurahan = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div:nth-child(5) > div:nth-child(1) > p.row--right')
            let kelurahannya = await page.evaluate(el => el.textContent, kelurahan)
            let alamattps = await page.$('#root > main > div.container > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div.bottom > div.column > div:nth-child(5) > div:nth-child(2) > p')
            let alamattpsnya = await page.evaluate(el => el.textContent, alamattps)
            datakirim.push({'TPS / DPT': tpsnya + ' '+ dptnya, 'Nama': namanya.replace('Nama Pemilih', ''), 'TPS': tpsdetailnya.replace('TPS', ''), 'NIK': niknya.replace('NIK', ''), 'NKK': nkknya.replace('NKK', ''), 'Kabupaten': kabupatennya.replace('Kabupaten', ''), 'Kecamatan': kecamatannya.replace('Kecamatan', ''), 'Kelurahan': kelurahannya.replace('Kelurahan', ''), 'Alamat TPS': alamattpsnya.replace('Alamat TPS', '')})
            return datakirim
        }
        return "404"
        // }
    } catch (e) {
        return "500"
    }
}

module.exports = {
    getCekDptOnline,
}