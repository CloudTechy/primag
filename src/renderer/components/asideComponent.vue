<template>
  <aside>
    <div  id="sidebar" class="mt-lg-3 nav-collapse">
      <!-- sidebar menu start-->
      <ul class="sidebar-menu">
        <li class>
          <a class href="#">
            <i class="icon_house_alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li @mouseover="eraseContent" class="sub-menu">
          <a href="javascript:;" class>
            <i class="icon_document_alt"></i>
            <span>New Product</span>
            <span class="menu-arrow arrow_carrot-right"></span>
          </a>
          <ul class="sub">
            <li>
              <form @submit.prevent="submit">
                <div class="p-1 form-group">
                  <small v-if="error" id="helpId" class="form-text text-danger text-muted">{{error}}</small>
                  <label for></label>
                  <input
                    required
                    type="text"
                    class="form-control form-control-sm"
                    v-model="name"
                    aria-describedby="helpId"
                    placeholder
                  />
                  <small id="helpId" class="form-text text-muted">Enter name</small>

                  <label for></label>
                  <input
                    required
                    type="number"
                    class="form-control form-control-sm"
                    v-model="price"
                    aria-describedby="helpId"
                    placeholder
                  />
                  <small id="helpId" class="form-text text-muted">Enter price</small>
                  <label for></label>
                  <button type="submit" name class="btn btn-secondary btn-lg btn-block">Submit</button>
                </div>
              </form>
            </li>
          </ul>
        </li>
        <li class="sub-menu">
          <a href="javascript:;" class>
            <i class="icon_desktop"></i>
            <span>View / Search</span>
            <span class="menu-arrow arrow_carrot-right"></span>
          </a>
          <ul class="sub">
            <li>
              <div class="p-1 form-group">
                <small v-if="error" id="helpId" class="form-text text-danger text-muted">{{error}}</small>
                <label for></label>
                <input
                  type="search"
                  class="form-control form-control-sm"
                  v-model="search"
                  aria-describedby="helpId"
                />
                <small id="helpId" class="form-text text-muted">Enter a product name</small>
              </div>
            </li>
          </ul>
        </li>

        <li class="sub-menu">
          <a href="javascript:;" class>
            <i class="icon_documents_alt"></i>
            <span>Update</span>
            <span class="menu-arrow arrow_carrot-right"></span>
          </a>
          <ul class="sub">
            <li>
              <small
                v-if="product == ''"
                id="helpId"
                class="form-text text-danger text-muted"
              >Click on a product to edit</small>
              <form v-if="product" @submit.prevent="submit">
                <div class="p-1 form-group">
                  <small v-if="error" id="helpId" class="form-text text-danger text-muted">{{error}}</small>
                  <label for></label>
                  <input
                    required
                    type="text"
                    class="form-control form-control-sm"
                    v-model="name"
                    aria-describedby="helpId"
                    placeholder
                  />
                  <small id="helpId" class="form-text text-muted">Enter name</small>

                  <label for></label>
                  <input
                    required
                    type="number"
                    class="form-control form-control-sm"
                    v-model="price"
                    aria-describedby="helpId"
                    placeholder
                  />
                  <small id="helpId" class="form-text text-muted">Enter price</small>
                  <label for></label>
                  <button type="submit" name class="btn btn-secondary btn-lg btn-block">Submit</button>
                </div>
              </form>
            </li>
          </ul>
        </li>
      </ul>
      <!-- sidebar menu end-->
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      price: "",
      id: "",
      error: "",
      search: "",
      product: ""
    };
  },
  watch: {
    search() {
      this.$emit("searchProduct", this.search);
    },
    item() {
      this.product = this.item;
      if (this.item) {
        this.name = this.item.name;
        this.price = this.item.price;
        this.id = this.item.id;
      } else {
        this.name = "";
        this.price = "";
        this.id = "";
      }
    }
  },
  props: ["item"],
  methods: {
    submit() {
      if (this.name && this.price && !this.id) {
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
          this.eraseContent();
          this.$store.dispatch("addProduct", res);
        } else {
          this.error = "An error occured";
        }
      } else if (this.name && this.price && this.id) {
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
          this.eraseContent();
        } else {
          this.error = "Product details not updated.";
        }
      }
    },
    eraseContent() {
      this.$emit("erase");
    }
  }
};
</script>