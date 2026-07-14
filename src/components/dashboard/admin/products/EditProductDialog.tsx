// EditProductDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductRow } from "@/types/product.types";

interface EditProductDialogProps {
  isOpen: boolean;
  product: ProductRow;
  categories: string[];
  onSave: (product: ProductRow) => void;
  onCancel: () => void;
}

export function EditProductDialog({
  isOpen,
  product,
  categories,
  onSave,
  onCancel,
}: EditProductDialogProps) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [availableCategories, setAvailableCategories] = useState(categories);

  const handleAddCategory = () => {
    if (newCategory.trim() && !availableCategories.includes(newCategory.trim())) {
      setAvailableCategories([...availableCategories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const handleSave = () => {
    onSave({
      ...product,
      name,
      category,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isAddingCategory) {
      e.preventDefault();
      handleAddCategory();
    }
  };

  // Reset form when dialog opens with new product
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCancel();
    } else {
      // Reset form when opening
      setName(product.name);
      setCategory(product.category);
      setIsAddingCategory(false);
      setNewCategory("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md border-white/5 bg-[#0d1420] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-gray-300">
              Product Name
            </Label>
            <Input
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="h-11 w-full rounded-lg border-border/60 bg-input/30 text-white placeholder:text-muted-foreground focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="product-category" className="text-gray-300">
              Category
            </Label>
            {isAddingCategory ? (
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter new category"
                  className="h-11 flex-1 rounded-lg border-border/60 bg-input/30 text-white placeholder:text-muted-foreground focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30"
                  autoFocus
                />
                <Button
                  variant="primary"
                  size="default"
                  onClick={handleAddCategory}
                  className="h-11 px-4 whitespace-nowrap"
                >
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategory("");
                  }}
                  className="h-11 px-4"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-11 flex-1 rounded-lg border-border/60 bg-input/30 text-white focus-visible:border-[#00EAFF] focus-visible:ring-[#00EAFF]/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-white/5 bg-[#0d1420] text-white">
                    {availableCategories.map((cat) => (
                      <SelectItem 
                        key={cat} 
                        value={cat}
                        className="focus:bg-white/5 focus:text-white"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="primary"
                  size="default"
                  onClick={() => setIsAddingCategory(true)}
                  className="h-9.5"
                >
                  + Add New
                </Button>
              </div>
            )}
          </div>

          {/* Platform (Read-only) */}
          <div className="space-y-2">
            <Label className="text-gray-300">Platform</Label>
            <div className="h-11 w-full rounded-lg border border-border/60 bg-input/30 px-3 flex items-center text-gray-400 cursor-not-allowed">
              {product.platform}
            </div>
            <p className="text-xs text-muted-foreground">
              Platform cannot be changed
            </p>
          </div>

          {/* Viewer (Read-only info) */}
          <div className="rounded-lg border border-white/5 bg-white/5 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Viewers</span>
              <span className="text-[#00D3F3] font-medium">
                {product.viewer.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-3">
          <Button
            variant="cyan"
            size="xl"
            onClick={handleSave}
            className="flex-1 sm:flex-none"
          >
            Save Changes
          </Button>
          <Button
            variant="ghost"
            size="xl"
            onClick={onCancel}
            className="flex-1 sm:flex-none border border-border/60"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}