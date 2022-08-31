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
            document.body.append(this.lightbox);
        }
        closeLightbox() {
            this.lightbox.remove();
        }

       prevImg() {
        console.log('Prev');
       }

       nextImg() {
        console.log('Next');
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
        }
    }
    const lightbox = new Lightbox();

    const tstBtn = document.querySelector('.btn-test');
            tstBtn.addEventListener('click', e => {
                lightbox.showLightbox();
            });
}