/*Lightbox training project*/
{
    class Lightbox {
        constructor() {
                this.lightbox = this.generateLightbox();
                this.number = this.lightbox.querySelector('.number');
                this.prev = this.lightbox.querySelector('.prev');
                this.next = this.lightbox.querySelector('.next');
                this.img = this.lightbox.querySelector('.img');
                this.title = this.lightbox.querySelector('.img-title')
                this.close = this.lightbox.querySelector('.close');
                this.list = this.lightbox.querySelector('.list');
                this.thumbnails = [];
                this.images = null;
                this.currentImg = null;
                this.createImageList();
                this.bindEvents();
            }

        generateLightbox() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbx');
            lightbox.innerHTML = `
            <div class="img-box">
                <div class="number">1 / 2</div>
                <div class="img-cnt">
                    <button class="prev"><span>Poprzedni</span></button>
                    <img src="img/flower-1.jpg" alt="" class="img">
                    <button class="next"><span>Następny</span></button>
                </div>
                <div class="img-title">Kwiatek pomarańczowy</div>
            </div>
            <div class="thumbnails">
            <div class="list">
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                </div>
                <button class="close"><span>Zamknij</span></button>
            </div>
            `;
            return lightbox;
        }
        showLightbox() {
            this.lightbox.style.opacity = 0;
            document.body.append(this.lightbox);
            const animate = this.lightbox.animate([
                {opacity: 0},
                {opacity: 1}
            ], {duration: 130})
            animate.onfinish = () => this.lightbox.style.opacity = 1;
        }
        closeLightbox() {
            const animate = this.lightbox.animate([{opacity: 1}, {opacity: 0}], {duration: 130});
            animate.onfinish = () => this.lightbox.remove();
        }

       prevImg() {
        this.currentImg--;
        if(this.currentImg < 0){this.currentImg = this.images.length - 1;}
        const pImg = this.images[this.currentImg];
        this.showImage(pImg.getAttribute('href'), pImg.getAttribute('title'));
       }

       nextImg() {
        this.currentImg++;
        if (this.currentImg > (this.images.length - 1)) {this.currentImg = 0;}
        const nextImage = this.images[this.currentImg];
        this.showImage(nextImage.getAttribute('href'), nextImage.getAttribute('title'));
       }

       showImage(href, txt) {
            this.title.innerHTML = txt;
            this.img.setAttribute('src', href);
            this.number.innerHTML = this.generateCounter();
       }

       createImageList() {
        this.images = document.querySelector('.gallery').querySelectorAll('.g-el');
        this.images.forEach((e, key) => {
            //console.log(e.getAttribute('href'));
            e.setAttribute('title', `Image ${key}`);
        });
       }

       generateCounter() {
        return `${this.currentImg + 1} / ${this.images.length}` ;
       }
        bindEvents() {
            this.close.addEventListener('click', e=>{
                this.closeLightbox();
            });

            this.next.addEventListener('click', e => {
                this.nextImg();
            });

            this.prev.addEventListener('click', e => {
                this.prevImg();
            });
            
            
            this.images.forEach((i, key) => {
                i.addEventListener('click', e => {
                    e.preventDefault();
                    //console.log(i.getAttribute('title'));
                    this.currentImg = key;
                    //console.log(this.currentImg);
                    this.showLightbox();
                    this.showImage(i.getAttribute('href'), i.getAttribute('title'));
                })
            });
        }
    }
    const lightbox = new Lightbox();
}