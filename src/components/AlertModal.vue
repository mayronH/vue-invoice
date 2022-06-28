<script setup lang="ts">
import { useInvoiceStore } from '../stores/invoice'
import { useModalStore } from '../stores/modal'

const modalStore = useModalStore()

function closeAlertModal() {
  modalStore.toggleAlertModal()
}

function closeInvoiceModal() {
  modalStore.toggleAlertModal()
  modalStore.toggleInvoiceModal()

  const invoiceStore = useInvoiceStore()
  if (invoiceStore.editInvoice) invoiceStore.toggleEdit()
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved</p>
      <div class="buttons">
        <button
          class="button btn-return"
          type="button"
          @click="closeAlertModal()"
        >
          Return
        </button>

        <button
          class="button btn-close"
          type="button"
          @click="closeInvoiceModal()"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.4);

  transition: all 0.4s;
}
.modal-content {
  position: relative;

  width: 480px;
  max-width: 90%;

  padding: var(--medium-size-fluid);

  background: var(--bg-medium);

  color: var(--white);

  box-shadow: var(--box-shadow);

  border-radius: var(--border-radius);
}
p {
  text-align: center;
}
.buttons {
  justify-content: center;
  gap: var(--extra-small-size-fluid);
}
.buttons .button {
  flex: 1;
}
.btn-close {
  background-color: var(--accent2);

  color: var(--white);
}
.btn-return {
  background-color: var(--accent3);

  color: var(--white);
}
</style>
