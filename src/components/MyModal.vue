<template>
  <transition name="modal">
    <div class="amodal" v-show="value">
      <transition name="zoom">
        <div class="amodal__container" v-if="value" :style="{ width: width }">
          <div class="amodal__header">
            <div class="aspace-between">
              <div class="amodal__title">{{ title }}</div>
              <!-- emit input event to change v-model data automatically -->
              <div @click="$emit('input', false)" class="amodal__close">
                &times;
              </div>
            </div>
          </div>

          <div class="amodal__body">
            <slot></slot>
          </div>

          <div class="amodal__footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "960px"
    },

    title: {
      type: String,
      default: "Modal title"
    }
  }
};
</script>
