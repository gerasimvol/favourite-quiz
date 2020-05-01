<template>
  <div class="quiz-page" v-if="quiz">
    <div v-if="!isQuizStarted" class="quiz-page__intro" key="intro">
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">Quiz: {{ quiz.quiz.name }}</div>
          <div class="title-bar-controls">
            <button aria-label="Close" @click="$router.push('/')"></button>
          </div>
        </div>
        <div class="window-body">
          <p>Do you want to start <strong>{{ quiz.quiz.name }}</strong> quiz?</p>
          <section class="field-row">
            <button @click="start">Start</button>
            <button @click="$router.push('/')">Back</button>
          </section>
        </div>
      </div>
    </div>
    <div v-else class="quiz-page__game" key="game">
      <template v-if="!winner">
        <h4>{{ quiz.quiz.name }}</h4>
        <h5>Round: {{ currentStep + 1 }} / {{ pairsAmount }}</h5>

        <div v-if="pairs" class="quiz-page__pair" :key="currentStep">
          <div class="quiz-page__item">
            <div class="quiz-page__image" @click="selectImage({ deleteImage: pairs[currentStep][1].img })">
              <img :src="pairs[currentStep][0].img">
              <h5>{{ pairs[currentStep][0].name }}</h5>
            </div>
          </div>
          <h4>vs</h4>
          <div class="quiz-page__item">
            <div class="quiz-page__image" @click="selectImage({ deleteImage: pairs[currentStep][0].img })">
              <img :src="pairs[currentStep][1].img">
              <h5>{{ pairs[currentStep][1].name }}</h5>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h2>For you <em>{{ quiz.quiz.name }}</em> is</h2>
        <div class="winner__img">
          <img :src="winner.img" />
          <h4>{{ winner.name }}</h4>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import random from 'lodash/random'

// 4
// step 1 = 4 / 2 = 2
// step 2 = 2 / 2 = 1

// 8
// step 1 = 8 / 2 = 4
// step 2 = 4 / 2 = 2
// step 3 = 2 / 2 = 1

// 16
// step 1 = 16 / 2 = 8
// step 2 = 8 / 2 = 4
// step 3 = 4 / 2 = 2
// step 4 = 2 / 2 = 1

// 32
// step 1 = 32 / 2 = 16
// step 2 = 16 / 2 = 8
// step 3 = 8 / 2 = 4
// step 4 = 4 / 2 = 2
// step 5 = 2 / 2 = 1

export default {
  name: 'QuizPage',

  data: () => ({
    isQuizStarted: false,
    currentStep: 0,
    pairsAmount: 0,
    pairs: null,
    initialItems: [],
    winner: null
  }),

  computed: {
    quiz () {
      return this.$store.state.quizes.find(quiz => quiz._id === this.$route.params.id)
    }
  },

  methods: {
    selectImage ({ deleteImage }) {
      this.initialItems = this.initialItems.filter(item => item.img !== deleteImage)

      if (this.currentStep + 1 >= this.pairsAmount) {
        if (this.pairsAmount === 1) {
          // show winner
          this.winner = this.initialItems[0]
        } else {
          // to the next round
          this.createPairsFrom(this.initialItems)
        }
      } else {
        // to the next step
        this.currentStep++
      }
    },
    createPairsFrom (arr) {
      this.currentStep = 0
      let copy = cloneDeep(arr)
      const result = []

      const getRandomItem = () => {
        const index = random(0, copy.length - 1)
        const item = copy.find((_, i) => i === index)
        copy = copy.filter((_, i) => i !== index)
        return item
      }

      this.pairsAmount = arr.length / 2

      for (let i = 0; i < this.pairsAmount; i++) {
        result.push([getRandomItem(), getRandomItem()])
      }

      this.$set(this, 'pairs', result)
    },
    start () {
      this.isQuizStarted = true

      this.$set(this, 'initialItems', cloneDeep(this.quiz.quiz.items))
      this.createPairsFrom(this.initialItems)
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

  .quiz-page {
    max-width: 1200px;
    margin: 0 auto;

    .window {
      width: 300px;
      margin: 100px auto 0 auto;

      .field-row {
        justify-content: center;
      }
    }

    &__game {
      text-align: center;
    }

    &__pair {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include mobile {
        display: block;
      }
    }

    &__item {
      flex: 1;
      max-width: 47%;

      @include mobile {
        max-width: 100%;
      }
    }

    &__image {
      cursor: pointer;

      img {
        width: 100%;
        max-width: 100%;
        transform-origin: 50% 50%;
        transition: 0.2s;
      }

      &:hover {
        img {
          transform: scale(1.02);
        }
      }
    }
  }
</style>
