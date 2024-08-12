import { useState } from "react";

export default function useDeleteDialog() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function openDeleteDialog() {
    setIsDeleteDialogOpen(() => true);
    document.getElementById("delete-dialog")?.showModal();
  }

  function closeDeleteDialog() {
    setIsDeleteDialogOpen(() => false);
    document.getElementById("delete-dialog")?.close();
  }
  return { isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog };
}
