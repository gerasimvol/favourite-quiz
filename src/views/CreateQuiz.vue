<template>
  <div class="create-quiz">
    <h4>Create new quiz</h4>

    <fieldset>
      <legend>Quiz name</legend>
        <input class="name-input" type="text" v-model="name" />
    </fieldset>

    <fieldset>
      <legend>Images amount</legend>
      <select v-model="itemsAmount">
        <option :value="4">4</option>
        <option :value="8">8</option>
        <option :value="16">16</option>
        <option :value="32">32</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>Images</legend>
      <div
        v-for="(image, i) in images"
        :key="i"
        class="images-row"
      >
        <div>
          <div class="field-row  images-row__index">
            <strong>{{ i + 1 }}. </strong>
          </div>
        </div>
        <div>
          <div class="field-row images-row__name">
            <label :for="`alt-${i}`">Label</label>
            <input v-model="image.name" :id="`alt-${i}`" type="text" />
          </div>
        </div>
        <div>
          <div class="field-row images-row__img">
            <label :for="`img-${i}`">Img URL</label>
            <input v-model="image.url" :id="`img-${i}`" type="text" />
          </div>
        </div>
        <div>
          <div class="img-wrapper">
            <img v-show="image.url" :src="image.url" />
          </div>
        </div>
      </div>
    </fieldset>

    <div class="submit">
      <button
        :disabled="!isQuizValid"
        @click="submitQuiz"
      >
        {{ submitText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateQuiz',

  data: () => ({
    submitText: 'Submit quiz',
    itemsAmount: 16,
    name: '',
    images: []
  }),

  computed: {
    isQuizValid () {
      return this.submitText !== 'Loading...' && this.name && this.images.every(image => image.name && image.url)
    }
  },

  watch: {
    itemsAmount (itemsAmount) {
      const delta = itemsAmount - this.images.length
      if (delta > 0) {
        this.addImages(delta)
      } else {
        this.images = this.images.filter((_, i) => i < itemsAmount)
      }
    }
  },

  methods: {
    addImages (amount) {
      for (let i = 0; i < amount; i++) {
        this.images = [...this.images, {
          name: '',
          url: ''
        }]
      }
    },
    async submitQuiz () {
      this.submitText = 'Loading...'
      await this.$store.dispatch('addQuiz', {
        name: this.name,
        items: this.images.map(image => ({ name: image.name, img: image.url }))
      })
      this.$router.push('/')
    }
  },

  created () {
    this.addImages(this.itemsAmount)
  }
}
</script>

<style lang="scss" scoped>
  @mixin mobile {
    @media (max-width: 500px) {
      @content;
    }
  }

  fieldset {
    margin-bottom: 10px;
  }

  select {
    min-width: 100px;
  }

  .images-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    @include mobile {
      display: block;
    }

    .field-row {
      margin-right: 10px;

      @include mobile {
        margin: 0 0 10px 0;
      }

      input {
        @include mobile {
          width: 100%;
        }
      }
    }

    &__index {
      width: 20px;
    }

    &__img {
      input {
        min-width: 250px;
      }
    }

    .img-wrapper {
      border: 1px dotted #808080;
      width: 150px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .name-input {
    min-width: 250px;
  }

  .submit {
    display: flex;
    justify-content: center;
  }
</style>
