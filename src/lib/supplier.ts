import type { Supplier } from '@/types/entities';

export function parseSuppliers(suppliersList: Supplier[]) {
  return suppliersList.map(parseSupplier);
}

export function parseSupplier(supplier: Supplier) {
  const [, type = '', code = ''] =
    /Supplier of (.+) (#\d+)/.exec(supplier.name) || [];
  return {
    ...supplier,
    type: type,
    code,
  };
}
