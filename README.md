# simple-line-integration-demo

A simple React application aimed at demonstrating the integration of LINE, including authentication and retrieving user profiles.

## Steps

1. **Create a new channel in LINE Developer Console:**
   - Visit the [LINE Developer Console](https://developers.line.biz/console/).

2. **Create the `.env` file:**
   - Copy the key, client ID (channel ID), and client secret (channel secret) from the console to the `.env` file.

3. **Install dependencies:**
   ```sh
   npm install

4. **Run the development server:**
      ```sh
   npm run dev
5. **Configure the callback URL in the console:**
   - Set the callback URL to localhost:[port]/callback in the LINE Developer Console.
