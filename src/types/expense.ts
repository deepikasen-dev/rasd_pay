// src/types/Expense.ts
export interface Expense {
    id: number;
    user_id: number;
    vendor_name: string;
    invoice_date: string; // ISO date string
    total_amount: string; // API returns it as string, can parseFloat if needed
    invoice_url: string | null;
    note: string | null;
    status: "pending" | "approved" | "rejected";
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}
