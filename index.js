const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Snippet } = require('./models');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
}).then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Directories for storing data
const snippetsDirectory = path.join(__dirname, '..', 'hidden_folder', 'snippets');
const downloadsDirectory = path.join(__dirname, 'downloads');

// Function to generate a random 16-character alphanumeric string
function generateUniqueId() {
  return crypto.randomBytes(8).toString('hex');
}

// Function to share a snippet
async function shareSnippet() {
  const title = readlineSync.question('Enter snippet title: ');
  const language = readlineSync.question('Enter snippet language: ');
  const description = readlineSync.question('Enter snippet description: ');
  const author = readlineSync.question('Enter your name: ');

  console.log('Enter code snippet (paste your code, end with --END--):\n');
  let code = '';

  // Read lines until '--END--' is encountered
  while (true) {
    const line = readlineSync.question('> ');
    if (line.trim() === '--END--') {
      break;
    } else {
      code += line + '\n';
    }
  }

  try {
    // Generate a custom snippet ID for user reference
    const customId = generateUniqueId();

    const snippet = new Snippet({
      title,
      code: code.trim(),
      language,
      description,
      author,
      customId, // Include customId in the snippet document
    });

    await snippet.save();
    console.log(`Snippet shared successfully! MongoDB ID: ${snippet._id}, Custom ID: ${snippet.customId}`);
  } catch (err) {
    if (err instanceof mongoose.Error && err.name === 'MongooseError') {
      console.error('Mongoose error:', err.message);
    } else {
      console.error('Error sharing snippet:', err);
    }
  }
}

// Function to retrieve a snippet
async function getSnippet() {
  const author = readlineSync.question('Enter shared person username: ');
  const customId = readlineSync.question('Enter snippet custom ID: ');

  try {
    const snippet = await Snippet.findOne({ author, customId });

    if (snippet) {
      // Check if downloads directory exists, create if it doesn't
      if (!fs.existsSync(downloadsDirectory)) {
        fs.mkdirSync(downloadsDirectory, { recursive: true });
      }

      const fileName = readlineSync.question('Enter file name (without extension): ');
      const fileExtension = readlineSync.question('Enter file extension (e.g., js, py, txt): ');

      const filePath = path.join(downloadsDirectory, `${fileName}.${fileExtension}`);
      fs.writeFileSync(filePath, snippet.code);

      console.log(`Snippet retrieved and saved as ${fileName}.${fileExtension}`);
    } else {
      console.log('Snippet not found. Please check your username and snippet custom ID.');
    }
  } catch (err) {
    console.error('Error retrieving snippet:', err);
  }
}

// Main CLI loop
async function main() {
  console.log('Welcome to Code Snippet Sharing CLI');

  while (true) {
    console.log('\nMenu:');
    console.log('1. Share Snippet');
    console.log('2. Get Snippet');
    console.log('3. Exit');

    let choice;
    try {
      choice = parseInt(readlineSync.question('Enter your choice: ').trim());
    } catch (error) {
      console.log('Input valid number, please.');
      continue;
    }

    switch (choice) {
      case 1:
        await shareSnippet();
        break;
      case 2:
        await getSnippet();
        break;
      case 3:
        console.log('Exiting...');
        mongoose.connection.close(); // Close MongoDB connection before exiting
        return; // Exit the function and terminate the program
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

// Start the CLI application
main();
