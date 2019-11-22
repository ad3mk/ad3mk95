<template>
  <div class="aalign-center">
    <div v-for="i in 5" :key="i">
      <img
        src="/img/rating-stared.png"
        alt="star"
        class="rating-img"
        @mouseover="upTo = i"
        @mouseleave="upTo=0"
        @click="giveRating(i)"
        v-if="i <= upTo"
      />

      <img
        src="/img/rating-unstared.png"
        alt="star"
        class="rating-img"
        @click="giveRating(i)"
        @mouseover="upTo = i"
        @mouseleave="upTo=0"
        v-else
      />
    </div>
    <div class="rating-value">
      <span>{{ upTo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upTo: 0
    };
  },
  mounted() {
    this.upTo = this.rating;
  },
  methods: {
    giveRating(i) {
      this.$emit("rated", i);
    }
  },
  props: {
    rating: {
      type: Number,
      default: 0
    }
  }
};
</script>