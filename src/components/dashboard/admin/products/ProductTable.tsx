"use client";

import { useState } from "react";
import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "@/components/shared/data-table";
import { EditProductDialog } from "./EditProductDialog";
import type { ProductRow } from "@/types/product.types";

interface ProductTableProps {
  data: ProductRow[];
  totalItems: number;
  categories: string[];
}

const columns: DataTableColumn<ProductRow>[] = [
  {
    key: "name",
    header: "Product Name",
    render: (row) => (
      <span className="font-semibold text-white">{row.name}</span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (row) => <span className="text-gray-300">{row.category}</span>,
  },
  {
    key: "platform",
    header: "Platform",
    render: (row) => <span className="text-gray-300">{row.platform}</span>,
  },
  {
    key: "viewer",
    header: "Viewer",
    render: (row) => (
      <span className="text-[#00D3F3] font-medium">
        {row.viewer.toLocaleString()}
      </span>
    ),
  },
];

export function ProductTable({
  data,
  totalItems,
  categories,
}: ProductTableProps) {
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (product: ProductRow) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSave = (updatedProduct: ProductRow) => {
    // In a real app, this would call an API or server action
    console.log("Saving product:", updatedProduct);
    // For now, just log and close
    setIsDialogOpen(false);
    setEditingProduct(null);
    // You would typically refresh the data or revalidate here
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  // Only edit action
  const actions: DataTableAction<ProductRow>[] = [
    {
      variant: "edit",
      label: (row) => `Edit ${row.name}`,
      onClick: (row) => handleEdit(row),
    },
  ];

  return (
    <>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Showing {data.length} of {totalItems} products
        </div>
        <DataTable
          columns={columns}
          data={data}
          actions={actions}
          getRowId={(row) => row.id}
        />
      </div>

      {/* Edit Dialog */}
      {editingProduct && (
        <EditProductDialog
          isOpen={isDialogOpen}
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
