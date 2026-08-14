/**
 * Billing rates — TODO: these are placeholder numbers, not the real price
 * list. Replace every value in PRICE_PER_UNIT before an invoice is ever sent
 * to a paying customer.
 */

export type BillableServiceType =
  | "validation"
  | "generation"
  | "translation"
  | "interpreter";

export type BillableUnit = "word" | "page" | "hour";

export const BILLABLE_SERVICE_TYPES: BillableServiceType[] = [
  "validation",
  "generation",
  "translation",
  "interpreter",
];

export function isBillableServiceType(
  value: string,
): value is BillableServiceType {
  return value in PRICE_PER_UNIT;
}

/** validation/translation = per kata, generation = per halaman, interpreter = per jam. */
export const SERVICE_UNIT: Record<BillableServiceType, BillableUnit> = {
  validation: "word",
  translation: "word",
  generation: "page",
  interpreter: "hour",
};

// TODO: replace with the real rate list (IDR). These are placeholders only.
export const PRICE_PER_UNIT: Record<BillableServiceType, number> = {
  validation: 500, // TODO: real Rp/kata
  translation: 1_000, // TODO: real Rp/kata
  generation: 50_000, // TODO: real Rp/halaman
  interpreter: 300_000, // TODO: real Rp/jam
};

export const PPN_RATE = 0.11;

export function calculateInvoiceAmounts(
  serviceType: BillableServiceType,
  quantity: number,
) {
  const unit = SERVICE_UNIT[serviceType];
  const unitPrice = PRICE_PER_UNIT[serviceType];
  const subtotal = Math.round(unitPrice * quantity);
  const taxAmount = Math.round(subtotal * PPN_RATE);

  return {
    unit,
    unitPrice,
    subtotal,
    taxAmount,
    totalAmount: subtotal + taxAmount,
  };
}
