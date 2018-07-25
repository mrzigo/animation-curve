import $ from 'jquery';
import Curvature1 from './curvature1';
import Curvature2 from './curvature2';
import Curvature3 from './curvature3';
import Curvature4 from './curvature4';
import Spray from './pixijs';


// Анимация. Сведение кривой в прямую и обратно. Элементарный пример.
let $curvature1 = $('#curvature1');
let myAnimateObject1 = null;
// Добавим в обработку анимации калбеки обратного вызова (часто бывает полезным)
const callbackLeftPosition = () => {
    /*
        Как пример просто меняем цвет окантовки элемента
        но цель показать, что можно отслеживать состояние
        анимации и реагировать на эти состояния,
        к примеру можно выключать анимацию, выполнив
        myAnimateObject1.stop(); // или иным способом, доработав класс Curvature1
        так же можно запустить пролистывание страницы/слайда
    */
    $curvature1.css({'border-color': 'green'});
}
const callbackRightPosition = () => {
    /*
        По достижении другой точки анимации, крайней правой позиции,
        выполняем другое действие, в данном примере только смена окантовки
    */
    $curvature1.css({'border-color': 'red'});
}

/*
    Часто анимация инициализируется дольше чем загружается страница,
    обязательно дабавим калбек по готовности
*/
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

// Пример 2
let $curvature2 = $('#curvature2');
let myAnimateObject2 = new Curvature2({canvas: $curvature2[0]});
myAnimateObject2.start();

// Пример 3
let $curvature3 = $('#curvature3');
let myAnimateObject3 = new Curvature3({canvas: $curvature3[0]});
myAnimateObject3.start();

// Пример 4
let $curvature4 = $('#curvature4');
let myAnimateObject4 = new Curvature4({canvas: $curvature4[0]});
myAnimateObject4.start();

// Пример на PixiJS
const spray = new Spray({canvas: { parent: $('div.spray') }});
