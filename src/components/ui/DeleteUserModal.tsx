import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DeleteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onUserDeleted: () => void;
}

const DeleteUserModal = ({ open, onOpenChange, user, onUserDeleted }: DeleteUserModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Deleting user:', user.user_id);
      
      // Use edge function to delete user (admin operations need to be server-side)
      const { data: result, error: functionError } = await supabase.functions.invoke('delete-user', {
        body: {
          user_id: user.user_id
        }
      });

      console.log('Delete function result:', result);

      if (functionError) {
        console.error('Function error:', functionError);
        throw functionError;
      }
      
      if (result?.error) {
        console.error('Result error:', result.error);
        throw new Error(result.error);
      }

      toast({
        title: "User deleted successfully",
        description: `${user.first_name} ${user.last_name} has been removed from the system`,
      });

      onUserDeleted();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Delete user error:', error);
      toast({
        title: "Error deleting user",
        description: error.message || "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            <span>Delete User</span>
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user account and all associated data.
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Warning:</strong> Deleting this user will also remove:
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>All batches and submissions</li>
              <li>Associated certificates</li>
              <li>Inspection records</li>
              <li>User profile and settings</li>
            </ul>
          </AlertDescription>
        </Alert>

        {user && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Organization:</strong> {user.organization_name}</p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;