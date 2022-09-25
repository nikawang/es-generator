import Ajax from '@/api/ajax.js'
import { ApiES } from '@/const.js'

export default {
  get(data, success) {
    Ajax.get(ApiES + `/${data.name}`+ `/${data.namespace}` , "", success, () => false)
  },

  list(data, success) {
    Ajax.get(ApiES, data, success, () => false)
  },
  // search(data, success) {
  //   Ajax.get(ApiBook, data, success, () => false)
  // },
  create(data, success, failure) {
    Ajax.post(ApiES, data, success, failure)
  },
  edit(data, success, failure) {
    Ajax.put(ApiES, data, success, failure)
  },
  delete(data, success) {
    Ajax.delete(ApiES +`/${data.name}`+ `/${data.namespace}`, "", success, () => false)
  }
}