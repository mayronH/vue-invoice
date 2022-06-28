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
          class="status-badge"
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
.invoice-details {
  flex-basis: 60%;
}
.invoice-status {
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
@media screen and (max-width: 545px) {
  .invoice {
    font-size: 0.75rem;
  }
  .price {
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 425px) {
  .invoice-content {
    flex-direction: column;
  }
  .invoice-details,
  .invoice-status {
    justify-content: space-evenly;

    width: 100%;
  }

  .invoice-status {
    margin-top: var(--small-size-fluid);
  }

  .price {
    font-size: 1.125rem;
  }
}
</style>
