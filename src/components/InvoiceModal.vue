<script setup lang="ts">
import { ref } from 'vue'
import { Invoice } from '../types'
// const invoice = ref<Invoice>({
//   billerStreetAddress: '',
//   billerCity: '',
//   billerZipCode: '',
//   billerCountry: '',
//   clientName: '',
//   clientEmail: '',
//   clientStreetAddress: '',
//   clientCity: '',
//   clientZipCode: '',
//   clientCountry: '',
//   invoiceDateUnix: '',
//   invoiceDate: new Date(),
//   paymentTerms: '',
//   paymentDueDateUnix: '',
//   paymentDueDate: new Date(),
//   productDescription: '',
//   invoicePending: '',
//   invoiceDraft: false,
//   invoiceItemList: [],
//   invoiceTotal: 0,
// })

const invoice = ref<Invoice>()

function checkClick() {
  console.log('wah')
}

function submitForm() {
  console.log('wah')
}
</script>

<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrapper">
    <form @submit.prevent="submitForm" class="invoice-content">
      <h1>New Invoice</h1>

      <div class="bill-from">
        <h2>Bill From</h2>
        <div class="input">
          <label for="billerCity">Street Address</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="invoice?.billerStreetAddress"
          />
        </div>

        <div class="inline-input">
          <div class="input">
            <label for="billerCity">City</label>
            <input
              required
              type="text"
              id="billerCity"
              v-model="invoice?.billerCity"
            />
          </div>

          <div class="input">
            <label for="billerZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="invoice?.billerZipCode"
            />
          </div>

          <div class="input">
            <label for="billerCountry">Country</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="invoice?.billerCountry"
            />
          </div>
        </div>
      </div>

      <div class="bill-to">
        <h2>Bill To</h2>
        <div class="input">
          <label for="clientName">Client's Name</label>
          <input
            required
            type="text"
            id="clientName"
            v-model="invoice?.clientName"
          />
        </div>

        <div class="input">
          <label for="clientEmail">Client's E-mail</label>
          <input
            required
            type="email"
            id="clientEmail"
            v-model="invoice?.clientEmail"
          />
        </div>

        <div class="input">
          <label for="clientStreetAddress">Street Address</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="invoice?.clientStreetAddress"
          />
        </div>

        <div class="inline-input">
          <div class="input">
            <label for="clientCity">City</label>
            <input
              required
              type="text"
              id="clientCity"
              v-model="invoice?.clientCity"
            />
          </div>

          <div class="input">
            <label for="clientZipCode">Zip Code</label>
            <input
              required
              type="text"
              id="clientZipCode"
              v-model="invoice?.clientZipCode"
            />
          </div>

          <div class="input">
            <label for="clientCountry">Country</label>
            <input
              required
              type="text"
              id="clientCountry"
              v-model="invoice?.clientCountry"
            />
          </div>
        </div>
      </div>

      <div class="invoice-work">
        <div class="payment">
          <div class="input">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              v-model="invoice?.invoiceDate"
            />
          </div>

          <div class="input">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="invoice?.paymentDueDate"
            />
          </div>
        </div>

        <div class="input">
          <label for="paymentTerms">Payment Terms</label>
          <select required id="paymentTerms" v-model="invoice?.paymentTerms">
            <option value="30">Net 30 days</option>
            <option value="60">Net 60 days</option>
          </select>
        </div>

        <div class="input">
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="invoice?.productDescription"
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
              class="table-items"
              v-for="(item, index) in invoice?.invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <input type="text" v-model="item.name" />
              </td>
              <td class="item-qty">
                <input type="text" v-model="item.qty" />
              </td>
              <td class="item-price">
                <input type="text" v-model="item.price" />
              </td>
              <td class="item-total">
                ${{ (item.total = item.qty * item.price) }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
