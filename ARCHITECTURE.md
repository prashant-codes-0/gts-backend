# Feature-Wise Architecture Documentation

## Overview

This project implements a feature-wise architecture for both backend and frontend, promoting maintainability, scalability, and separation of concerns.

## Backend Architecture

### Directory Structure
```
src/
├── config/
│   ├── constants.js          # Application constants and business rules
│   └── database.js           # Data configuration (mock database)
├── models/
│   ├── Product.js            # Product entity model
│   └── Package.js            # Package entity model
├── services/
│   ├── ProductService.js     # Product business logic
│   ├── ShippingService.js    # Shipping calculations
│   └── PackageOptimizationService.js # Package optimization algorithms
├── controllers/
│   ├── ProductController.js  # Product HTTP request handlers
│   └── OrderController.js    # Order HTTP request handlers
├── routes/
│   ├── productRoutes.js      # Product API routes
│   ├── orderRoutes.js        # Order API routes
│   └── index.js              # Main route configuration
└── middleware/
    ├── errorHandler.js       # Global error handling
    ├── requestLogger.js      # Request logging
    └── validation.js         # Input validation
```

### Key Features

#### 1. **Models Layer**
- **Product.js**: Encapsulates product data and validation
- **Package.js**: Manages package state and operations
- Provides data validation and business logic methods

#### 2. **Services Layer**
- **ProductService**: Handles product data operations
- **ShippingService**: Calculates courier charges and shipping costs
- **PackageOptimizationService**: Implements optimization algorithms
- Contains core business logic separated from HTTP concerns

#### 3. **Controllers Layer**
- **ProductController**: Handles product-related HTTP requests
- **OrderController**: Manages order processing and optimization
- Thin layer that delegates to services

#### 4. **Routes Layer**
- Feature-based route organization
- RESTful API design
- Centralized route configuration

#### 5. **Middleware Layer**
- Global error handling
- Request logging
- Input validation
- Cross-cutting concerns

## Frontend Architecture

### Directory Structure
```
src/
├── config/
│   ├── api.js                # API configuration and request utilities
│   └── constants.js          # Frontend constants and business rules
├── services/
│   ├── ProductService.js     # Product API calls and data operations
│   └── OrderService.js       # Order API calls and optimization logic
├── hooks/
│   ├── useProducts.js        # Product state management
│   ├── useSelection.js       # Selection state management
│   └── usePackageOptimization.js # Optimization state management
├── components/
│   ├── ProductList/
│   │   ├── ProductList.js    # Product list container
│   │   ├── ProductItem.js    # Individual product component
│   │   ├── ProductList.css
│   │   └── ProductItem.css
│   ├── SelectionControls/
│   │   ├── SelectionControls.js # Order controls and summary
│   │   └── SelectionControls.css
│   ├── PackageResults/
│   │   ├── PackageResults.js # Results container
│   │   ├── PackageCard.js    # Individual package display
│   │   ├── OptimizationStats.js # Statistics display
│   │   └── *.css files
│   └── common/
│       ├── LoadingSpinner.js # Reusable loading component
│       ├── ErrorMessage.js   # Reusable error component
│       └── *.css files
└── App.js                    # Main application component
```

### Key Features

#### 1. **Custom Hooks**
- **useProducts**: Manages product fetching, filtering, and sorting
- **useSelection**: Handles product selection state
- **usePackageOptimization**: Manages optimization process and results
- Encapsulates state logic and side effects

#### 2. **Services Layer**
- **ProductService**: API calls and product data operations
- **OrderService**: Order processing and optimization requests
- Abstracts API communication from components

#### 3. **Component Architecture**
- **Feature-based organization**: Components grouped by functionality
- **Atomic design principles**: Small, reusable components
- **Separation of concerns**: Logic in hooks, presentation in components

#### 4. **Configuration Layer**
- **api.js**: Centralized API configuration
- **constants.js**: Business rules and UI constants
- Environment-specific configurations

## Design Patterns Used

### Backend Patterns

1. **MVC Pattern**: Controllers, Services (Models), Routes (Views)
2. **Service Layer Pattern**: Business logic separation
3. **Repository Pattern**: Data access abstraction (ProductService)
4. **Strategy Pattern**: Different optimization algorithms
5. **Middleware Pattern**: Cross-cutting concerns

### Frontend Patterns

1. **Custom Hooks Pattern**: State logic encapsulation
2. **Container/Presentational Pattern**: Logic vs. presentation separation
3. **Service Layer Pattern**: API abstraction
4. **Observer Pattern**: React state management
5. **Composition Pattern**: Component composition

## Benefits of This Architecture

### Maintainability
- Clear separation of concerns
- Feature-based organization
- Consistent code structure
- Easy to locate and modify code

### Scalability
- Modular design allows easy feature addition
- Services can be extracted to microservices
- Components are reusable and composable
- State management is centralized

### Testability
- Services can be unit tested independently
- Components can be tested in isolation
- Mock services for testing
- Clear dependencies

### Code Quality
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Consistent naming conventions
- Comprehensive error handling

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/validate` - Validate product IDs

### Orders
- `POST /api/orders/optimize-packages` - Optimize package distribution
- `POST /api/orders/summary` - Get order summary

### System
- `GET /api/health` - Health check
- `GET /health` - Server health check

## Business Rules Implementation

### Package Optimization
1. **Price Constraint**: Maximum $250 per package
2. **Weight Distribution**: Balanced across packages
3. **Shipping Cost Optimization**: Minimize total shipping cost

### Shipping Rates
- 0-200g: $5
- 200-500g: $10
- 500-1000g: $15
- 1000-5000g: $20

## Error Handling

### Backend
- Global error middleware
- Structured error responses
- Logging and monitoring
- Input validation

### Frontend
- Error boundaries
- User-friendly error messages
- Retry mechanisms
- Loading states

## Performance Considerations

### Backend
- Efficient algorithms
- Input validation
- Response caching potential
- Database query optimization (when implemented)

### Frontend
- Component memoization
- Lazy loading potential
- Debounced search
- Optimistic updates

This architecture provides a solid foundation for scaling the application and adding new features while maintaining code quality and developer productivity.