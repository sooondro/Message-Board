<template>
  <div>
    <button @click="showMessageForm = !showMessageForm" type="button"
    class="btn btn-info mt-3 mb-3">Toggle Message Form</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{ error }}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control"
         id="subject" placeholder="Enter a subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input v-model="message.imageURL" type="url" class="form-control"
         id="imageURL" placeholder="Enter an image URL">
      </div>
      <button type="submit" class="btn btn-primary">Add Message</button>
    </form>

    <div class="list-unstyled" v-for="message in reversedMesseges" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{ message.username }}</h4>
          <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
          {{ message.message }}
          <br />
          <small>{{ message.created }}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = 'http://localhost:1234/messages';

export default {
  name: 'Home',
  data: () => ({
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
    showMessageForm: false,
    error: '',
  }),
  computed: {
    reversedMesseges() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL).then((response) => response.json()).then((result) => {
      this.messages = result;
    });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        if (result.details) {
          const error = result.details.map((detail) => detail.message).join('. ');
          this.error = error;
        } else {
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(result);
        }
      });
    },
  },
};
</script>


<style>
  hr {
    border-top: 1px solid white;
  }

  img {
    max-width: 300px;
    height: auto;
  }
</style>
