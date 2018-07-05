import { fabric as Fabric } from 'fabric';

const Curvature = class {
  constructor(params) {
    this._animation = this._animation.bind(this);
    this._initialize(params);
  }

  _initialize(params) {
    this.canvasElement = params.canvas
    this.width = 300;
    this.height = 300;
    this.speed = 0.05;
    this.delta = 0; // значение параметра от 0 до 1, где границы - это крайние положения
    this.isStop = true;
    this.canvas = new Fabric.Canvas(this.canvasElement, {
      width: this.width,
      height: this.height,
      interactive: false,
      renderOnAddRemove: false,
      selection: false
    });
    this.canvas.hoverCursor = 'default'; // иначе фабрика выкидывает свой курсор, этого не требуется
    this._reset();
  }

  // Запуск анимации
  start() {
    this.isStop = false
    this._animation()
  }

  // остановить анимацию
  stop() {
    this.isStop = true
  }


  // В исходное состояние!
  _reset() {
    this.canvas.clear()
    this.isStop = false
    this.delta = 0

    // Зададим кривую тут, хотя можно передать элемент со страницы,
    //      формируем кривую тут, что бы можно было удобно понимать,
    //      какая точка, куда бедет смещена и как, плюс если канвас придется
    //      менять масштаб, то потребуется масштабировать всю кривую,
    //      что бы избежать размазывания svg, лучше умножить координаты на некий коэфициент
    const curveSVG = `M ${150} ${50} ` +
      `C ${250},${50} ${250},${50} ${250},${150} ` + // усложним, будем вращать фигуру
      `C ${150},${150} ${150},${50} ${150},${50} ` + // усложним, будем вращать фигуру
      'z'
    this.curve = new Fabric.Path(curveSVG, {
        fill: '#FF1030', // если замкнуть кривую, то можно её залить
        stroke: '#FF0000',
        objectCaching: false,
        selectable: false,
        // opacity: 0.5,
    });
    this.canvas.add(this.curve)
  }


  // В этом примере будем вращать фигуру по кругу
  _curveAnimation() {
    const { delta } = this;

    this.curve.left = 100 + Math.sin(delta) * 60
    this.curve.top = 100 + Math.cos(delta) * 60
  }

  // Рассчет следующей позиции, тут происходит обычное приращение параметра,
  //    все координаты завязаны на нем, что бы можно было легко сменить
  //    всю картину в целом через одно значение
  _nextPoint() {
    if (this.isStop) return false

    if (this.delta > 2 * Math.PI) { // вращаем по кругу, дельта - это есть число от 0 до 2*Pi, нет смысла его увеличивать больше, с экономим на этом память и расчеты, если страница будет долго открыта
        this.delta = 0
    }

    this.delta += this.speed;
  }

  // Выполнение анимации
  _animation() {
    if (this.isStop) return false
    this._nextPoint()
    this._curveAnimation()
    Fabric.util.requestAnimFrame(this._animation, this.canvas.getElement())
    this.canvas.renderAll()
  }

}

export default Curvature
