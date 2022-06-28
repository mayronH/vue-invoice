<script setup lang="ts"></script>

<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<style scoped>
.loading {
  position: absolute;
  inset: 0;
  z-index: 100;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: not-allowed;
}
span {
  display: block;

  width: 60px;
  height: 60px;

  border: 3px solid transparent;
  border-top-color: var(--white);
  border-bottom-color: var(--white);
  border-radius: 50%;

  -webkit-animation: spin ease 1s infinite;
  animation: spin ease 1s infinite;
}
@-webkit-keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
