const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const moment = require('moment')
const path = require('chromedriver').path // 必要，不能删除

const projectMap = {
  'xshop-ksh-web': '小程序电商可视化pc端',
  'xshop-web2': '小程序电商可视化小程序端'
}

async function example() {
  const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()
  try {
    const loginUrl = 'http://121.46.193.159/users/sign_in'
    const url = 'http://121.46.193.159/users/yalin.jiang/activity'
    await driver.get(loginUrl)
    await driver.findElement(By.css('#user_login')).sendKeys('')
    await driver.findElement(By.css('#user_password')).sendKeys('')
    await driver.findElement(By.css('.move-submit-down [type="submit"][name="commit"]')).click()
    await driver.get(url)
    await driver.sleep(1000)
    let recording = ''
    for (let i = 0; i < 10; i++) {
      const project = await driver.findElement(By.css('.content .content_list .event-item:nth-of-type(' + (i + 1) + ') .event-title .project-name')).getText()
      // console.log('project', project)
      const time = await driver.findElement(By.css('.content .content_list .event-item:nth-of-type(' + (i + 1) + ') .event-item-timestamp .js-timeago')).getAttribute('datetime')
      if ((moment().unix() - moment(time).unix()) / 60 / 60 / 24 < 1) {
        const commit = await driver.findElement(By.css('.content .content_list .event-item:nth-of-type(' + (i + 1) + ') .event_commits .commit-row-title')).getText()
        let log = commit.substring(commit.indexOf('·') + 1)
        // console.log('log', log)
        recording += (i + 1) + '.' + projectMap[project] + log + '\n'
      }
    }
    console.log('recording', recording)

    console.log('正常结束')
  } finally {
    console.log('异常结束')
    driver.quit()
  }
}
example()