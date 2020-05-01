<template>
  <div class="home" key="page">
    <div :class="['home__cards', { 'home__cards_fix-space': quizes.length % 3 !== 0 }]">
        <QuizPreviewCard
          v-for="(card, i) in quizes"
          :key="i"
          v-bind="card.quiz"
          :id="card._id"
          class="home__card"
        />
    </div>
  </div>
</template>

<script>
import QuizPreviewCard from '@/components/QuizPreviewCard'

export default {
  name: 'HomePage',

  components: {
    QuizPreviewCard
  },

  computed: {
    quizes () {
      return this.$store.state.quizes
    }
  }
}
</script>

<style lang="scss">
  @mixin mobile {
    @media (max-width: 500px) {
      @content;
    }
  }

  .home {
    &__cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @include mobile {
        display: block;
      }

      &_fix-space {
        &:after {
          content: '';

          @extend .home__card;
        }
      }
    }

    &__card {
      --width: calc(33% - 5px);
      flex: 1;
      flex-basis: var(--width);
      max-width: var(--width);
      margin-bottom: 10px;

      @include mobile {
        --width: 100%;
      }
    }
  }
</style>
