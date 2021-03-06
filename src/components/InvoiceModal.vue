<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useModalStore } from '../stores/modal'
import { Invoice } from '../types'
import { uid } from 'uid'
import app from '../firebase/firebaseInit'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import Loading from './LoadingComponent.vue'
import { useInvoiceStore } from '../stores/invoice'

const invoice = ref<Invoice>({
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

const loading = ref(false)

const modalStore = useModalStore()
const invoiceStore = useInvoiceStore()

onMounted(() => {
  if (!invoiceStore.editInvoice) {
    invoice.value.invoiceDate = new Date(
      invoice.value.invoiceDateUnix
    ).toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (invoiceStore.editInvoice) {
    const currentInvoice = invoiceStore.currentInvoiceArray[0]

    invoice.value.invoiceId = currentInvoice.invoiceId
    invoice.value.billerStreetAddress = currentInvoice.billerStreetAddress
    invoice.value.billerCity = currentInvoice.billerCity
    invoice.value.billerZipCode = currentInvoice.billerZipCode
    invoice.value.billerCountry = currentInvoice.billerCountry
    invoice.value.clientName = currentInvoice.clientName
    invoice.value.clientEmail = currentInvoice.clientEmail
    invoice.value.clientStreetAddress = currentInvoice.clientStreetAddress
    invoice.value.clientCity = currentInvoice.clientCity
    invoice.value.clientZipCode = currentInvoice.clientZipCode
    invoice.value.clientCountry = currentInvoice.clientCountry
    invoice.value.invoiceDateUnix = currentInvoice.invoiceDateUnix
    invoice.value.invoiceDate = currentInvoice.invoiceDate
    invoice.value.paymentTerms = currentInvoice.paymentTerms
    invoice.value.paymentDueDateUnix = currentInvoice.paymentDueDateUnix
    invoice.value.paymentDueDate = currentInvoice.paymentDueDate
    invoice.value.productDescription = currentInvoice.productDescription
    invoice.value.invoicePending = currentInvoice.invoicePending
    invoice.value.invoiceDraft = currentInvoice.invoiceDraft
    invoice.value.invoiceItemList = currentInvoice.invoiceItemList
    invoice.value.invoiceTotal = currentInvoice.invoiceTotal
    invoice.value.invoicePaid = currentInvoice.invoicePaid
    invoice.value.docId = currentInvoice.docId
  }
})

watch(
  // watch a ref
  () => {
    return invoice.value.paymentTerms
  },
  () => {
    invoice.value.paymentDueDateUnix = new Date(
      Date.now() + parseInt(invoice.value.paymentTerms) * 24 * 60 * 60 * 1000
    )

    invoice.value.paymentDueDate = new Date(
      invoice.value.paymentDueDateUnix
    ).toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
)

function checkClick(e: Event) {
  if (e.target === document.querySelector('.invoice-wrapper')) {
    modalStore.toggleAlertModal()
  }
}

function deleteInvoiceItem(id: string) {
  invoice.value.invoiceItemList = invoice.value.invoiceItemList.filter(
    (item) => item.id !== id
  )
}

function addNewInvoiceItem() {
  invoice.value.invoiceItemList.push({
    id: uid(),
    name: '',
    qty: 0,
    price: 0,
    total: 0,
  })
}

function saveDraft() {
  invoice.value.invoiceDraft = true
}

function publishInvoice() {
  invoice.value.invoicePending = true
}

function calcInvoiceTotal() {
  invoice.value.invoiceTotal = 0

  invoice.value.invoiceItemList.forEach((item) => {
    invoice.value.invoiceTotal += item.total
  })
}

async function uploadInvoice() {
  if (invoice.value.invoiceItemList.length <= 0) {
    alert('Please ensure you filled out the items')
    return
  }

  loading.value = true

  calcInvoiceTotal()

  const db = getFirestore(app)

  await addDoc(collection(db, 'invoices'), {
    invoiceId: uid(6),
    billerStreetAddress: invoice.value.billerStreetAddress,
    billerCity: invoice.value.billerCity,
    billerZipCode: invoice.value.billerZipCode,
    billerCountry: invoice.value.billerCountry,
    clientName: invoice.value.clientName,
    clientEmail: invoice.value.clientEmail,
    clientStreetAddress: invoice.value.clientStreetAddress,
    clientCity: invoice.value.clientCity,
    clientZipCode: invoice.value.clientZipCode,
    clientCountry: invoice.value.clientCountry,
    invoiceDateUnix: invoice.value.invoiceDateUnix,
    invoiceDate: invoice.value.invoiceDate,
    paymentTerms: invoice.value.paymentTerms,
    paymentDueDateUnix: invoice.value.paymentDueDateUnix,
    paymentDueDate: invoice.value.paymentDueDate,
    productDescription: invoice.value.productDescription,
    invoicePending: invoice.value.invoicePending,
    invoiceDraft: invoice.value.invoiceDraft,
    invoiceItemList: invoice.value.invoiceItemList,
    invoiceTotal: invoice.value.invoiceTotal,
    invoicePaid: false,
  })

  invoiceStore.getInvoices()

  loading.value = false

  modalStore.toggleInvoiceModal()
}

async function updateInvoice() {
  if (invoice.value.invoiceItemList.length <= 0) {
    alert('Please ensure you filled out the items')
    return
  }

  loading.value = true

  calcInvoiceTotal()

  const db = getFirestore(app)

  await updateDoc(doc(db, 'invoices', invoice.value.docId), {
    billerStreetAddress: invoice.value.billerStreetAddress,
    billerCity: invoice.value.billerCity,
    billerZipCode: invoice.value.billerZipCode,
    billerCountry: invoice.value.billerCountry,
    clientName: invoice.value.clientName,
    clientEmail: invoice.value.clientEmail,
    clientStreetAddress: invoice.value.clientStreetAddress,
    clientCity: invoice.value.clientCity,
    clientZipCode: invoice.value.clientZipCode,
    clientCountry: invoice.value.clientCountry,
    invoiceDateUnix: invoice.value.invoiceDateUnix,
    invoiceDate: invoice.value.invoiceDate,
    paymentTerms: invoice.value.paymentTerms,
    paymentDueDateUnix: invoice.value.paymentDueDateUnix,
    paymentDueDate: invoice.value.paymentDueDate,
    productDescription: invoice.value.productDescription,
    invoiceItemList: invoice.value.invoiceItemList,
    invoiceTotal: invoice.value.invoiceTotal,
  })

  loading.value = false

  await invoiceStore.updateInvoice(invoice.value.docId, invoice.value.invoiceId)

  modalStore.toggleInvoiceModal()
}

function submitForm() {
  if (!invoiceStore.editInvoice) {
    uploadInvoice()
    return
  }

  updateInvoice()
}

function closeModal() {
  modalStore.toggleInvoiceModal()
  if (invoiceStore.editInvoice) invoiceStore.toggleEdit()
}
</script>

<template>
  <div class="invoice-wrapper" @click="checkClick">
    <form class="invoice-content" @submit.prevent="submitForm">
      <Loading v-show="loading" />
      <h1 v-if="!invoiceStore.editInvoice">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>

      <div class="bill-from">
        <h2>Bill From</h2>
        <div class="input">
          <label for="billerCity">Street Address</label>
          <input
            id="billerStreetAddress"
            v-model="invoice.billerStreetAddress"
            required
            type="text"
          />
        </div>

        <div class="inline-input">
          <div class="input">
            <label for="billerCity">City</label>
            <input
              id="billerCity"
              v-model="invoice.billerCity"
              required
              type="text"
            />
          </div>

          <div class="input">
            <label for="billerZipCode">Zip Code</label>
            <input
              id="billerZipCode"
              v-model="invoice.billerZipCode"
              required
              type="text"
            />
          </div>

          <div class="input">
            <label for="billerCountry">Country</label>
            <input
              id="billerCountry"
              v-model="invoice.billerCountry"
              required
              type="text"
            />
          </div>
        </div>
      </div>

      <div class="bill-to">
        <h2>Bill To</h2>
        <div class="input">
          <label for="clientName">Client's Name</label>
          <input
            id="clientName"
            v-model="invoice.clientName"
            required
            type="text"
          />
        </div>

        <div class="input">
          <label for="clientEmail">Client's E-mail</label>
          <input
            id="clientEmail"
            v-model="invoice.clientEmail"
            required
            type="email"
          />
        </div>

        <div class="input">
          <label for="clientStreetAddress">Street Address</label>
          <input
            id="clientStreetAddress"
            v-model="invoice.clientStreetAddress"
            required
            type="text"
          />
        </div>

        <div class="inline-input">
          <div class="input">
            <label for="clientCity">City</label>
            <input
              id="clientCity"
              v-model="invoice.clientCity"
              required
              type="text"
            />
          </div>

          <div class="input">
            <label for="clientZipCode">Zip Code</label>
            <input
              id="clientZipCode"
              v-model="invoice.clientZipCode"
              required
              type="text"
            />
          </div>

          <div class="input">
            <label for="clientCountry">Country</label>
            <input
              id="clientCountry"
              v-model="invoice.clientCountry"
              required
              type="text"
            />
          </div>
        </div>
      </div>

      <div class="invoice-work">
        <div class="payment">
          <div class="input">
            <label for="invoiceDate">Invoice Date</label>
            <input
              id="invoiceDate"
              v-model="invoice.invoiceDate"
              disabled
              type="text"
            />
          </div>

          <div class="input">
            <label for="paymentDueDate">Payment Due</label>
            <input
              id="paymentDueDate"
              v-model="invoice.paymentDueDate"
              disabled
              type="text"
            />
          </div>
        </div>

        <div class="input">
          <label for="paymentTerms">Payment Terms</label>
          <div class="select">
            <select id="paymentTerms" v-model="invoice.paymentTerms" required>
              <option value="30">Net 30 days</option>
              <option value="60">Net 60 days</option>
            </select>
          </div>
        </div>

        <div class="input">
          <label for="productDescription">Product Description</label>
          <input
            id="productDescription"
            v-model="invoice.productDescription"
            required
            type="text"
          />
        </div>

        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading">
              <th class="item-name">Item Name</th>
              <th class="item-qty">Qty</th>
              <th class="item-price">Price</th>
              <th class="item-total">Total</th>
            </tr>

            <tr
              v-for="(item, index) in invoice.invoiceItemList"
              :key="index"
              class="table-items"
            >
              <td class="item-name">
                <input v-model="item.name" type="text" />
              </td>
              <td class="item-qty">
                <input v-model="item.qty" type="text" />
              </td>
              <td class="item-price">
                <input v-model="item.price" type="text" />
              </td>
              <td class="item-total">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <td class="item-delete">
                <div class="delete" @click="deleteInvoiceItem(item.id)">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          </table>

          <button
            type="button"
            class="button button-item"
            @click="addNewInvoiceItem"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>

            Add New Item
          </button>
        </div>

        <div class="buttons">
          <button class="button btn-cancel" type="button" @click="closeModal">
            Cancel
          </button>

          <div class="buttons-save">
            <button
              v-if="!invoiceStore.editInvoice"
              class="button btn-draft"
              type="submit"
              @click="saveDraft"
            >
              Save Draft
            </button>
            <button
              v-if="!invoiceStore.editInvoice"
              class="button btn-submit"
              type="submit"
              @click="publishInvoice"
            >
              Create Invoice
            </button>
            <button
              v-else
              class="button btn-submit"
              type="submit"
              @click="publishInvoice"
            >
              Update Invoice
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.invoice-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;

  background-color: transparent;

  width: 100%;
}
.invoice-content {
  position: relative;

  padding: var(--small-size-fluid) var(--medium-size-fluid);

  background-color: var(--bg-dark);

  max-width: 700px;
  width: 100%;

  box-shadow: var(--box-shadow);
}
h2 {
  margin-top: var(--extra-small-size-fluid);
  margin-bottom: var(--small-size-fluid);
}
h3 {
  margin-block: var(--extra-small-size-fluid);
}
.input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;

  margin-bottom: var(--extra-small-size-fluid);
}
.inline-input,
.payment {
  display: flex;
  flex-direction: row;
  gap: var(--extra-small-size-fluid);
}
label {
  color: var(--grey);
}
input {
  color: var(--white);

  background-color: var(--bg-medium);

  border: none;

  padding: 0.25rem var(--extra-small-size-fluid);

  width: 100%;
}
table {
  width: 100%;

  margin-bottom: var(--small-size-fluid);
}
.table-heading,
.table-items {
  font-size: 0.75rem;

  display: flex;
  gap: 1rem;
}
.item-name {
  flex-basis: 50%;
}
.item-qty {
  flex-basis: 10%;
}
.item-price {
  flex-basis: 20%;
}
.item-total {
  flex-basis: 20%;
  align-self: center;
}
.item-delete {
  align-self: center;
}
.table-items {
  margin-block: var(--extra-small-size-fluid);
}
.table-items .item-total {
  text-align: right;
}
.table-items input {
  padding-block: var(--extra-small-size-fluid);
}
.button svg,
.delete svg {
  height: 20px;
  width: 20px;
}
.button-item {
  background-color: var(--bg-medium);

  color: var(--white);

  width: 100%;
}
.buttons-save {
  display: flex;
  gap: var(--small-size-fluid);
}
.btn-cancel {
  background-color: var(--accent2);

  color: var(--white);
}
.btn-draft {
  background-color: var(--accent4);

  color: var(--white);
}
.btn-submit {
  background-color: var(--accent3);

  color: var(--white);
}
</style>
