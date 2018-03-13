import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router.js';
import Vuex from 'vuex';
import App from './app.vue';
import Util from './libs/util.js'
import './style.css';
import product_data from './product.js';

Vue.use(VueRouter);
Vue.use(Vuex);

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 history 模式
    mode: 'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

const store = new Vuex.Store({
    state: {
        // 商品列表数据
        productList: [],
        // 购物车数据
        cartList: []
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return Util.getFilteredArray(brands);
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return Util.getFilteredArray(colors);
        }
    },
    mutations: {
        setProductList (state, data) {
            state.productList = data;
        },
        addCart (state, id) {
            const currentProduct = state.cartList.find(item => item.id === id);
            if (currentProduct) {
                currentProduct.count++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                });
            }
        },
        editCartItem (state, newItem) {
            const currentItem = state.cartList.find(item => item.id === newItem.id);
            if (!currentItem) return;
            currentItem.count = newItem.count;
        },
        deleteCartItem (state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        emptyCart (state) {
            state.cartList = [];
        }
    },
    actions: {
        getProductList (context) {
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 100);
        },
        buy (context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500);
            });
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => {
        return h(App)
    }
});