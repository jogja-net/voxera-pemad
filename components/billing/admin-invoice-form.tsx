"use client";

import { useState } from "react";
import { createInvoice } from "@/app/actions";
import {
  calculateInvoiceAmounts,
  type BillableServiceType,
} from "@/lib/pricing";
import { formatRupiah } from "@/lib/estimate";
import type { Dictionary, Locale } from "@/lib/i18n";

const UNIT_LABEL_KEY = {
  word: "unitWord",
  page: "unitPage",
  hour: "unitHour",
} as const;

export function AdminInvoiceForm({
  projectId,
  serviceType,
  lang,
  dict,
  prefillQuantity,
}: {
  projectId: string;
  serviceType: BillableServiceType;
  lang: Locale;
  dict: Dictionary;
  prefillQuantity?: number;
}) {
  const t = dict.billing;
  const [quantity, setQuantity] = useState(
    prefillQuantity ? String(prefillQuantity) : "",
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const parsedQuantity = Number(quantity);
  const amounts =
    parsedQuantity > 0
      ? calculateInvoiceAmounts(serviceType, parsedQuantity)
      : null;
  const unitLabel = t[UNIT_LABEL_KEY[amounts?.unit ?? "word"]];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!(parsedQuantity > 0)) return;

    setPending(true);
    setError(null);
    try {
      await createInvoice(projectId, parsedQuantity, lang);
      setDone(true);
    } catch {
      setError(t.createInvoiceError);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return <p className="text-sm text-green-600">{t.statusPending}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 pt-2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={`qty-${projectId}`} className="text-xs text-gray-500">
          {t.quantityLabel} ({unitLabel})
        </label>
        <input
          id={`qty-${projectId}`}
          type="number"
          min="0"
          step="any"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="w-32 rounded border px-2 py-1 text-sm"
        />
      </div>

      {amounts && (
        <div className="text-xs text-gray-600">
          <div>
            {t.subtotalLabel}: {formatRupiah(amounts.subtotal, lang)}
          </div>
          <div>
            {t.taxLabel}: {formatRupiah(amounts.taxAmount, lang)}
          </div>
          <div className="font-semibold">
            {t.totalLabel}: {formatRupiah(amounts.totalAmount, lang)}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={pending || !(parsedQuantity > 0)}
        className="h-8 rounded bg-black px-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {t.createInvoiceCta}
      </button>

      {error && <p className="w-full text-xs text-red-600">{error}</p>}
    </form>
  );
}
