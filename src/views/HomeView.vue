<script setup lang="ts">
import { useModalStore } from '../stores/modal';

const modalStore = useModalStore()
</script>
<template>
  <main class="content">
    <header>
      <div class="description">
        <h2>Invoices</h2>
        <p>There are X total invoices</p>
      </div>
      <div class="actions">
        <div class="filter">
          <label for="filter">Filter By Status</label>
          <div class="select">
            <select id="filter" name="">
              <option value="null">Filter By Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="clear">Clear Filter</option>
            </select>
          </div>
        </div>
        <button class="new-invoice" type="button" @click="modalStore.toggleInvoiceModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          New Invoice
        </button>
      </div>
    </header>

  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;

  width: 100%;
}

.description h2 {
  font-size: var(--medium-size-fluid);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--extra-small-size-fluid);
}
.filter {
  display: flex;
  flex-direction: column;
}

.filter label{
  opacity: 0;
  visibility: hidden;
  position: absolute;

  transform: translate3d(-999px, -999px, 0);
}
.new-invoice {
  background-color: var(--accent3);

  border: none;
  border-radius: 100vw;

  text-align: center;
  color: var(--white);
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--extra-small-size-fluid);

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);
}

.new-invoice svg {
  width: 30px;
  height: 30px;
}
</style>
