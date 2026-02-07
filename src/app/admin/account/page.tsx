"use client";

import { useState, useEffect } from "react";
import {
  useAccounts,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
} from "@/hooks/useAccount";
import { type Account, type CreateAccount, type Role } from "@/schemas";
import { AccountCard } from "@/components/features/admin/AccountCard";
import { SearchFilter } from "@/components/features/admin/SearchFilter";
import { PaginationControls } from "@/components/features/admin/PaginationControls";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Loader2, Users } from "lucide-react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 8;

export default function AdminAccountPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState<CreateAccount>({
    email: "",
    password: "",
    role: "CLIENT",
  });

  // Fetch data
  const { data: accounts, isLoading } = useAccounts();

  // Mutations
  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();
  const deleteMutation = useDeleteAccount();

  // Filter accounts
  const filteredAccounts = (accounts || []).filter((account) => {
    const matchesSearch =
      searchQuery === "" ||
      account.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || account.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole]);

  const resetForm = () => {
    setFormData({ email: "", password: "", role: "CLIENT" });
    setEditingAccount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAccount) {
        await updateMutation.mutateAsync({
          id: editingAccount.id.toString(),
          updates: { email: formData.email, role: formData.role },
        });
        toast.success("Account updated successfully!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Account created successfully!");
      }
      resetForm();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Failed to save account.");
    }
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      email: account.email,
      password: "",
      role: account.role,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this account?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
  };

  const formatRoleBadgeVariant = (
    role: Role,
  ): "default" | "destructive" | "outline" | "secondary" => {
    return role === "ADMIN" ? "default" : "secondary";
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Account Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>

        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" className="md:size-default">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Account</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAccount ? "Edit Account" : "Create New Account"}
              </DialogTitle>
              <DialogDescription>
                {editingAccount
                  ? "Update account information"
                  : "Add a new user account"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {!editingAccount && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    minLength={6}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: Role) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLIENT">Client</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {editingAccount ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <SearchFilter
        searchPlaceholder="Search by email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={selectedRole}
        onFilterChange={setSelectedRole}
        filterOptions={[
          { value: "ADMIN", label: "Admin" },
          { value: "CLIENT", label: "Client" },
        ]}
        allOptionLabel="All Roles"
      />

      {/* Accounts List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
              formatRoleBadgeVariant={formatRoleBadgeVariant}
            />
          ))}

          {displayAccounts.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">No accounts found</h3>
              <p>Click "Add Account" to create your first account.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredAccounts.length}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="accounts"
        />
      )}
    </div>
  );
}
