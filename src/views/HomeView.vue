<template>
  <ViewBase>
    <template slot="header">
      <md-field md-clearable class="search-box md-autocomplete md-autocomplete-box md-inline">
        <div class="md-menu">
          <md-input v-model="name" @keyup.enter="search" />
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
      <EditES v-else v-for="es in eslist" :es="es" :key="es.metadata.name" @edit="hideAddButton" @cancel="createCancel"/>
      <!-- <EditES v-else v-for="es in eslist" :es="es" :key="es.metadata.name" v-bind:class="{'es_item':true, 'green':(es.status.health==='green')}"  @cancel="getESList" /> -->
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
  font-size: 12px !important;
  padding: 20px;
}
.margin {
  height:70px;
}

.es_item {
  font-size: 20px 

}

.es_item.green {
  background-color: #74c289 !important;
  color: white !important;
}

.es_item.yellow {
  background-color: #dbc870 !important;
  color: white !important;
}

.es_item.red {
  background-color: #de9364 !important;
  color: white !important;
}

</style>

<script>
import Api from "@/api/es.js"
import ViewBase from '@/components/ViewBase.vue'
import CreateES from '@/views/CreateES.vue'
import EditES from '@/views/EditES.vue'
 
export default {
  name: 'HomeView',
  el: '#cbn',
  data: () => ({
    eslist: [],
    keyword: '',
    contents: [],
    isLoading: false,
    isCreate: false,
  }),
  components: {
    'CreateES': CreateES,
    'EditES': EditES,
    'ViewBase': ViewBase,
  },
  created() {
    this.getESList()
  },
  methods: {
    search() {
      this.getESList()
    },
    getESList() {
      this.isLoading = true
      let vm = this
      Api.list({query: this.name},
      (body) => {
          vm.eslist = body
          // console.log(this.eslist)
          vm.isLoading = false
    })
      // Api.search({query: this.keyword}, 
      //   (body) => {
      //     this.books = body.content
      //     this.isLoading = false
      //   })
    },
    create() {
      this.isCreate = true;
      document.querySelector('.md-app-scroller').scrollTop = 0;
      this.$el.querySelector('#createOverlay').style.display = "none";
      // hideAddButton(); 
    },
    createCancel() {
      this.isCreate = false;
      this.getESList();
      this.$el.querySelector('#createOverlay').style.display = "block";
    },
    hideAddButton() {
      document.querySelector('.md-app-scroller').scrollTop = 0;
      this.$el.querySelector('#createOverlay').style.display = "none";
    }
  }
}
</script>
