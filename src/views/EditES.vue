<template>
    <md-card md-with-hover>
      <template v-if="isEdit">
        <md-card-content>
          <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('name')}">
            <label>Name</label>
            <md-input v-model="name" disabled></md-input>
            <span class="md-error">{{ errors['name'] }}</span>
          </md-field>
          <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('namespace')}">
            <label>Namespace</label>
            <md-input v-model="namespace"  disabled></md-input>
            <span class="md-error">{{ errors['namespace'] }}</span>
          </md-field>
          <md-field>
            <label>Version</label>
            <!-- <md-select v-model="version"> -->
            <md-input v-model="version" required></md-input>
              <!-- <md-option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</md-option> -->
            <!-- </md-select> -->
          </md-field>
          <md-field>
            <label>Status</label>
             <md-input v-model="health" disabled ></md-input>
            <!-- <md-select v-model="format">
              <md-option v-for="format in formats" :key="format.id" :value="format.id">{{ format.name }}</md-option>
            </md-select> -->
          </md-field>

          <NodeSet v-for='(nodeSet,index) in nodeSets' :key="nodeSets[index]" :nodeSet="nodeSet" nodeSet.sync="nodeSet"  @size="getNodeSet"/>
          <!-- <NodeSet  v-for="(nodeSet, index) in nodeSets"  v-bind:index="index"  :nodeSet="nodeSet" :key="nodeSet.name"   nodeSet.sync="nodeSet"> -->
       <!-- </NodeSet> -->
        <!-- <div class="right-container">
         <md-button class="md-icon-button" @click="addNodeSet">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="deleteNodeSet">
        <md-icon>delete</md-icon>
      </md-button>
       </div> -->
        </md-card-content>
        
      </template>

      <template v-else>
        <md-card-header>
          <div class="md-title">{{ es.metadata.name }} </div>
        </md-card-header>

        <md-card-content style=" margin-left: 5%; margin-right: 8%;  box-shadow: 0 0 10px -5px  ;">
        <div style="overflow: hidden;" >
          <p style="float: left; margin-left: 4%;">Namespace: {{ es.metadata.namespace}}</p>
           <p style="float: right; margin-right: 4%;">Version: {{ es.spec.version }}</p>
           </div>
        <div style="overflow: hidden;" >
           <!-- <div style="overflow: hidden; margin-left: 5%; margin-right: 5%; background-color: #03adfc"> -->
           <p style="float: left; margin-left: 4%;">Status: {{ es.status.health }}</p>
           <p style="float: right; margin-right: 4%;">Node Count: {{ es.status.availableNodes }}</p>
          </div>
          <div style="overflow: hidden;" >
          <p style="float: left; margin-left: 4%;">IntURL: {{es.metadata.annotations.entryPoint}}</p>
           <p style="float: right; margin-right: 4%;">ExtURL: {{es.metadata.annotations.lbEntryPoint}}</p>
           </div>
          <div style="overflow: hidden;" >
           <!-- <div style="overflow: hidden; margin-left: 5%; margin-right: 5%; background-color: #03adfc"> -->
           <p style="float: left; margin-left: 4%;">User: {{ es.metadata.annotations.user }}</p>
           <p style="float: right; margin-right: 4%;">Password: {{ es.metadata.annotations.password }}</p>
          </div>
        </md-card-content>
      </template>



      <md-card-actions md-alignment="space-between">
        <md-button @click="remove">Delete</md-button>

        <div>
          <md-button v-if="isEdit" @click="cancel">Cancel</md-button>
          <md-button @click="edit">Edit</md-button>
        </div>
      </md-card-actions>
    </md-card>
</template>

<script>
import Api from "@/api/es.js"
import NodeSet from '@/components/NodeSet.vue'

export default {
  name: 'EditES',
  props: {
    es: Object
  },
  data: () => ({
    name: '',
    namespace: '',
    version: '',
    health: '',
    ns: [],
    editable: false,
    errors: []
  }),
   components: {
    'NodeSet': NodeSet,
  },
  computed: {
    isEdit: {
      get() { return this.editable },
      set(val) { this.editable = val }
    },
    // categories() {
    //   return this.$store.getters.getCategory
    // },
    // formats() {
    //   return this.$store.getters.getFormat
    // }
  },
  methods: {
    async edit() {
      if(this.isEdit) {
        // var book = {
        //   id: this.book.id,
        //   title: this.title,
        //   isbn: this.isbn,
        //   categoryId: this.category,
        //   formatId: this.format
        // }

        // var es = {
        //    name: this.es.name,
        //    namespace: this.es.namespace,
        //    version: this.es.version,
        //    health: this.es.health,
        // }
        let vm = this
        var result = await this.$confirm("Do you want to update it?");
        if (result) {
          var ns = []
          var names = []
          for(let i=vm.ns.length-1; i> -1; i--)
          {
            if(!names.includes(vm.ns[i].name))
            {
              names.push(vm.ns[i].name)
              ns.push(vm.ns[i])
            }
          }
          vm.ns = []
        var eslocal = {
          name: vm.es.metadata.name,
          namespace: vm.es.metadata.namespace,
          nodeSets: ns
        }
        console.log(eslocal)
          // console.log(ns+"\tAAAAA")
          Api.edit(eslocal, () => this.cancel(), (err) => this.errors = err.response.data)
        }

      } else {
        console.log("============")

        this.$emit('edit')
        let vm = this
        Api.get( 
          {name: vm._props.es.metadata.name, namespace: vm._props.es.metadata.namespace},
          (body) => {
            vm.errors = ''
            vm.name = body.metadata.name
            vm.namespace = body.metadata.namespace
            vm.version = body.spec.version
            vm.health = body.status.health
            vm.nodeSets = body.spec.nodeSets
            vm.isEdit = true
          })
      }
    },
    getNodeSet(value) {
      this.ns.push(value)
      // console.log("Parent from Child:\t" +value)
    },
    // addNodeSet() {
    //      this.nodeSets.push({
    //       name: '',
    //       config: ''

    //      })
    // },
    // deleteNodeSet() {
    //      this.nodeSets.pop()
    // },

    async remove() {
      var result = await this.$confirm("Do you want to delete it?");
      if (result) {
        let vm = this
        Api.delete({name: vm._props.es.metadata.name, namespace: vm._props.es.metadata.namespace}, () => this.cancel())
      }
    },
    cancel() {
      this.isEdit = false
      this.$emit('cancel')
    }
  }
}
</script>
