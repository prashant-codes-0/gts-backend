# Package Optimizer

A Node.js + React solution for optimizing e-commerce order packages based on price and weight constraints.

## Features

- **Product Selection**: Interactive list of 50 products with checkboxes
- **Package Optimization**: Automatically divides orders into packages following business rules:
  - Maximum $250 per package for international customs
  - Optimized weight distribution for lowest shipping costs
- **Real-time Results**: Displays optimized packages with items, weights, prices, and courier charges

## Business Rules Implementation

1. **Price Constraint**: Each package cannot exceed $250 total value
2. **Weight Optimization**: Uses greedy algorithm to balance package weights
3. **Courier Pricing**: 
   - 0-200g: $5
   - 200-500g: $10
   - 500-1000g: $15
   - 1000-5000g: $20

## Project Structure

```
├── server.js              # Express backend with optimization logic
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styling
│   └── package.json       # Frontend dependencies
└── README.md
```

## Installation & Setup

1. **Install backend dependencies**:
   ```bash
   npm install
   ```

2. **Install frontend dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Development Mode (Recommended)

1. **Start the backend server**:
   ```bash
   npm run server
   ```

2. **In a new terminal, start the React development server**:
   ```bash
   cd client
   npm start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Access the application**: http://localhost:5000

## API Endpoints

- `GET /api/products` - Fetch all available products
- `POST /api/optimize-packages` - Optimize selected items into packages

## Algorithm Details

The package optimization uses a **greedy algorithm** approach:

1. **Price Priority**: Items are sorted by price (descending) to fit expensive items first
2. **Constraint Checking**: Each item is checked against the $250 price limit
3. **Package Creation**: New packages are created when constraints are violated
4. **Weight Balancing**: The algorithm naturally balances weights by filling packages optimally

## Code Quality Features

- **Clean Architecture**: Separation of concerns between frontend and backend
- **Comprehensive Comments**: All functions are documented with JSDoc
- **Error Handling**: Robust error handling on both client and server
- **Responsive Design**: Mobile-friendly interface
- **Input Validation**: Server-side validation for API requests
- **Modular Functions**: Small, focused functions for maintainability

## Example Output

```
This order has following packages:

Package 1
Items - Item 8, Item 14, Item 17
Total weight - 639g
Total price - $245
Courier price - $15

Package 2
Items - Item 23, Item 24
Total weight - 550g
Total price - $200
Courier price - $15
```