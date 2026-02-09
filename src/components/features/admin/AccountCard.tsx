"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Shield, User } from "lucide-react";
import { type Account, type Role } from "@/schemas";

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  formatRoleBadgeVariant: (
    role: Role,
  ) => "default" | "destructive" | "outline" | "secondary";
}

export function AccountCard({
  account,
  onEdit,
  onDelete,
  isDeleting,
  formatRoleBadgeVariant,
}: Readonly<AccountCardProps>) {
  const formatRole = (role: Role) => {
    return role === "ADMIN" ? "Admin" : "Client";
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Never";
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              {account.role === "ADMIN" ? (
                <Shield className="h-5 w-5 text-blue-600" />
              ) : (
                <User className="h-5 w-5 text-green-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-base">{account.email}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Account ID: {account.id}
              </CardDescription>
            </div>
          </div>

          <Badge variant={formatRoleBadgeVariant(account.role)}>
            {formatRole(account.role)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Created:</span>
            <span className="text-sm font-medium">
              {formatDate(account.createdAt)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Last Activity:
            </span>
            <span className="text-sm font-medium">
              {formatDate(account.updatedAt)}
            </span>
          </div>

          {account.role === "ADMIN" && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Permissions:
              </span>
              <Badge variant="outline" className="text-xs">
                Full Access
              </Badge>
            </div>
          )}
        </div>

        {/* Quick action buttons overlay */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(account)}
            className="flex-1"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(account.id.toString())}
            disabled={isDeleting}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
