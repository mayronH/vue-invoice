<script setup lang="ts">
import { PropType } from 'vue'
import { Invoice } from '../types'

const props = defineProps({
  invoice: {
    type: Object as PropType<Invoice>,
    required: true,
  },
})
</script>

<template>
  <router-link
    class="invoice"
    :to="{ name: 'Invoice', params: { invoiceId: props.invoice.invoiceId } }"
  >
    <div class="invoice-content">
      <div class="invoice-details">
        <span class="tracking-number">#{{ props.invoice.invoiceId }}</span>
        <span class="due-date">{{ props.invoice.paymentDueDate }}</span>
        <span class="person">{{ props.invoice.clientName }}</span>
      </div>

      <div class="invoice-status">
        <span class="price">${{ props.invoice.invoiceTotal }}</span>

        <div
          class="status-button"
          :class="{
            paid: props.invoice.invoicePaid,
            draft: props.invoice.invoiceDraft,
            pending: props.invoice.invoicePending,
          }"
        >
          <span v-if="props.invoice.invoicePaid">Paid</span>
          <span v-if="props.invoice.invoiceDraft">Draft</span>
          <span v-if="props.invoice.invoicePending">Pending</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.invoice {
  text-decoration: none;
  color: inherit;
}

.invoice-content {
  border-radius: var(--border-radius);

  background-color: var(--bg-lighter);

  padding: var(--small-size-fluid);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invoice-details,
.invoice-status {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.invoice-details{
  flex-basis: 60%;
}

.invoice-status{
  flex-basis: 40%;
}

.tracking-number {
  color: var(--grey);
}

.person {
  text-transform: capitalize;
}

.price {
  font-size: 1.125rem;
  font-weight: 600;
}

.status-button {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);

  border-radius: var(--border-radius);
}

.status-button span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-weight: 600;
}

.status-button span::before {
  content: '';

  border: 10px solid var(--white);
  border-radius: 100vw;
}

.paid {
  background-color: var(--accent);
}

.draft {
  background-color: var(--accent4);
}

.pending {
  background-color: var(--accent3);
}
</style>
