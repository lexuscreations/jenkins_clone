# jenkins_clone

## Instructions

1. **Set Up Webhook:**

   - Ensure your webhook is set up at `ip:port/webhook`.

2. **SSH into the Remote Server:**

   ```sh
   ssh -i q.pem ubuntu@ip
   ```

3. **Update and Install Required Packages:**

   - Update package lists:

   ```sh
   sudo apt update
   ```

   - Install curl:

   ```sh
   sudo apt install -y curl
   ```

   - Install Git:

   ```sh
   sudo apt install -y git
   ```

4. **Install NVM (Node Version Manager):**

   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

5. **Install Node.js Version 20:**

   ```sh
   nvm install 20
   ```

6. **Install PM2 Globally:**

   ```sh
   npm install -g pm2
   ```

7. **Copy Files to the Remote Server:**

   - From your local machine, copy the `jenkins_clone` directory to the remote server:

   ```sh
   scp -i q.pem -r /path/to/jenkins_clone/ ubuntu@ip:/home/ubuntu/jenkins_clone
   ```

8. **Make the Update Script Executable:**

   ```sh
   chmod +x ./update-repo.sh
   ```

---

- Manage PM2 Processes:

  - Stop all running PM2 processes:

  ```sh
  pm2 stop all
  ```

  - Start the `jenkins_clone` application with PM2:

  ```sh
  pm2 start index.js --name jenkins_clone --interpreter /home/ubuntu/.nvm/versions/node/v20.15.0/bin/node
  ```

  - View PM2 logs for the `jenkins_clone` application:

  ```sh
  pm2 logs jenkins_clone
  ```

  - Delete the `jenkins_clone` application from PM2:

  ```sh
  pm2 delete jenkins_clone
  ```

  - Check the status of all PM2 processes:

  ```sh
  pm2 status
  ```

---

- Set Proper Permissions for the Private Key:

  ```sh
  chmod 400 /path/to/your/private-key.pem
  ```
