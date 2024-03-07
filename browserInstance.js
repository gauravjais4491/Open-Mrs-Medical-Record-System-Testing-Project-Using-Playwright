class BrowserInstance {
    constructor(chromium) {
        this.chromium = chromium;
    }
    async openBrowser() {
        const browser = this.chromium.launch();
        return browser
    }
    async createContext(){
        const browser = await this.openBrowser()
        const context = await browser.newContext()
        return context
    }
    // async createPage() {
    //     const page = await this.createContext().newPage()
    //     return page
    // }
}

module.exports = BrowserInstance;