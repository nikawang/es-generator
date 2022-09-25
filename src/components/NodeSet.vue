<template>
  <!-- <md-node-set
    :md-active.sync="isActive"
    md-title="Node Set"
    :md-content="message"
    md-cancel-text="Cancel"
    @md-cancel="onCancel"
 /> -->

 <md-card md-with-hover>
  <md-card-content>
       <!-- <label>NodeSet Roles</label>  -->
        <!-- <md-input v-for="(item) in convert(value.config)" disabled></md-input> -->
        <!-- <li v-for="item in convert(value.config)" :key="item.name">{{ item }}</li> -->

    <md-field>
        <!-- <md-field>  -->
        <label>NodeSet Name</label>
        <md-input v-model="value.name" :disabled="value.isEdit === undefined" ></md-input>
    </md-field>
     <!-- <div v-for="item in convert(value.config)" :key="item"> -->
     <md-field> 
     <label>NodeSet Roles</label> 
      <md-input  v-model="nodeRoles" :disabled="value.isEdit === undefined"  ></md-input>
    <!-- <li v-for="item in convert(value.config)" :key="item.name">{{ item }}</li> -->
      </md-field> 
      <!-- </div> -->
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('count')}">
        <label>Node Count</label>
        <md-input v-model="value.count" v-on:blur="updateNS()" required></md-input>
        <span class="md-error">{{ errors['count'] }}</span>
      </md-field>
      <md-field>
        <label>Node Set Storage Class</label>
        <md-input   v-model="storageClass" :disabled="value.isEdit ===  undefined"  ></md-input>
      </md-field>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('diskSize')}">
        <label>Disk Size</label>
        <md-input  v-model="storageSize" v-on:blur="updateNS()" required></md-input>
        <span class="md-error">{{ errors['diskSize'] }}</span>
      </md-field>
      </md-card-content>
      </md-card>
       
</template>

<script>
export default {
  name: "NodeSet",
  props: ["nodeSet"],
  // el: '#ns',
  emits: ['updateNodeSet'],
  computed:{
    value: {
      get() {
        return this.nodeSet
      },
      set(value) {
        return this.$emit('update:nodeSet',value)
      }
    },
    storageSize: {
      get() {
        var nodeSet = this.value
        if( nodeSet !== undefined  && nodeSet.volumeClaimTemplates !== undefined )
        {
          return this.value.volumeClaimTemplates[0].spec.resources.requests.storage
        }
        else{
          return '';
        }
      },
      set(val) {
        // this.value.volumeClaimTemplates[0].spec.resources.requests.storage = val
        this.value.diskSize = val
      }
    },
    storageClass: {
      get() {
        var nodeSet = this.value
         if( nodeSet !== undefined && nodeSet.volumeClaimTemplates !== undefined )
          {
            return nodeSet.volumeClaimTemplates[0].spec.storageClassName
          }
          else{
            return '';
          }
      },
      set(val) 
      {
        this.value.storageClass = val
      }
    },
    nodeRoles: {
      get() {
          var roles= ""
          var config = this.value.config
          if (config !== undefined ){
            Object.entries(config).forEach(item =>{
            // int i=0;
            if(item[0].includes("roles"))
            {
              roles= item[1].toString();
              return;
            }
          });

          
          }
          return roles;
    },
    set(val) {
      this.value.roles=val
    }
    }
  },
  // name: 'nodeSet',
  // props: {
  //   nodeSet: Object
    // nodeSetName: String
    // nodeType: String,
    // diskSize: String
  // },
  data: () => ({
    errors: [],
    nodeSets: null,
    isEdit: false,
    // nodeSet : nil,
    // nodeSet: this.nodeSet
   }),


  methods: {
  // convert: function(config) {
  //   var roles= ""
  //   if (config !== undefined ){
  //      Object.entries(config).forEach(item =>{
  //     // int i=0;
  //    if(item[0].includes("roles"))
  //    {
  //      roles= item[1].toString();
  //     return;
  //     }
  //   });
  //   //  i++
  //   },

  //   console.log(roles+ "\t AAA")
  //   return roles;
  //   },
    updateNS(){
        var nodeSet={
          "name": this.value.name,
          "count": this.value.count,
          "diskSize": this.value.diskSize,
          "storageClass": this.value.storageClass,
          "roles": this.value.roles,
        }

      // var nodeSet = null
      // if(this.value.isEdit == false)
      // {
        
      // }else
      // {
      //   nodeSet={
      //     "name": this.value.name,
      //     "count": this.value.count,
      //     "diskSize": this.value.volumeClaimTemplates[0].spec.resources.requests.storage
      //   }
      // }


      // console.log(this.value.volumeClaimTemplates[0].spec.resources.requests.storage)
      this.$emit('size',nodeSet)
      // this.$emit('size',this.value.volumeClaimTemplates[0].spec.resources.requests.storage);
    },
    getStorageClass(nodeSet) {
      if( nodeSet !== undefined && nodeSet.volumeClaimTemplates !== undefined )
      {
        return nodeSet.volumeClaimTemplates[0].spec.storageClassName
      }
      else{
        return '';
      }
    },
    getStorageSize(nodeSet) {
      if( nodeSet !== undefined  && nodeSet.volumeClaimTemplates !== undefined )
      {
        return nodeSet.volumeClaimTemplates[0].spec.resources.requests.storage
      }
      else{
        return '';
      }
    }

  }
}
</script>