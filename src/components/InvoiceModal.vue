<script setup lang="ts">
import { ref } from 'vue'
import { useModalStore } from '../stores/modal'
import { Invoice } from '../types'
const invoice = ref<Invoice>({
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
  invoiceDateUnix: '',
  invoiceDate: new Date(),
  paymentTerms: '',
  paymentDueDateUnix: '',
  paymentDueDate: new Date(),
  productDescription: '',
  invoicePending: '',
  invoiceDraft: false,
  invoiceItemList: [],
  invoiceTotal: 0,
})

const modalStore = useModalStore()

function checkClick() {
  console.log('wah')
}

function submitForm() {
  console.log('wah')
}

function deleteInvoiceItem(id: number) {
  console.log(id)
}

function addNewInvoiceItem() {
  console.log('wah')
}

function saveDraft() {
  console.log('wah')
}

function publishInvoice() {
  console.log('wah')
}
</script>

<template>
  <div ref="invoiceWrap" class="invoice-wrapper" @click="checkClick">
    <form class="invoice-content" @submit.prevent="submitForm">
      <h1>New Invoice</h1>

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
          <button
            class="button btn-cancel"
            type="button"
            @click="modalStore.toggleModal"
          >
            Cancel
          </button>

          <div class="buttons-save">
            <button class="button btn-draft" type="submit" @click="saveDraft">
              Save Draft
            </button>
            <button
              class="button btn-submit"
              type="submit"
              @click="publishInvoice"
            >
              Create Invoice
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

  background-color: transparent;

  width: 100%;
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

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border: none;
  border-radius: 100vw;

  box-shadow: var(--box-shadow);

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);

  font-size: 1.125rem;
  font-weight: 600;
}

.button svg {
  height: 20px;
  width: 20px;
}

.button-item {
  background-color: var(--bg-medium);

  color: var(--white);

  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-between;

  margin-block: var(--small-size-fluid);
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

@media (min-width: 900px) {
  .invoice-content {
    position: relative;

    padding: var(--small-size-fluid) var(--medium-size-fluid);

    background-color: var(--bg-dark);

    max-width: 700px;
    width: 100%;

    box-shadow: var(--box-shadow);
  }
}
</style>
