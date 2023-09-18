<template>
  <div class="col-md-8 mx-auto py-4">
    <form @submit.prevent="publish" ref="articleForm">
      <div class="form-floating mb-3" :class="{'error': titleError}">
        <input v-model="title" type="text" class="form-control" id="text" placeholder="The article title" 
        @focus="removeErrorsInFocus">
        <label for="text">Title</label>
      </div>
      <div class="form-floating mb-3" :class="{'error': bodyError}">
        <textarea v-model="body" name="body" id="body" class="form-control" placeholder="Body"
        @focus="removeErrorsInFocus"></textarea>
        <label for="body">Body</label>
      </div>
      <button class="btn btn-success" type="submit">Post it!</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddArticleForm',
  data() {
    return {
      title: '',
      body: '',
      titleError: false,
      bodyError: false,
    };
  },
  methods: {
    publish() {
      if (!this.title || !this.body) {
        if (!this.title) {
          this.titleError = true;
        }
        if (!this.body) {
          this.bodyError = true;
        }
        return;
      }

      let articleObject = {
        title: this.title,
        body: this.body,
      };

      // Clear the form fields after submission
      this.title = '';
      this.body = '';

      // We can also access the form element using the ref
      // this.$refs.articleForm.reset();

      console.log(articleObject);
    },
    removeErrorsInFocus() {
      let formElements = this.$refs.articleForm;
        if (formElements) {
          formElements.focus();
          this.titleError = false;
          this.bodyError = false;
        }
    },
  },
};
</script>

<style>
  .error {
    border: 1px solid red;
  }
</style>
