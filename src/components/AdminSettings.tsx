import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useCaptcha } from "@/contexts/CaptchaContext";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Settings,
  Users,
  Plus,
  Trash2,
  Shield,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const AdminSettings = () => {
  const { currentUser, admins, addAdmin, removeAdmin } = useAdmin();
  const {
    isEnabled: isCaptchaEnabled,
    toggleCaptcha,
    isSiteGateEnabled,
    toggleSiteGate,
  } = useCaptcha();
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    role: "admin" as "admin" | "super-admin",
  });

  const handleAddAdmin = () => {
    if (!newAdmin.username || !newAdmin.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addAdmin(newAdmin.username, newAdmin.password, newAdmin.role);
    setNewAdmin({ username: "", password: "", role: "admin" });
    setShowAddAdmin(false);

    toast({
      title: "Admin Added",
      description: `User ${newAdmin.username} has been added as ${newAdmin.role}`,
    });
  };

  const handleRemoveAdmin = (id: string) => {
    if (id === currentUser?.id) {
      toast({
        title: "Error",
        description: "You cannot remove yourself",
        variant: "destructive",
      });
      return;
    }

    removeAdmin(id);
    toast({
      title: "Admin Removed",
      description: "Admin user has been removed",
      variant: "destructive",
    });
  };

  const canManageAdmins = currentUser?.role === "super-admin";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Settings</span>
          </CardTitle>
          <CardDescription>
            Configure system preferences and manage admin users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Session Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Session</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Username:
                  </span>
                  <span className="text-sm font-medium">
                    {currentUser?.username}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <Badge variant="outline">{currentUser?.role}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Login:
                  </span>
                  <span className="text-sm font-medium">
                    {currentUser?.lastLogin?.toLocaleString() || "Now"}
                  </span>
                </div>
              </div>
            </div>

            {/* Default Credentials */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Credentials</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Super Admin:</strong>
                    <br />
                    Username: admin | Password: trackair2024
                  </div>
                  <div>
                    <strong>Manager:</strong>
                    <br />
                    Username: manager | Password: manager123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>
            Configure security features and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium flex items-center space-x-2">
                {isSiteGateEnabled ? (
                  <Lock className="h-4 w-4 text-status-ontime" />
                ) : (
                  <Unlock className="h-4 w-4 text-status-delayed" />
                )}
                <span>Site Verification Gate</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                {isSiteGateEnabled
                  ? "Cloudflare-style verification is enabled - visitors must verify before accessing site"
                  : "Site verification is disabled - visitors can access site directly"}
              </p>
            </div>
            <Button
              onClick={toggleSiteGate}
              variant={isSiteGateEnabled ? "destructive" : "default"}
              size="sm"
            >
              {isSiteGateEnabled ? "Disable Gate" : "Enable Gate"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium flex items-center space-x-2">
                {isCaptchaEnabled ? (
                  <Lock className="h-4 w-4 text-status-ontime" />
                ) : (
                  <Unlock className="h-4 w-4 text-status-delayed" />
                )}
                <span>Form Captcha Protection</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                {isCaptchaEnabled
                  ? "Captcha verification is currently enabled for admin login and forms"
                  : "Captcha verification is currently disabled - forms are less secure"}
              </p>
            </div>
            <Button
              onClick={toggleCaptcha}
              variant={isCaptchaEnabled ? "destructive" : "default"}
              size="sm"
            >
              {isCaptchaEnabled ? "Disable" : "Enable"}
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Security Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Site Access:</span>
                <span
                  className={
                    isSiteGateEnabled
                      ? "text-status-ontime"
                      : "text-status-delayed"
                  }
                >
                  {isSiteGateEnabled ? "Gate Protected" : "Direct Access"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Admin Login:</span>
                <span
                  className={
                    isCaptchaEnabled
                      ? "text-status-ontime"
                      : "text-status-delayed"
                  }
                >
                  {isCaptchaEnabled ? "Captcha Protected" : "Unprotected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Forms:</span>
                <span
                  className={
                    isCaptchaEnabled
                      ? "text-status-ontime"
                      : "text-status-delayed"
                  }
                >
                  {isCaptchaEnabled ? "Captcha Protected" : "Unprotected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Overall Level:</span>
                <span
                  className={
                    isSiteGateEnabled && isCaptchaEnabled
                      ? "text-status-ontime"
                      : isSiteGateEnabled || isCaptchaEnabled
                        ? "text-status-delayed"
                        : "text-status-cancelled"
                  }
                >
                  {isSiteGateEnabled && isCaptchaEnabled
                    ? "Maximum"
                    : isSiteGateEnabled || isCaptchaEnabled
                      ? "Medium"
                      : "Basic"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin User Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Admin Users</span>
              </CardTitle>
              <CardDescription>
                Manage admin accounts and permissions
              </CardDescription>
            </div>
            {canManageAdmins && (
              <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                    <DialogDescription>
                      Create a new admin user account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-username">Username</Label>
                      <Input
                        id="new-username"
                        value={newAdmin.username}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, username: e.target.value })
                        }
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newAdmin.password}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, password: e.target.value })
                        }
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-role">Role</Label>
                      <Select
                        value={newAdmin.role}
                        onValueChange={(value: "admin" | "super-admin") =>
                          setNewAdmin({ ...newAdmin, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="super-admin">
                            Super Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddAdmin(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddAdmin}>Add Admin</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                {canManageAdmins && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>{admin.username}</span>
                      {admin.id === currentUser?.id && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{admin.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-status-ontime text-white"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  {canManageAdmins && (
                    <TableCell>
                      {admin.id !== "1" && admin.id !== currentUser?.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!canManageAdmins && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                You need Super Admin privileges to manage admin users.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
