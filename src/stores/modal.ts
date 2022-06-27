import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
    state: () => ({
        invoiceModal: false
    }),
    actions: {
        toggleModal() {
            this.invoiceModal = !this.invoiceModal
        }
    }
})