<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header align-items-center justify-content-center">
        <h3
          class="modal-title font-weight-bold text-center justify-content-center text-secondary text-capitalize"
        >{{title}}</h3>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <form role="form" ref="form" @submit.prevent="submit">
        <div class="modal-body">
          <fieldset class="border border-secondary p-2">
            <legend
              class="w-auto font-weight-bold border text-capitalize text-white bg-secondary"
            >{{method}}</legend>
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
              </button>
              <strong>Error Occured!</strong>
              {{error}}
            </div>
            <div class="form-group">
              <label for="email">Product</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                ref="name"
                required
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="number"
                v-model="price"
                required
                class="form-control"
                ref="price"
                placeholder="Enter price"
              />
            </div>
          </fieldset>
        </div>

        <div class="modal-footer">
          <button
            style="color: white; background-color: darkred;"
            type="button"
            ref="close"
            class="btn btn-danger"
            data-dismiss="modal"
          >Close</button>
          <button
            style="color: white; background-color: dodgerblue;"
            type="submit"
            class="btn btn-primary"
          >Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      price: "",
      id: "",
      error: ""
    };
  },
  watch: {
    product() {
      if (this.product) {
        this.name = this.product.name;
        this.price = this.product.price;
        this.id = this.product.id;
      } else {
        this.name = "";
        this.price = "";
        this.id = "";
      }
    }
  },
  computed: {},
  props: ["title", "method", "product", "ipc"],
  methods: {
    submit() {
      if (this.method == "add") {
        var res = this.$root.ipcRenderer.sendSync("add-product", [
          this.name,
          this.price
        ]);
        if (typeof res.data == "object") {
          this.$root.alert(
            "success",
            "Success",
            `${this.name} added successfully`
          );
          this.$store.dispatch("addProduct", res);
          this.name = "";
          this.price = "";
          this.id = "";
          this.$refs.close.click();
        } else {
          this.error =
            "Product was not added. Check if the product already exists.";
        }
      } else {
        var product = { name: this.name, price: this.price, id: this.id };
        var res = this.$root.ipcRenderer.sendSync("edit-product", product);

        if (res.data && res.data > 0) {
          this.$root.alert(
            "success",
            "Success",
            `${this.name} edited successfully`
          );
          var res = this.$root.ipcRenderer.sendSync("all-product", product);
          this.$store.dispatch("setProducts", res);
          this.$refs.close.click();
        } else {
          this.error =
            "Product details could not be updated. Check if the product already exists.";
        }
      }
    }
  }
};
</script>