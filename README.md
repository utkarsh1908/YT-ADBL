# YouTube Ad Blocker

This script automates the process of skipping YouTube ads by using Selenium WebDriver with Chrome. It detects ad playback and either skips the ad or increases playback speed to minimize ad duration.

## Features

- Simulates human-like interactions to detect and skip ads.
- Adjusts video playback speed during ads to save time.
- Uses your existing Chrome profile to preserve preferences and login sessions.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system. [Download Node.js](https://nodejs.org/)
2. **Chrome Browser**: Make sure you have the Chrome browser installed.
3. **ChromeDriver**: Ensure ChromeDriver is installed and its version matches your Chrome browser. Add it to your system's PATH. [Download ChromeDriver](https://chromedriver.chromium.org/)
4. **Selenium WebDriver**: Install the Selenium WebDriver package for Node.js:
   ```bash
   npm install selenium-webdriver
   ```

## Setup

1. Clone this repository or copy the script into a new project directory.
2. Update the `profilePath` variable in the script to point to your Chrome user profile. For example:
   ```javascript
   const profilePath = '/home/utkarsh-rai/.config/google-chrome/Profile 1';
   ```
   Replace the path with the location of your Chrome profile on your system.

3. (Optional) Uncomment the `--mute-audio` line in the Chrome options to mute YouTube audio while running the script:
   ```javascript
   const options = new chrome.Options().addArguments("--mute-audio");
   ```

## Usage

1. Run the script:
   ```bash
   node youtubeAdBlocker.js
   ```

2. The script will:
   - Open YouTube in a Chrome browser.
   - Monitor for ads and attempt to skip them.
   - Adjust playback speed to minimize the impact of ads if skipping is not possible.

## Script Details

- **Ad Detection**: The script looks for specific classes and IDs to identify ads and the "Skip Ad" button.
- **Playback Speed Adjustment**: If ads can't be skipped, the script temporarily sets the playback speed to 12x during the ad and resets it after the ad ends.

## Known Issues

- The script runs in an infinite loop and won't terminate unless manually stopped.
- If Chrome updates or YouTube changes their interface, the detection logic may need updates.
- Ensure that ChromeDriver and your Chrome browser are compatible versions to avoid runtime errors.

## Future Improvements

- Add a UI or CLI option for user configuration.
- Implement a more robust method to identify "Skip Ad" buttons dynamically.
- Optimize the loop for better performance and error handling.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is for educational purposes only. Automated interactions with websites may violate their terms of service. Use at your own risk.
