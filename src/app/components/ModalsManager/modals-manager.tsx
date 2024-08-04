'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { atom, createStore, Provider, useAtom, useSetAtom } from 'jotai'

interface ConfirmModalOptions {
  title: string
  description?: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

const confimModalsAtom = atom<ConfirmModalOptions[]>([])
const currentModalAtom = atom<ConfirmModalOptions | null>((get) => get(confimModalsAtom)[0] || null)

const modalsStore = createStore()

function Modals() {
  const setModals = useSetAtom(confimModalsAtom)
  const [currentConfirmModal] = useAtom(currentModalAtom)
  if (!currentConfirmModal) return null
  return (
    <AlertDialog
      open={currentConfirmModal !== null}
      onOpenChange={(open) => {
        if (!open) {
          currentConfirmModal.onCancel?.()
          setModals((prev) => prev.slice(1))
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{currentConfirmModal.title}</AlertDialogTitle>
          <AlertDialogDescription>{currentConfirmModal.description}</AlertDialogDescription>
        </AlertDialogHeader>
        {currentConfirmModal.message || null}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              currentConfirmModal.onCancel?.()
            }}
          >
            {currentConfirmModal.cancelLabel || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              currentConfirmModal.onConfirm()
            }}
          >
            {currentConfirmModal.confirmLabel || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const openConfirmModal = (options: ConfirmModalOptions) => {
  modalsStore.set(confimModalsAtom, (prev) => [options, ...prev])
}

export default function ModalsManager() {
  return (
    <Provider store={modalsStore}>
      <Modals />
    </Provider>
  )
}
