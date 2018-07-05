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
    this.speed = 0.01;
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
    const curveSVG = `M ${50} ${50} ` +
      `C ${250},${50} ${250},${50} ${250},${250} ` // будем смещать [250,50] -> [50,50] и [250,250] -> [50,250]

    this.curve = new Fabric.Path(curveSVG, {
        fill: 'transparent', // если замкнуть кривую, то можно её залить
        stroke: '#FF0000',
        objectCaching: false,
        selectable: false,
        // opacity: 0.5,
    });
    this.canvas.add(this.curve)
  }


  // вся основная магия заключина тут, фабрика позваляет изменять координаты
  //   загруженной в нее кривой, это позволяет нам выбрать
  //   любую точку и исправить её координаты
  _curveAnimation() {
    const nextPoint = 250 - 200 * this.delta; // 250 -> 50
    this.curve.path[1][3] = this.curve.path[1][5]  = nextPoint

    // специфика координат следующая:
    // точка А:  [ this.curve.path[0][1], this.curve.path[0][2] ]
    // точка А1: [ this.curve.path[1][1], this.curve.path[1][2] ]
    // точка B1: [ this.curve.path[1][3], this.curve.path[1][4] ]
    // точка B:  [ this.curve.path[1][5], this.curve.path[1][6] ]
    // что бы понять, почему так, нужно изучить вопрос построения кривых(ломаных) в SVG
  }

  // Рассчет следующей позиции, тут происходит обычное приращение параметра,
  //    все координаты завязаны на нем, что бы можно было легко сменить
  //    всю картину в целом через одно значение
  _nextPoint() {
    if (this.isStop) return false
    if (this.delta < -Math.abs(this.speed)) {
        this.speed *= -1;
    }

    if (this.delta > 1) {
        this.speed *= -1;
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
