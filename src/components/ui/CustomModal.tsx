import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function CustomModal({ isOpen, onClose, title, children }: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button onClick={onClose} className="hidden" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
} 