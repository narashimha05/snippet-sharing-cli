
# snippet-sharing-cli

The Code Snippet Sharing CLI is a command-line tool that allows users to share and retrieve code snippets using MongoDB as the backend database. Users can enter their MongoDB Atlas connection details to store and share their snippets.

## Documentation
This documentation includes all necessary instructions for both local and cloud setups, and provides clear steps for team members to set up their environment using a shared MongoDB Atlas connection string.

### Overview
The Code Snippet Sharing CLI is a powerful command-line tool designed to facilitate the sharing and retrieval of code snippets. Leveraging MongoDB for backend storage, this tool allows developers to seamlessly save and fetch snippets by title, language, description, and author. Whether you're collaborating with a team or simply organizing your code, this CLI tool offers a streamlined and efficient solution.

### key Features:
- **Share Code Snippets:** Easily share code snippets with detailed metadata including title, language, description, and author.
- **Retrieve Snippets:** Quickly retrieve and save code snippets using a custom ID and author's name.
- **Local File Saving:** When retrieving snippets, the CLI prompts users for a file name and extension (e.g., .js, .py, .txt). The retrieved code snippet is then saved in the downloads directory for easy access and use.

### MongoDB Installation
This guide will help you install MongoDB Community Edition on your local machine.
#### Step 1: Download MongoDB community Edition
- Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
- Select your operating system (Windows, macOS, or Linux).
- Download the appropriate installer for your system.

#### Step 2: Install MongoDB Community Edition
__For Windows__
- Run the downloaded .msi installer.
- Follow the installation prompts.
- During installation, you may choose the "Complete" setup type for a full installation.
- Ensure the option to install MongoDB as a Windows Service is selected for easier management.
- For more detailed instructions, refer to the [official MongoDB installation documentation for Windows.](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

__For macOS__
- Open the Terminal application.
- Install MongoDB using Homebrew:
```ruby
brew tap mongodb/brew
brew install mongodb-community
```
- Once the installation is complete, you can start MongoDB with the following command:
```ruby
brew services start mongodb/brew/mongodb-community
```
- For more detailed instructions, refer to the [official MongoDB installation documentation for macOS.](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

__For Linux__
- Follow the steps to import the public key used by the package management system:
```ruby
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```
- Create a list file for MongoDB:
```ruby
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```
- Reload local package database:
```ruby
sudo apt-get update
```
- Install the MongoDB packages:
```ruby
sudo apt-get install -y mongodb-org
```
- Start MongoDB:
```ruby
sudo systemctl start mongod
```
- For more detailed instructions, refer to the [official MongoDB installation documentation for Linux.](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
### Additional Resources
If you prefer visual instructions, you can follow along with a video tutorial on YouTube. Search for "MongoDB installation tutorial" for a variety of step-by-step guides.

### __Cloud Setup Using mongoDB Atlas__
Using the cloud setup is beneficial for team projects, allowing multiple members to register, create, and share tasks using the shared MongoDB Atlas connection string. This setup ensures everyone is working on the same database, making collaboration easier.

#### Prerequisites
- **Node.js and npm:** Ensure you have Node.js and npm installed on your machine.

- **MongoDB Atlas Account:** Sign up for a free MongoDB Atlas account.
 #### Steps to Setup:
 #### 1. Create a Cluster on MongoDB Atlas

- Log in to your MongoDB Atlas account.
- Create a new cluster.
- Whitelist your IP address to allow connections.
- Create a database user with the necessary permissions. or use the database username and password while you were setting up.
#### 2. Obtain the Connection String

- Go to the cluster's connect page and copy the connection string.
- Replace **<username>** and **<password>** with your MongoDB Atlas database user's credentials.
- Replace **<dbname>** with TaskManager. Something looks like this.
```ruby
mongodb+srv://<username>:<password>@cluster0.dynoifc.mongodb.net/SnippetShare
```
- Then create a .env file and paste the code like this:
```ruby
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.dynoifc.mongodb.net/Snippet-sharing-cli
```
#### 4. Enter the code in command line:
```ruby
npm install snippet-sharing-cli
npm install
```
#### 5. Create index.js file
- open index.js
- Add the following line at the top:
```ruby 
const task = require('snippet-sharing-cli');
```
#### 6. Run the application
```ruby
node index.js
```
Then You are good to go. 

### __Setup for Members Using MongoDB URI Shared Connection__
#### 1. Create a .env File:
- Create a .env file in the project directory.
- Paste the provided connection string into the .env file
```ruby
MONGO_URI=<Your-Shared-MongoDB-Atlas-Connection-String>
```
#### 2. Enter the code in command line:
```ruby
npm install snippet-sharing-cli
npm install
```
#### 3. Create index.js file
- open index.js
- Add the following line at the top:
```ruby 
const task = require('snippet-sharing-cli');
```
#### 4. Run the application
```ruby
node index.js
```
Then You are good to go. 
## Authors

- [@narashimha05](https://www.github.com/narashimha05)


## Downloads Badge
[![npm downloads](https://img.shields.io/npm/dm/snippet-sharing-cli.svg)](https://www.npmjs.com/package/easy-cli-notepad)

## Version Badge

![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)

## License

![License](https://img.shields.io/badge/license-MIT-blue.svg)

# Found a Bug or Need to Contact?
If you encounter an error while connecting to your MongoDB database, such as an **IP whitelisting issue** in MongoDB Compass, go to MongoDB Atlas, navigate to the **Security** tab, and select **Network Access**. In the **IP Access List** section, click **Add IP Address** and either select **Add Current IP Address** to automatically add your current IP or manually enter your specific IP address. Give it a meaningful description and click **Confirm**. Wait a few moments, then try connecting to your MongoDB URI string in MongoDB Compass again. This should resolve the connection issue.

Apart from that, If you've encountered a bug in my software or have any questions, suggestions, or feedback, I'd love to hear from you! Here's how you can get in touch:

You can reach out to me via email at chinnarinarashimha@gmail.com for any queries.

Your feedback is valuable to me as it helps me to improve the software and provide a better experience for all users. Thank you for your support and for helping us make our software better.


