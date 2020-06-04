<template>
  <div class="create-quiz">
    <h4>Create new quiz</h4>

    <fieldset>
      <legend>Quiz name</legend>
        <input class="name-input" type="text" v-model="name" />
        <span v-show="errors.nameInvalid" class="name-input__error">Invalid value</span>
    </fieldset>

    <fieldset>
      <legend>Images amount</legend>
      <select v-model="itemsAmount">
        <option :value="4">4</option>
        <option :value="8">8</option>
        <option :value="16">16</option>
        <option :value="32">32</option>
        <option :value="64">64</option>
        <option :value="128">128</option>
        <option :value="256">256</option>
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
            <span v-show="errors.imagesList[i] && errors.imagesList[i].name" class="images-row__error">Invalid value</span>
          </div>
        </div>
        <div>
          <div class="field-row images-row__img">
            <label :for="`img-${i}`">Img URL</label>
            <input v-model="image.url" :id="`img-${i}`" type="text" />
            <span v-show="errors.imagesList[i] && errors.imagesList[i].img" class="images-row__error">Invalid value</span>
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
      <button @click="submitQuiz">
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
    itemsAmount: 4,
    name: '',
    images: [],
    errors: {
      nameInvalid: false,
      imagesList: []
    }
  }),

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
    isQuizValid () {
      this.errors.nameInvalid = !this.name
      this.errors.imagesList = []
      this.images.forEach((image, i) => {
        this.errors.imagesList[i] = { name: !image.name, img: !this.isImgUrlValid(image.url) }
      })

      return this.submitText !== 'Creating...' &&
        this.name &&
        this.images.every((image, i) => {
          return image.name && this.isImgUrlValid(image.url)
        })
    },
    isImgUrlValid (url) {
      return url &&
          /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|svg))/.test(url)
    },
    addImages (amount) {
      for (let i = 0; i < amount; i++) {
        this.images = [...this.images, {
          name: '',
          url: ''
        }]
      }
    },
    async submitQuiz () {
      if (!this.isQuizValid()) return

      this.submitText = 'Creating...'
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
      position: relative;

      input {
        min-width: 250px;
      }
    }

    &__name {
      position: relative;
    }

    &__error {
      position: absolute;
      bottom: -15px;
      left: 0;
      color: red;
      font-family: "Pixelated MS Sans Serif",Arial;
      font-size: 10px;
      font-weight: 100;
      margin: 0;
    }

    .img-wrapper {
      width: 150px;
      height: 150px;
      border: 1px dotted #808080;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }

  .name-input {
    min-width: 250px;

    &__error {
      color: red;
      font-family: "Pixelated MS Sans Serif",Arial;
      font-size: 10px;
      font-weight: 100;
      margin-left: 10px;
    }
  }

  .submit {
    display: flex;
    justify-content: center;
  }
</style>
