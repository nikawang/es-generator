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
  
 <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('nodeSetName')}">
        <label>Node Set Name</label>
        <md-input v-model="nodeSetName" autofocus required></md-input>
        <span class="md-error">{{ errors['nodeSetName'] }}</span>
      </md-field>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('nodeType')}">
        <label>Node Type</label>
        <md-input v-model="nodeType" required></md-input>
        <span class="md-error">{{ errors['nodeType'] }}</span>
      </md-field>
      <md-field :class="{ 'md-invalid' : errors.hasOwnProperty('diskSize')}">
        <label>Disk Size</label>
        <md-input v-model="diskSize" required></md-input>
        <span class="md-error">{{ errors['diskSize'] }}</span>
      </md-field>
      </md-card-content>
      </md-card>
</template>

<script>
export default {
  name: 'nodeSet',
  // props: {
  //   nodeSet: Object
    // nodeSetName: String
    // nodeType: String,
    // diskSize: String
  // },
  data: () => ({
    errors: [],
    nodeSet : { 
    nodeSetName: '',
    nodeType: '',
    diskSize: ''}
   })
  // methods: {
  // addNodeSet() {
  //        this.nodeSets.push()
  //   }
  // }
}
</script>