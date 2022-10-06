/*Lightbox training project*/
{
    class Lightbox {
        constructor(opts) {
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

                const defaultOpts = {
                    showThb : true
                }
                this.options = {...defaultOpts, ...opts}
                
                this.createImageList();
                if(this.options.showThb) {this.generateThumbnails();}
                this.bindEvents();
            }

        generateLightbox() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbx');
            lightbox.innerHTML = `
            <div class="img-box">
                <div class="number"></div>
                <div class="img-cnt">
                    <button class="prev"><span>Poprzedni</span></button>
                    <img src="img/flower-1.jpg" alt="" class="img">
                    <button class="next"><span>Następny</span></button>
                </div>
                <div class="img-title">Kwiatek pomarańczowy</div>
            </div>
            <div class="thumbnails">
            <!--<div class="list">
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                    <a href=""><img src="img/thb-blank.png" alt=""></a>
                </div>-->
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
        this.showImage(pImg);
       }

       nextImg() {
        this.currentImg++;
        if (this.currentImg > (this.images.length - 1)) {this.currentImg = 0;}
        const nextImage = this.images[this.currentImg];
        this.showImage(nextImage);
       }

       showImage(img) {
        this.img.style.opacity = 0;
        const animate = this.img.animate([{opacity: 0},{opacity: 1}], {duration: 130});
        this.title.innerHTML = img.getAttribute('title');
        this.img.setAttribute('src', img.getAttribute('href'));
        this.number.innerHTML = this.generateCounter();
        animate.onfinish = () => {this.img.style.opacity = 1;}
        this.setCurrentThumbnails();
       }

       createImageList() {
        this.images = document.querySelector('.gallery').querySelectorAll('.g-el');
       }

       generateCounter() {
        return `${this.currentImg + 1} / ${this.images.length}` ;
       }
       
       generateThumbnails() {
        const list = document.createElement('div');
        list.classList.add('list');
        
        this.images.forEach(i => {
            let thb = document.createElement('img');
            thb.src = i.querySelector('img').src;
            thb.width = 80;
            thb.height = 80;
            thb.classList.add('thb');
            this.thumbnails.push(thb);
        });

        this.thumbnails.forEach(el => {
            let d = document.createElement('div');
            d.appendChild(el);
            list.appendChild(d);
        });

        this.lightbox.querySelector('.thumbnails').appendChild(list);
       }

       setCurrentThumbnails() {
        this.thumbnails.forEach(img => {
            img.classList.remove('current');
            this.thumbnails[this.currentImg].classList.add('current');
        });
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
                    this.currentImg = key;
                    this.showLightbox();
                    this.showImage(i);
                })
            });

            this.thumbnails.forEach((thb, key) => {
                thb.addEventListener('click', e => {
                    this.currentImg = key;
                    this.showImage(this.images[this.currentImg]);
                })
            });
        }
    }
    const lightbox = new Lightbox({
        showThb: false});
}