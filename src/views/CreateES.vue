<template>
  <md-card md-with-hover>
    <md-card-content>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('esname')}">
        <label>Elastic Search Name</label>
        <md-input v-model="esname" autofocus required></md-input>
        <span class="md-error">{{ errors['esname'] }}</span>
      </md-field>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('namespace')}">
        <label>Namespace</label>
        <md-input v-model="namespace" required></md-input>
        <span class="md-error">{{ errors['namespace'] }}</span>
      </md-field>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('version')}">
        <label>Version</label>
        <md-input v-model="version" required></md-input>
        <span class="md-error">{{ errors['version'] }}</span>
      </md-field>
      <label class="nodeSet">Node Sets</label>
      <div class="right-container">
      <md-button class="md-icon-button" @click="addNodeSet">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="deleteNodeSet">
        <md-icon>delete</md-icon>
      </md-button>
      </div>
      <NodeSet
       v-for='(nodeSet,index) in nodeSets' :key="nodeSets[index].nodeSetName" v-bind="nodeSets[index].nodeSetName">
       </NodeSet>
     <!-- <md-field>
        <label>Format</label>
        <md-select v-model="format">
          <md-option v-for="format in formats" :key="format.id" :value="format.id">{{ format.name }}</md-option>
        </md-select>
      </md-field> -->
    </md-card-content>
    <md-card-actions>
      <md-button @click="cancel">Cancel</md-button>
      <md-button @click="create">Create</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import Api from '@/api/book.js'
import NodeSet from '@/components/NodeSet.vue'
export default {
  name: 'CreateES',
  data () {
    return {
      title: '',
      isbn: '',
      errors: [],
      category: 1,
      format: 1,
      nodeSets: []
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategory
    },
    formats() {
      return this.$store.getters.getFormat
    }
  },
   components: {
    'NodeSet': NodeSet,
  },
  methods: {
    async create() {
      var book = {
        title: this.title,
        isbn: this.isbn,
        categoryId: this.category,
        formatId: this.format
      }

      var result = await this.$confirm("Do you want to register it?");
      if (result) {
        Api.create(book, () => this.cancel(), (err) => this.errors = err.response.data)
      }
    },
    cancel() { 
      this.$emit('cancel')
    },
    addNodeSet() {
         this.nodeSets.push({
          nodeSetName: '',
          nodeType: '',
          diskSize: ''
         })
    },
    deleteNodeSet() {
         this.nodeSets.pop()
    }

  }
}
</script>

<style>
.right-container {
  display: flex;
  justify-content: right;
  position: relative;
  height: 6vh;
}

.nodeSet{
  display: flex;
  right: 2;
  align-items: left;
  justify-content: left;
  position: relative;
}
</style>