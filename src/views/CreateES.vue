<template>
  <md-card md-with-hover>
    <md-card-content>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('name')}">
        <label>Elastic Search Name</label>
        <md-input v-model="name" autofocus required></md-input>
        <span class="md-error">{{ errors['name'] }}</span>
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
      <!-- <NodeSet
       v-for='(nodeSet,index) in nodeSets' :key="nodeSets[index].nodeSetName" v-bind="nodeSets[index].nodeSetName">
       </NodeSet> -->
      <NodeSet v-for='(nodeSet,index) in nodeSets' :key="nodeSets[index]" :nodeSet="nodeSet" nodeSet.sync="nodeSet"  @size="getNodeSet"/>

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
import Api from '@/api/es.js'
import NodeSet from '@/components/NodeSet.vue'
export default {
  name: 'CreateES',
  props: {
    es: Object,
  },
  data () {
    return {
      name: '',
      namespace: '',
      version: '',
      health: '',
      nodeSets: [],
      errors: []
    };
  },
  // computed: {
  //   categories() {
  //     return this.$store.getters.getCategory
  //   },
  //   formats() {
  //     return this.$store.getters.getFormat
  //   }
  // },
   components: {
    'NodeSet': NodeSet,
  },
  methods: {
    async create() {
      // var book = {
      //   title: this.title,
      //   isbn: this.isbn,
      //   categoryId: this.category,
      //   formatId: this.format
      // }]

      var es = {
        name: this.name,
        namespace: this.namespace,
        version: this.version,
        nodesets: this.nodeSets
      }

      var result = await this.$confirm("Do you want to register it?");
      if (result) {
        console.log(es)
        Api.create(es, () => this.cancel(), (err) => this.errors = err.response.data)
      }
    },
    cancel() { 
      this.$emit('cancel')
    },
    addNodeSet() {
         this.nodeSets.push({
          name: '',
          roles: '',
          diskSize: '',
          storageClass: '',
          count: '',
          isEdit: false,
         })
    },
    deleteNodeSet() {
         this.nodeSets.pop()
    },
     getNodeSet(value) {
      this.ns.push(value)
      // console.log("Parent from Child:\t" +value)
    },

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