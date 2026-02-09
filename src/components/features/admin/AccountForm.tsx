"use client";

import { useState } from "react";
import { type CreateAccount } from "@/schemas";
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
import { Shield, User } from "lucide-react";

interface AccountFormProps {
  formData: CreateAccount;
  onFormDataChange: (data: CreateAccount) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  editingAccount?: any;
}

export function AccountForm({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isSubmitting,
  editingAccount,
}: Readonly<AccountFormProps>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role Selection */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value: any) => 
            onFormDataChange({ ...formData, role: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </div>
            </SelectItem>
            <SelectItem value="CLIENT">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Client
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Admin accounts have full access to manage the store
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={(e) => 
            onFormDataChange({ ...formData, email: e.target.value })
          }
          required
        />
        {editingAccount && (
          <p className="text-xs text-muted-foreground">
            Email cannot be changed for security reasons
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">
          {editingAccount ? "New Password (optional)" : "Password"}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={
              editingAccount 
                ? "Enter new password to change"
                : "Enter password"
            }
            value={formData.password || ""}
            onChange={(e) => 
              onFormDataChange({ ...formData, password: e.target.value })
            }
            minLength={6}
            required={!editingAccount}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 h-full px-3"
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Password must be at least 6 characters long
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : editingAccount ? "Update Account" : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
