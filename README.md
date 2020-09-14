# stockMarketTool

## Use
This tool will help me target different stocks to invest in using various trading strategies

## Basic Architecture
![Basic Architecture](archDocs/basicArchDiagram.png)

### Application Server
This server will be responsible for contacting Finnhub.io to receive stock data as requested by the user.
It will also run logic to recommend stocks to invest in for the user.
The server will contact the database to store user information (i.e. user Finnhub.io key, invested stocks, buying power, etc.)

**Implementation**
The Application will run on the Node.js runtime and will be implemented with Express, a Node backend framework
During development, the server will run on local host for simplicity

### Finnhub.io Servers
This application will contact [Finnhub.io](finnhub.io) to gain pricing information and expert analysis recommendations.
An API key is needed to make requests for Finnhub.io data

**Implementation**
The Node.js & Express server will communicate with Finnhub.io to make HTTP GET calls for financtial data

### Database
The database will be responsible for storing user specific data (i.e. Finnhub.io key, invested stocks, buying power, etc.)

**Implementation**
MongoDB will be used for the database for this application. This is because the data collected from the user will be unstructured as the app is developed and implementation is added.

### Application End User Interface
The end user will provide the application their finnhub.io api key, as well as, other information to the application server where the logic will be executed
The end user will be able to view recommended stocks based on different variables (i.e. buying power, preferred company sector, investing strategy, etc.)

**Implementation**
The frontend of the application will be implemented with Vue.js. Vue was chosen because the application will act reactively as the user interacts with it


