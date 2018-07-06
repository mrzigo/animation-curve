import $ from 'jquery';
import Curvature1 from './curvature1';
import Curvature2 from './curvature2';
import Curvature3 from './curvature3';
import Curvature4 from './curvature4';


// Анимация. Сведение кривой в прямую и обратно
let $curvature1 = $('#curvature1');
let myAnimateObject1 = null;
// Добавим в обработку анимации калбеки обратного вызова (часто бывает полезным)
const callbackLeftPosition = () => { $curvature1.css({'border-color': 'green'}); }
const callbackRightPosition = () => { $curvature1.css({'border-color': 'red'}); }
// Часто анимация инициализируется дольше чем загружается страница, обязательно дабавим калбек по готовности
const callbackComplete = () => {
    $curvature1.parent().find('.upper-canvas').click(() => {
        if (myAnimateObject1.isStop) {
            myAnimateObject1.start();
        } else {
            myAnimateObject1.stop();
        }
    });
}

myAnimateObject1 = new Curvature1({
    canvas: $curvature1[0],
    leftPosition: callbackLeftPosition,
    rightPosition: callbackRightPosition,
    complete: callbackComplete
});
myAnimateObject1.start(); // с этого момента начинается магия



let $curvature2 = $('#curvature2');
let myAnimateObject2 = new Curvature2({canvas: $curvature2[0]});
myAnimateObject2.start(); // с этого момента начинается магия 2

let $curvature3 = $('#curvature3');
let myAnimateObject3 = new Curvature3({canvas: $curvature3[0]});
myAnimateObject3.start(); // с этого момента начинается магия 3

let $curvature4 = $('#curvature4');
let myAnimateObject4 = new Curvature4({canvas: $curvature4[0]});
myAnimateObject4.start(); // с этого момента начинается магия 4
