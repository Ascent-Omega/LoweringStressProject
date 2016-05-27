# LoweringStress Instructions To Get it Running
####1. Install Github for Desktop
If you're reading this you might have already done this, if not just download Github's desktop app.
####2. Clone Repository
Once you have the Github desktop application downloaded, you will want to clone the repository locally. There should
be a plus button somewhere in the UI, click it and it will ask if you want to "add", "create", or "clone" a repository. Select clone, and the LoweringStress repository should be there. Clone it in your file system and remember where it is,
because you'll be referencing it in your browser.
####3. Installing Node and NPM
When you install Node.js it comes with a package manager called NPM. NPM makes it easy to add in useful code that others have written and published. https://docs.npmjs.com/getting-started/installing-node The video on this page
uses a mac/unix set-up, but they also have ways to install it for windows if you read the description below the video.
####4. Installing Bower
Bower is a great way to track dependencies in your project. For example, one dependency for us is the 'bootstrap' package. What's cool with Bower is that once you clone the repository locally, all you have to do is run one command line argument and all outside dependencies will download in the repository. Bower's download instructions can be found here: http://bower.io/#install-bower
####5. Run Bower to Download Missing Dependencies
Once you have the repository cloned and npm and bower installed, go into your command line prompt and navigate to the repository directory. Once you're in there, run the command:
```bash
bower install
```
####6. Navigate to the directory in your browser
Go to the URL: /your-path-to-LoweringStress/LoweringStress/app/index.html
