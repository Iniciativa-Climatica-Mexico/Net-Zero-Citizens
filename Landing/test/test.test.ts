// Example test

// tests/sum.test.ts
import { expect } from 'chai';
import { sum } from '../utils/sum';

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    const result = sum(2, 3);
    expect(result).to.equal(5);
  });

  it('should add negative numbers correctly', () => {
    const result = sum(-2, -3);
    expect(result).to.equal(-5);
  });
});
