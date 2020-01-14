import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import  '../../bower_components/components-font-awesome'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery'
import { ipcRenderer, remote } from "electron";


import VueSal from 'vue-swal'
window.jQuery = jQuery

Vue.use(VueSal)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  
  template: '<App/>',
  data : {
    ipcRenderer,
    remote
  },
  methods: {
    alert(icon, title, message) {
      this.$swal({
        toast: true,
        position: 'top-end',
        icon,
        title,
        text: message,
        button: {
          text: 'close',
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
        timer: 2000
      })
    },
    confirm(title, text, buttonText = 'Confirm', type = 'warning') {
      return new Promise((resolve, reject) => {
        this.$swal({
          title,
          text,
          type,
          showCancelButton: true,
          confirmButtonColor: '#38c172',
          cancelButtonColor: '#d33',
          button: {
            text: buttonText,
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          }
        })
          .then(res => res ? resolve(res) : reject(res)).catch(err => reject(err))
      })
    }
  }

}).$mount('#app')