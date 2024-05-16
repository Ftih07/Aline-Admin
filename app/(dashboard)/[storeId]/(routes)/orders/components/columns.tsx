"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Nama Produk",
  },
  {
    accessorKey: "phone",
    header: "No. Telp",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Pembelian",
  },
  {
    accessorKey: "isPaid",
    header: "Pembayaran",
  },
]
