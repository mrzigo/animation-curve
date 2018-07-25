import * as PIXI from 'pixi.js';
import $ from 'jquery';

class Spray {
    constructor(options, status) {
        const defaults = {
            canvas: {
                parent: null,
                width: 300,
                height: 300,
                transparent: true,
            },
            position: {
                x: 0,
                y: 0,
            },
            speed: 2,
            count: 1000,
            url: '/particle.png',
            direction: Math.PI / 4, // направление движения
            length: 400, // длин пути капли (в пикселях)
        };
        this.config = $.extend(true, {}, defaults, options);
        this._initialize();
    }

    _initialize() {
        this.config.position.x = 0
        this.config.position.y = this.config.canvas.height;
        this._initPixi();
        this._initBlobs();
        this._animInit();
    }

    _initPixi() {
        this._app = new PIXI.Application(
            this.config.canvas.width,
            this.config.canvas.height,
            {
                transparent: this.config.canvas.transparent
            }
        );
        this.config.canvas.parent.append(this._app.view);
        this._sprites = new PIXI.particles.ParticleContainer(this.config.count, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this._app.stage.addChild(this._sprites);
    }

    _initBlobs() {
        this._blobs = [];
        let config = this.config;

        for (let i = 0; i < config.count; i++) {
            this._blobs[i] = PIXI.Sprite.fromImage(config.url);

            // Зададим начальные координаты
            this._blobs[i].x = config.position.x;
            this._blobs[i].y = config.position.y;

            // Сделаем у каждой частици свое направление движения, но относительно начального направления
            let alfa = (Math.PI / 10) * Math.random();
            if (Math.random() > 0.5) alfa = -alfa;
            this._blobs[i].direction = config.direction + alfa;

            // Свою ждинну перемещения
            this._blobs[i].length = 5 + config.length * Math.random();
            // Одинаковую скорость всем
            this._blobs[i].speed = config.speed;
            // Текущее положение
            this._blobs[i].delta = 0;

            // Добавим в сцену
            this._sprites.addChild(this._blobs[i]);
        }
    }



    _animInit() {
        this._app.ticker.add(() => {
            for (let i = 0; i < this.config.count; i++) {
                if (this._blobs[i].delta >= this._blobs[i].length) {
                    this._blobs[i].delta = 0;
                } else {
                    this._blobs[i].delta += this._blobs[i].speed;
                }
                this._blobs[i].x = this.config.position.x + Math.cos(this._blobs[i].direction) * this._blobs[i].delta;
                this._blobs[i].y = this.config.position.y - Math.sin(this._blobs[i].direction) * this._blobs[i].delta;
                // this._blobs[i].scale.set(1);
            }
        });
    }
}

export default Spray;
