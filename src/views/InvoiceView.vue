<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useInvoiceStore } from '../stores/invoice'
import { Invoice } from '../types'

const currentInvoice = ref<Invoice>({
  invoiceId: '',
  billerStreetAddress: '',
  billerCity: '',
  billerZipCode: '',
  billerCountry: '',
  clientName: '',
  clientEmail: '',
  clientStreetAddress: '',
  clientCity: '',
  clientZipCode: '',
  clientCountry: '',
  invoiceDateUnix: new Date(),
  invoiceDate: '',
  paymentTerms: '',
  paymentDueDateUnix: new Date(),
  paymentDueDate: '',
  productDescription: '',
  invoicePending: false,
  invoiceDraft: false,
  invoiceItemList: [],
  invoiceTotal: 0,
  invoicePaid: false,
  docId: '',
})

const invoiceStore = useInvoiceStore()
const route = useRoute()

function getCurrentInvoice() {
  invoiceStore.getCurrentInvoice(route.params.invoiceId)
  currentInvoice.value = invoiceStore.currentInvoiceArray[0]
}

onBeforeMount(() => getCurrentInvoice())

function toggleEditInvoice(invoiceId: string) {
  console.log(invoiceId)
}

function deleteInvoice(invoiceId: string) {
  console.log(invoiceId)
}
function updateStatusToPaid(invoiceId: string) {
  ;(currentInvoice.value.invoiceDraft = false),
    (currentInvoice.value.invoicePending = false),
    (currentInvoice.value.invoicePaid = true)
}
function updateStatusToPending(invoiceId: string) {
  ;(currentInvoice.value.invoiceDraft = false),
    (currentInvoice.value.invoicePending = true),
    (currentInvoice.value.invoicePaid = false)
}
</script>

<template>
  <main v-if="currentInvoice" class="content">
    <router-link class="nav-link" :to="{ name: 'home' }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
      Go Back
    </router-link>

    <header class="header">
      <div class="status">
        <span>Status</span>
        <div
          class="status-badge"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>

      <div class="actions">
        <button
          class="button btn-edit"
          type="button"
          @click="toggleEditInvoice(currentInvoice.invoiceId)"
        >
          Edit
        </button>
        <button
          class="button btn-delete"
          type="button"
          @click="deleteInvoice(currentInvoice.invoiceId)"
        >
          Delete
        </button>
        <button
          v-if="currentInvoice.invoicePending"
          class="button btn-paid"
          type="button"
          @click="updateStatusToPaid(currentInvoice.invoiceId)"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          class="button btn-pending"
          type="button"
          @click="updateStatusToPending(currentInvoice.invoiceId)"
        >
          Mark as Pending
        </button>
      </div>
    </header>

    <main class="invoice-details">
      <section class="header">
        <div class="product-description">
          <p><span>#</span> {{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>

        <div class="biller-details">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </section>

      <section class="payment-info">
        <div class="payment">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoice.invoiceDate }}</p>

          <h4>Payment Date</h4>
          <p>{{ currentInvoice.paymentDueDate }}</p>
        </div>

        <div class="bill">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>

        <div class="sent-to">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </section>

      <section class="invoice-items">
        <div class="billing-items">
          <div class="heading">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item"
          >
            <p>{{ item.name }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total">
          <p>Amount Due</p>
          <p>{{ currentInvoice.invoiceTotal }}</p>
        </div>
      </section>
    </main>
  </main>
</template>

<style scoped>
.nav-link {
  color: var(--grey);
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  justify-self: flex-start;
}
.nav-link:is(:hover, :focus) {
  color: var(--accent);
}
.nav-link svg {
  height: 20px;
  width: 20px;
}
.content header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-block: var(--small-size-fluid);

  border-radius: var(--border-radius);

  background-color: var(--bg-medium);

  padding: var(--small-size-fluid) var(--medium-size-fluid);
}
.status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  flex-basis: 40%;
}
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  flex-basis: 60%;
}
.btn-delete {
  background-color: var(--accent2);

  color: var(--white);
}
.btn-paid {
  background-color: var(--accent);
}
.btn-pending {
  background-color: var(--accent3);

  color: var(--white);
}
.btn-edit {
  background-color: var(--bg-lighter);

  color: var(--white);
}
.invoice-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;

  border-radius: var(--border-radius);

  background-color: var(--bg-medium);

  padding: var(--medium-size-fluid);
}
.invoice-details .header,
.payment-info,
.invoice-items {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}
.product-description p:first-child {
  font-size: var(--medium-size-fluid);
}
.product-description p:first-child span {
  color: var(--grey);
}
.biller-details {
  text-align: right;
  line-height: 1.5rem;
}
.payment-info {
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--extra-large-size-fluid);

  padding-block: var(--large-size-fluid);
}
.payment-info h4 {
  font-weight: 300;
  margin-bottom: var(--extra-small-size-fluid);
}
.payment {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-self: stretch;
}
.payment h4:first-child {
  margin-bottom: 0;
}
.payment p,
.bill p:first-of-type,
.sent-to p {
  font-size: 1.25rem;
  font-weight: 600;

  margin-bottom: var(--extra-small-size-fluid);
}
.payment p:last-child {
  margin-bottom: 0;
}
.invoice-items {
  flex-direction: column;

  background-color: var(--bg-lighter);

  border-radius: var(--border-radius);

  padding-top: var(--small-size-fluid);
}
.billing-items {
  width: 100%;
}
.heading,
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: var(--small-size-fluid) var(--medium-size-fluid);

  border-bottom: 1px solid var(--bg-dark);
}
.heading p:first-child,
.item p:first-child {
  flex-basis: 60%;
}
.total {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: var(--medium-size-fluid);

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  background-color: var(--bg-dark);
}
</style>
