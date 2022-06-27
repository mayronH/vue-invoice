import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    invoiceModal: false,
    alertModal: false,
  }),
  actions: {
    toggleInvoiceModal() {
      this.invoiceModal = !this.invoiceModal
    },

    toggleAlertModal() {
      this.alertModal = !this.alertModal
    },
  },
})
