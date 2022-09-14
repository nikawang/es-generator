<template>
  <ViewBase>
    <template slot="header">
      <md-field md-clearable class="search-box md-autocomplete md-autocomplete-box md-inline">
        <div class="md-menu">
          <md-input v-model="keyword" @keyup.enter="search" />
        </div>
        <label>Search...</label>
      </md-field>
      <md-button class="md-icon-button" @click="search">
        <md-icon>search</md-icon>
      </md-button>
    </template>
    
    <template slot="main">
      <CreateES v-if="isCreate" @cancel="createCancel" />
      <md-progress-spinner v-if="isLoading" md-mode="indeterminate"></md-progress-spinner>
      <EditCard v-else v-for="book in books" :book="book" :key="book.id" @cancel="getBookList" />
      <div class="margin"></div>
    </template>

    <template slot="overlay">
    <div id="cbn">
      <md-button class="md-fab md-fab-bottom-right md-primary" id="createOverlay" @click="create">
        <md-icon>add</md-icon>
      </md-button>
      </div>
    </template>
  </ViewBase>
</template>

<style>
.search-box {
  min-width: 20px;
}
.md-card {
  margin: 10px;
}
.md-card-content {
  font-size: 16px !important;
  padding: 20px;
}
.margin {
  height:70px;
}
</style>

<script>
import Api from "@/api/book.js"
import ViewBase from '@/components/ViewBase.vue'
import CreateES from '@/views/CreateES.vue'
import EditCard from '@/views/EditCard.vue'
 
export default {
  name: 'HomeView',
  el: '#cbn',
  data: () => ({
    books: [],
    keyword: '',
    contents: [],
    isLoading: false,
    isCreate: false,
  }),
  components: {
    'CreateES': CreateES,
    'EditCard': EditCard,
    'ViewBase': ViewBase,
  },
  created() {
    this.getBookList()
  },
  methods: {
    search() {
      this.getBookList()
    },
    getBookList() {
      this.isLoading = true
      Api.search({query: this.keyword}, 
        (body) => {
          this.books = body.content
          this.isLoading = false
        })
    },
    create() {
      this.isCreate = true;
      document.querySelector('.md-app-scroller').scrollTop = 0;
      this.$el.querySelector('#createOverlay').style.display = "none";
    },
    createCancel() {
      this.isCreate = false;
      this.getBookList();
      this.$el.querySelector('#createOverlay').style.display = "block";
    }
  }
}
</script>
