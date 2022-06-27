<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import NavigationComponent from './components/NavigationComponent.vue'
import InvoiceModal from './components/InvoiceModal.vue'
import { useModalStore } from './stores/modal'

const mobile = ref<boolean>(false)

const modalStore = useModalStore()

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
})
</script>

<template>
  <div v-if="!mobile" class="app">
    <NavigationComponent />

    <div class="app-content">
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

.invoice-enter-from, .invoice-leave-to {
  transform: translate3d(-700px, 0, 0);
}
</style>
