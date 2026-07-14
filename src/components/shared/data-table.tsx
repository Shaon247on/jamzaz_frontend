"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ActionButton, type ActionButtonProps } from "@/components/shared/table-action-button"

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
  className?: string
  headerClassName?: string
}

export interface DataTableAction<T> {
  variant: NonNullable<ActionButtonProps["variant"]>
  /** Accessible label — string or derived per-row, e.g. (row) => `Block ${row.name}`. */
  label: string | ((row: T) => string)
  icon?: ActionButtonProps["icon"]
  onClick: (row: T) => void
  /** Return false to hide this action for a given row (e.g. hide "Block" once already blocked). */
  show?: (row: T) => boolean
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  actions?: DataTableAction<T>[]
  getRowId: (row: T) => string
  emptyMessage?: string
  className?: string
}

const TABLE_BORDER = "#006577"

/**
 * Global data table: pass in headers (`columns`), `data`, and a set of
 * `actions` (view/edit/block/unblock/delete/...), get back the neon-styled
 * table used across the admin dashboard. Row-level `show` lets actions
 * differ per row (e.g. "Block" only on active users, "Unblock" otherwise).
 */
export function DataTable<T>({
  columns,
  data,
  actions,
  getRowId,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  const hasActions = Boolean(actions && actions.length > 0)

  return (
    <div className={cn("overflow-hidden rounded-2xl border", className)} style={{ borderColor: TABLE_BORDER }}>
      <Table>
        <TableHeader style={{ backgroundColor: "#0000004D" }}>
          <TableRow className="hover:bg-transparent" style={{ borderColor: TABLE_BORDER }}>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn("px-6 py-4 font-semibold", column.headerClassName)}
                style={{ color: "#00D3F3", fontSize: "16px" }}
              >
                {column.header}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="px-6 py-4 text-right font-semibold" style={{ color: "#00D3F3", fontSize: "16px" }}>
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="whitespace-normal py-10 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={getRowId(row)} className="hover:bg-white/2" style={{ borderColor: `${TABLE_BORDER}66` }}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={cn("px-6 py-5 text-white", column.className)}>
                    {column.render(row)}
                  </TableCell>
                ))}

                {hasActions && (
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {actions!
                        .filter((action) => !action.show || action.show(row))
                        .map((action, index) => (
                          <ActionButton
                            key={index}
                            variant={action.variant}
                            icon={action.icon}
                            label={typeof action.label === "function" ? action.label(row) : action.label}
                            onClick={() => action.onClick(row)}
                          />
                        ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}