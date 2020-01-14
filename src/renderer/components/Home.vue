<template>
  <div class @mouseleave="select('')">
    <!-- container section start -->
    <section id="container" class>
      <!--header start-->

      <header class="header dark-bg">
        <div class="toggle-nav">
          <div
            class="icon-reorder tooltips"
            data-original-title="Toggle Navigation"
            data-placement="bottom"
          >
            <i class="icon_menu"></i>
          </div>
        </div>

        <!--logo start-->
        <a href="#" class="logo">
          <img
            style="max-width: 5vw;"
            src="../../../static/logo.png"
            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
            alt
          />
          <span class="lite">Admin</span>
        </a>
        <!--logo end-->

        <div class="nav search-row" id="top_menu">
          <!--  search form start -->
          <ul class="nav top-menu">
            <li>
              <form class="navbar-form">
                <input
                  class="form-control"
                  @change="getProducts(1)"
                  v-model="search"
                  placeholder="Search"
                  type="text"
                />
              </form>
            </li>
          </ul>
          <!--  search form end -->
        </div>

        <div class="float-right top-nav notification-row">
          <marquee>
            <h3>MELOTECH</h3>
          </marquee>
        </div>
      </header>
      <Aside @erase="select('')" :item="selected_product" @searchProduct="searchProduct"></Aside>

      <section id="main-content">
        <section class="wrapper">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="page-header">
                <button class="btn">
                  <i class="fa fa-bars"></i><span class="font-weight-bold ">INVENTORY</span> &nbsp;
                  <span class="badge badge-primary">{{products.length}}</span>
                </button>
              </h3>

              <ol class="p-2 breadcrumb">
                <li class="breadcrumb-item">
                  <i class="fa fa-home"></i>
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item">Products</li>
                <li class="breadcrumb-item">Entries</li>
                <li class="breadcrumb-item">
                  <select v-model="entries">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                    <option>200</option>
                  </select>
                </li>
              </ol>

              <table class="table table-striped table-advance table-hover">
                <thead>
                  <tr>
                    <th class="text-center">
                      <i class="fa fa-key"></i>
                    </th>
                    <th class="text-center">
                      <i class="fa fa-shopping-cart"></i> Product
                    </th>
                    <th class="text-center">
                      <i class="fa fa-money-bill"></i>
                      <i class="fas fa-dollar">Price</i>
                    </th>
                    <th class="text-right">
                      <i class="fas fa-cog fa-spin"></i> Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product,index in setProducts">
                    <td
                      @click="select(product)"
                      class="text-center font-weight-italic text-capitalize"
                    >{{(parseInt(current_page - 1) * parseInt(entries)) + ++index}}</td>
                    <td
                      @click="select(product)"
                      class="text-center text-capitalize"
                    >{{product.name}}</td>
                    <td @click="select(product)" class="text-center">{{moneyFormat(product.price)}}</td>
                    <td class="text-right">
                      <div class="btn-group">
                        <button
                          @mouseover="select(product)"
                          title="Add Product"
                          style="text-decoration: none"
                          class="text-center btn btn-link btn-primary m-1"
                          type="button"
                          data-toggle="modal"
                          data-target="#addProductModal"
                        >
                          <i class="text-white fa fa-pen"></i>
                        </button>
                        <button
                          @click.prevent="deleteProduct(product)"
                          type="button"
                          title="delete this product"
                          class="btn btn-outline-danger m-1"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="setProducts.length == 0 ">
                    <td class="text-center font-weight-bold" colspan="4">No product found</td>
                  </tr>
                  <tr />
                </tbody>
                <tfoot>
                  <tr v-if="setProducts.length > 0 ">
                    <td colspan="3">
                      <div class="float-right">
                        <nav aria-label="Page navigation">
                          <ul class="pagination pagination-md">
                            <li
                              @click="move(-1)"
                              :class="{'page-item' : true, disabled : (current_page - 1)  < 1 }"
                            >
                              <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                            <li
                              v-for="no in pages"
                              :class="{'page-item': true, active : current_page == no}"
                            >
                              <a @click="getProducts(no)" class="page-link" href="#">{{no}}</a>
                            </li>

                            <li
                              @click="move(1)"
                              :class="{'page-item' : true, disabled : current_page + 1 > pages}"
                            >
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div style="position: fixed; bottom: 25px; right: 25px">
            <button
              @mouseover="select('')"
              type="button"
              class="btn btn-success rounded-circle"
              title="Add new Product"
              data-toggle="modal"
              ref="modal"
              data-target="#addProductModal"
            >
              <i class="fa fa-plus"></i>
            </button>
          </div>

          <div class="modal show" id="addProductModal">
            <AddProductComponent
              :title="selected_product ? 'Edit product' : 'Add new product' "
              :product="selected_product"
              :method="selected_product ? 'edit' : 'add'"
            ></AddProductComponent>
          </div>
        </section>
      </section>
      <!--main content end-->
      <div class="p-3 text-right">
        <div class="credits">
          Developed by
          <a href="#">@cloudtechy</a>
          (github)
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import AddProductComponent from "./AddProductComponent";
import Aside from "./asideComponent";

export default {
  data() {
    return {
      search: "",
      entries: 5,
      current_page: 1,
      setProducts: [],
      currency_symbol: "N",
      selected_product: ""
    };
  },
  components: {
    AddProductComponent,
    Aside
  },
  computed: {
    ...mapState({
      products: state => state.product.products
    }),
    ...mapGetters({ get: "search" }),
    pages() {
      var productsLength = this.search
        ? this.get(this.search).length
        : this.products.length;
      var pages = Math.ceil(productsLength / this.entries);
      return pages;
    }
  },
  watch: {
    search() {
      this.getProducts(1);
    },
    entries() {
      this.getProducts(this.current_page);
    },
    products(product) {
      this.getProducts(this.current_page);
    }
  },
  created() {
    this.getProducts(this.current_page);
    addEventListener("contextmenu", () => {
      this.contextMenu(this.selected_product);
    });
  },
  methods: {
    getProducts(n) {
      var products = this.search ? this.get(this.search) : this.products;
      var no = n > this.pages ? 1 : n;
      var to = no * this.entries;
      var from = to - this.entries;
      this.current_page = parseInt(no);
      this.setProducts = products.slice(from, to);
    },
    move(n) {
      var no = this.current_page + n < 1 ? 1 : this.current_page + n;
      this.getProducts(no);
    },
    moneyFormat(money) {
      return `${this.currency_symbol} ${money
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    },
    deleteProduct(product) {
      this.$root
        .confirm(
          `You are about to remove \n ${product.name}`,
          `This action cannot be reversed`,
          "Remove"
        )
        .then(res => {
          var index = this.products.indexOf(product);
          var result = this.$root.ipcRenderer.sendSync(
            "delete-product",
            product.id
          );
          if (result.data && result.data > 0) {
            this.$store.dispatch("deleteProduct", index);
            this.$root.alert(
              "success",
              "Success",
              `${product.name} was deleted`
            );
          }
        })
        .catch();
    },
    select(product) {
      this.selected_product = product;
    },
    searchProduct(search) {
      this.search = search;
    },
    contextMenu(product) {
      var selected = product ? true : false;
      const remote = this.$root.remote;
      const { Menu, MenuItem } = remote;
      var menu = new Menu();
      menu.append(
        new MenuItem({
          label: "Add new product",
          click: () => {
            this.selected_product = "";
            this.$refs.modal.click();
          }
        })
      );
      menu.append(new MenuItem({ type: "separator" }));
      menu.append(
        new MenuItem({
          label: "Edit selected product",
          enabled: selected,
          click: () => {
            this.selected_product = product;
            this.$refs.modal.click();
          }
        })
      );
      menu.popup(remote.getCurrentWindow());
    }
  }
};
</script>
<style >
body {
  background-image: url("../../../static/background.jpg");
  background-size: auto;
  background-repeat: no-repeat;
}
#app {
  background-color: rgba(255, 255, 255, 0.65);
  min-height: 100vh;
}
</style>