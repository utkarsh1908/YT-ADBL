const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

console.log("Simulated human-like click on skip button.");

(async function youtubeAdBlocker() {
    // Set up Chrome options to use your personal profile and mute audio
    const profilePath = '/home/utkarsh-rai/.config/google-chrome/Profile 1'; // Replace with your actual profile path

    const options = new chrome.Options()
        // .addArguments("--mute-audio")
        .addArguments(`--user-data-dir=${profilePath}`); // Use your Chrome profile

    // Initialize the WebDriver
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open YouTube
        await driver.get('https://www.youtube.com');

        // Function to monitor for ads and skip them
        async function monitorForAds() {
            while (true) {
                try {
                    // Check for the ad badge
                    const adBadge = await driver.findElements(By.className("ytp-ad-badge__text--clean-player"));

                    if (adBadge.length > 0) {
                        console.log("Ad detected - attempting to skip or adjust playback speed.");

                      //  Find and click the skip button if available
                        // button = driver.find_element_by_class_name('ytp-ad-skip-button-container')
                        // button.click()
                        // const skipButton = await driver.findElements(By.id("skip-button:2"));
                        // var skipButton = await driver.findElement(By.xpath("//*[starts-with(@id, 'skip-button:')]"));
                        // if (EC.presence_of_element_located((By.XPATH, ".//div/div/div/div/div/span/button/div[contains(text(),'Skip Ad')]"))) {
                        //     const button = driver.find_element_by_xpath(".//div/div/div/div/div/span/button/div[contains(text(),'Skip Ad')]")
                        //     driver.executeScript("arguments[0].click();", button)
                        //     console.log("Skipped")
                        //     sleep(2)
                        // }
                        if(skipButton.length()==0){
                             skipButton = await driver.findElement(By.xpath("//*[starts-with(@id, 'skip-ad:')]"));
                        }
                        let skipButton;
                        for (let i = 0; i <= 9; i++) {
                            const skip=await driver.findElements(By.id(`skip-button:${i}`));
                            if (skip.length> 0) {
                                ch=true;
                                skipButton=skip;
                                break;
                            }
                        }
                        
                        for (let char of 'abcdefghijklmnopqrstuvwxyz') {
                            if(ch){
                                break;
                            }
                            const skip=(await driver.findElements(By.id(`skip-button:${char}`)));
                            if (skip.length > 0) {
                                ch=true;
                                skipButton=skip;
                                break;
                            }
                        }
                        for (let i = 0; i <= 9; i++) {
                            const skip=await driver.findElements(By.id(`skip-ad:${i}`));
                            if (skip.length> 0) {
                                ch=true;
                                skipButton=skip;
                                break;
                            }
                        }
                        
                        for (let char of 'abcdefghijklmnopqrstuvwxyz') {
                            if(ch){
                                break;
                            }
                            const skip=(await driver.findElements(By.id(`skip-ad:${char}`)));
                            if (skip.length > 0) {
                                ch=true;
                                skipButton=skip;
                                break;
                            }
                        }
                        
                        if (skipButton.length > 0) {
                            const video = await driver.findElement(By.tagName("video"));
                            await driver.executeScript("arguments[0].playbackRate = 12;", video);
                            console.log("Playback speed set to 12x for now.");
                            await driver.wait(until.elementIsVisible(skipButton[0]), 5000);
                            // await skipButton[0].hover();
                            await skipButton[0].click();
                            console.log("Ad skipped successfully.");
                        }
                        else {
                            // If skip button isn't available, speed up the ad playback temporarily
                            const video = await driver.findElement(By.tagName("video"));
                            await driver.executeScript("arguments[0].playbackRate = 12;", video);
                            console.log("Playback speed set to 12x for ad.");
                        }
                    } else {
                        // Reset playback speed to normal if no ad is playing
                        const video = await driver.findElement(By.tagName("video"));
                        await driver.executeScript("arguments[0].playbackRate = 1.75;", video);
                        console.log("Playback speed set to normal.");
                    }

                    // Wait for a short interval before checking again
                    await driver.sleep(1000);

                } catch (error) {
                    console.log("No ad detected or unable to interact with elements. Retrying...");
                    await driver.sleep(1000);
                }
            }
        }

        // Start monitoring for ads
        monitorForAds();

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the driver when finished
        // Note: This won't actually be reached here due to the infinite loop
        // await driver.quit();
    }
})();
