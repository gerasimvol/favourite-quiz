<template>
  <div class="quiz-preview-card window">
    <div class="title-bar">
      <div class="title-bar-text">{{ name }}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize" @click="$router.push(`/quiz/${id}`)"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <div class="quiz-preview-card__images">
        <div
          v-for="(previewImg, i) in items.filter((item, i) => i < 2)"
          :key="i"
          class="quiz-preview-card__image"
        >
          <img :src="previewImg.img" />
        </div>
      </div>
      <div class="flex-center">
        <button @click="$router.push(`/quiz/${id}`)">Start quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizPreviewCard',

  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .quiz-preview-card {
    &__images {
      display: flex;
      margin-bottom: 10px;
    }

    &__image {
      flex: 1;
      height: 200px;

      &:first-child {
        margin-right: 10px;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
