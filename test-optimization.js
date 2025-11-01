// Test script to verify package optimization logic
const express = require('express');

// Sample products for testing
const products = [
  { id: 1, name: 'Item 1', price: 10, weight: 100 },
  { id: 2, name: 'Item 2', price: 30, weight: 200 },
  { id: 3, name: 'Item 3', price: 40, weight: 200 },
  { id: 4, name: 'Item 4', price: 120, weight: 130 },
  { id: 6, name: 'Item 6', price: 45, weight: 240 },
  { id: 7, name: 'Item 7', price: 123, weight: 245 },
  { id: 8, name: 'Item 8', price: 230, weight: 110 }
];

/**
 * Calculate courier charge based on weight
 */
function calculateCourierCharge(weight) {
  if (weight <= 200) return 5;
  if (weight <= 500) return 10;
  if (weight <= 1000) return 15;
  return 20;
}

/**
 * Optimize package distribution
 */
function optimizePackages(selectedItems) {
  if (!selectedItems.length) return [];

  const packages = [];
  const remainingItems = [...selectedItems];

  while (remainingItems.length > 0) {
    const currentPackage = {
      items: [],
      totalWeight: 0,
      totalPrice: 0
    };

    // Sort by price descending to fit expensive items first
    remainingItems.sort((a, b) => b.price - a.price);

    let i = 0;
    while (i < remainingItems.length) {
      const item = remainingItems[i];
      
      // Check price constraint
      if (currentPackage.totalPrice + item.price <= 250) {
        currentPackage.items.push(item);
        currentPackage.totalWeight += item.weight;
        currentPackage.totalPrice += item.price;
        remainingItems.splice(i, 1);
      } else {
        i++;
      }
    }

    if (currentPackage.items.length > 0) {
      packages.push(currentPackage);
    }
  }

  return packages;
}

// Test cases
console.log('=== Package Optimization Test ===\n');

// Test Case 1: Items that fit in one package
console.log('Test Case 1: Items 1, 3, 7 (should fit in one package)');
const test1Items = products.filter(p => [1, 3, 7].includes(p.id));
const result1 = optimizePackages(test1Items);

result1.forEach((pkg, index) => {
  console.log(`Package ${index + 1}`);
  console.log(`Items - ${pkg.items.map(item => item.name).join(', ')}`);
  console.log(`Total weight - ${pkg.totalWeight}g`);
  console.log(`Total price - $${pkg.totalPrice}`);
  console.log(`Courier price - $${calculateCourierCharge(pkg.totalWeight)}`);
  console.log('');
});

// Test Case 2: Items that require multiple packages
console.log('Test Case 2: Items 4, 6, 8 (should require multiple packages)');
const test2Items = products.filter(p => [4, 6, 8].includes(p.id));
const result2 = optimizePackages(test2Items);

result2.forEach((pkg, index) => {
  console.log(`Package ${index + 1}`);
  console.log(`Items - ${pkg.items.map(item => item.name).join(', ')}`);
  console.log(`Total weight - ${pkg.totalWeight}g`);
  console.log(`Total price - $${pkg.totalPrice}`);
  console.log(`Courier price - $${calculateCourierCharge(pkg.totalWeight)}`);
  console.log('');
});

console.log('=== Test Complete ===');