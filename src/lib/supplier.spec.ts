import { describe, test, expect } from 'vitest';
import { parseSupplier } from '@/lib/supplier';
describe('parseSupplier method', () => {
  test('should add additional fields to the supplier object', () => {
    const parseSuppliers = parseSupplier({
      description: 'Some desc',
      name: 'Supplier of bananas #135234',
      id: 2,
    });

    expect(parseSuppliers).toEqual({
      code: '#135234',
      description: 'Some desc',
      id: 2,
      name: 'Supplier of bananas #135234',
      type: 'bananas',
    });
  });
});
