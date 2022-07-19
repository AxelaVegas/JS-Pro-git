Vue.component('reviews-comp', {
    template: `
    <section class="reviews">
        <div class="wrap rev-wrap">
            <h2 class="hidden">
                <!-- скрытый заголовок для синтезаторов речи -->
                Сustomer reviews and subscription to news
            </h2>
            <section class="subscribe-centr">
                <img src="img/user-avatar.png" alt="user-avatar.">
                <p>
                    <span class="rev-span-1">“Vestibulum quis porttitor dui! Quisque
                        <br>
                        viverra nunc mi,
                        <span class="rev-span-2">a pulvinar purus
                            <br>
                            condimentum“
                        </span>
                    </span>
                </p>
            </section>
            <article class="subscribe-centr">
                <div class="subscribe-text-centr">
                    <p>
                        <span class="sub-span-1">
                            SUBSCRIBE
                        </span><br>
                        <span class="sub-span-2">FOR OUR NEWLETTER AND PROMOTION</span></p>
                </div>
                <form action="#" class="subscribe-form">
                    <input class="subscribe-form-input transition-easy" type="email" required="required" placeholder="Enter Your Email">
                    <button class="subscribe-form-button transition-easy" type="submit">Subscribe</button>
                </form>
            </article>
        </div>
    </section>
    `
});