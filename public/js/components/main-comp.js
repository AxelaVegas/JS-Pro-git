Vue.component('main-comp', {
    data(){
        return{
            products: [],
            cartItem: []
        }
    },
    methods:{
        addProduct(product) {

            let find = this.cartItem.find(el => el.id_product === product.id_product);
            if (find) {
                this.$root.putJson(`/api/cartPut/${ find.id_product }`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$root.postJson(`api/cartPost/`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItem.push(prod);
                        }
                    })
            }
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data){
                    el.img = `img/prod-${el.id_product}.jpg`;
                    this.products.push(el);
                }
            });
        this.$parent.getJson('/api/cart')
            .then (data => {
                for(let el of data.contents){
                    el.img = `img/prod-${el.id_product}.jpg`;
                    this.cartItem.push(el);
                }
            });
    },
    template: `
    <main class="content">
        <div class="wrap">
<!-- секция категорий товаров -->
            <section class="offer">
                <h2 class="hidden">
                    <!-- скрытый заголовок для синтезаторов речи -->
                    categories of our products
                </h2>

                <div class="offer-img offer-for-women">
                    <p>
                        <span class="offer-span-1">30% OFF</span>
                        <br>
                        <span class="offer-span-2">FOR WOMEN</span>
                    </p>
                </div>

                <div class="offer-img offer-for-men">
                    <p>
                        <span class="offer-span-1">HOT DEAL</span>
                        <br>
                        <span class="offer-span-2">FOR MEN</span>
                    </p>
                </div>

                <div class="offer-img offer-for-kids">
                    <p>
                        <span class="offer-span-1">NEW ARRIVALS</span>
                        <br>
                        <span class="offer-span-2">FOR KIDS</span>
                    </p>
                </div>

                <div class="offer-img offer-acc">
                    <p>
                        <span class="offer-span-1">LUXIROUS & TRENDY
                        </span>
                        <br>
                        <span class="offer-span-2">ACCESORIES</span>
                    </p>
                </div>
            </section>
<!-- секция продуктов -->
            <section class="products">
                <h2 class="center">Fetured Items</h2>
                <p class="center p-top-padding">
                    <span class="prod-span-1">Shop for items based on what we featured in this week</span>
                </p>
    <!-- галерея продуктов -->
                <div class="prod-all-wrap">
                
                    <product-card v-for="product in products" 
                    :key="product.id_product" 
                    :product="product" 
                    :img="product.img"></product-card>
                    
                </div>
<!-- кнопка перехода в каталог -->
                <a class="btn" href="#"><span>Browse All Product</span></a>
            </section>
        </div>
    </main>
    `
});

Vue.component('product-card', {
    props: ['product', 'img'],
    template: `
    <div class="prod-wrap">
             <!--затемняющий слой поверх карточки товара-->
             <div class="prod-overlay">
                            
                 <button class="btn-add" @click="$parent.addProduct(product)">
                     <img src="img/cart.svg" alt="">
                     Add to Cart
                 </button>
             </div>
             
             <img v-bind:src="img" v-bind:alt="product.product_name">
          
             <div class="prod-text-padding">
                    <p>
                        <a class="prod-link" href="product.html">
                            <span class="prod-span-2 transition-easy">
                         {{ product.product_name }}
                         </span>
                        </a>
                    </p>
                 <p>
                        <span class="prod-span-3">
                           {{ product.description }}
                     </span>
                  </p>
             </div>
             <div> class="prod-text-padding">
                  <p>
                    <span class="promo-span-3">$ {{ product.price }}</span>
                  </p>
             </div>              
    </div>
    </div>
    `
});