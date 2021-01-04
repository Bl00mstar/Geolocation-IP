const puppeteer = require("puppeteer");

module.exports = {
  getLocationIpstack: async (addr) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1600, height: 768 });
      await page.goto("https://ipstack.com/", { waitUntil: "networkidle2" });
      await page.waitForSelector("input[name=iptocheck]");
      await page.$eval(
        "input[name=iptocheck]",
        (el, value) => (el.value = value),
        addr
      );

      await page.evaluate(() => {
        let tempButton = document.createElement("button");
        tempButton.setAttribute("for", "ipcheck_submit");
        tempButton.setAttribute("name", "temp_button");
        const pageEl = document.querySelector('[name="ipchecker"]');
        pageEl.appendChild(tempButton);
      });

      await page.click('button[name="temp_button"]');
      await page.waitForTimeout(1000);
      await page.waitForSelector('div[class="row string"]');
      const elementIP = await page.$('div[data-object="ip"]');
      const elementLatitude = await page.$('div[data-object="latitude"]');
      const elementLongitude = await page.$('div[data-object="longitude"]');

      const ip = await page.evaluate(
        (elementIP) => elementIP.textContent,
        elementIP
      );
      const latitude = await page.evaluate(
        (elementLatitude) => elementLatitude.textContent,
        elementLatitude
      );
      const longitude = await page.evaluate(
        (elementLongitude) => elementLongitude.textContent,
        elementLongitude
      );

      let array = [ip.replace(/['"]+/g, ""), latitude, longitude];

      obj = {};

      array.forEach((el) => {
        let value = el.split(":");
        obj[value[0]] = value[1];
      });

      await browser.close();
      return obj;
    } catch (error) {
      res.status(211).json({ msg: "Connection refused." });
    }
  },
};
