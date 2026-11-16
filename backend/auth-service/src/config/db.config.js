
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is missing from your .env file');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;

  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);

if (error.reason?.servers) {
  for (const [server, details] of error.reason.servers) {
    console.error(`\nServer: ${server}`);
    console.error('Error:', details.error);
  }
}
    process.exit(1);
  }
};

module.exports = connectDB;
