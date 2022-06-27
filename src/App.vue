<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import NavigationComponent from './components/NavigationComponent.vue'
import InvoiceModal from './components/InvoiceModal.vue'
import AlertModal from './components/AlertModal.vue'
import { useModalStore } from './stores/modal'
import { useInvoiceStore } from './stores/invoice'
import Loading from './components/LoadingComponent.vue'

const mobile = ref<boolean>(false)

const modalStore = useModalStore()
const invoiceStore = useInvoiceStore()

function checkScreenSize() {
  const windowWidth = window.innerWidth
  if (windowWidth < 320) {
    mobile.value = true
    return
  }
  mobile.value = false
}

onBeforeMount(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  invoiceStore.getInvoices
})
</script>

<template>
  <div v-if="!mobile" class="app">
    <NavigationComponent />

    <Loading v-show="!invoiceStore.invoicesLoaded" />

    <div v-if="invoiceStore.invoicesLoaded" class="app-content">
      <AlertModal v-if="modalStore.alertModal" />

      <transition name="invoice">
        <InvoiceModal v-if="modalStore.invoiceModal" />
      </transition>

      <router-view />
    </div>
  </div>

  <div v-else class="message-mobile">
    <h2>Sorry, but the app cannot support such small screen size</h2>
    <p>Try it in another device</p>
  </div>
</template>

<style>
.app {
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-auto-rows: min-content;

  height: 100vh;
}

.app-content {
  position: relative;
}

.message-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  text-align: center;

  height: 100vh;
}

main.content {
  display: grid;
  place-items: center;

  margin-block: var(--small-size-fluid);
  padding-inline: var(--medium-size-fluid);
}

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translate3d(-700px, 0, 0);
}

.buttons {
  display: flex;
  justify-content: space-between;

  margin-block: var(--small-size-fluid);
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

.status-badge {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--extra-small-size-fluid) var(--small-size-fluid);

  border-radius: var(--border-radius);
}

.status-badge span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-weight: 600;
}

.status-badge span::before {
  content: '';

  border: 10px solid var(--white);
  border-radius: 100vw;
}

.paid {
  background-color: var(--accent);

  color: var(--bg-dark);
}

.paid span::before {
  border-color: var(--bg-dark);
}

.draft {
  background-color: var(--accent4);
}

.pending {
  background-color: var(--accent3);
}
</style>
