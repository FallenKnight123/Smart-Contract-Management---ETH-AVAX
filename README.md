
# Virtual Bank

Welcome to Virtual Bank! This repository contains [brief description of the project].

## Getting Started

To get started with this project in Visual Studio Code, follow these steps:

### Prerequisites

- Node.js installed on your machine
- Visual Studio Code (VS Code) installed

### Opening the Project in VS Code

1. Clone this repository to your local machine using the following command:
   ```
   git clone <repository-url>
   ```

2. Open the cloned project folder in Visual Studio Code.

### Setting Up the Project

After you open the project in VS Code, follow these steps to get the code running on your computer:

1. Inside the project directory, open a terminal in VS Code (Ctrl/Cmd + `).
2. Install project dependencies by running:
   ```
   npm install
   ```
3. Open two additional terminals in your VS Code.

4. In the second terminal, run the following command to start the local blockchain:
   ```
   npx hardhat node
   ```
   
5. In the third terminal, run the following command to deploy contracts:
   ```
   npx hardhat run --network localhost scripts/deploy.js
   ```
   
6. Back in the first terminal, start the front-end by running:
   ```
   npm run dev
   ```

### Accessing the Project

After completing the above steps, the project will be running on your localhost. You can typically access it at [http://localhost:3000/](http://localhost:3000/).
