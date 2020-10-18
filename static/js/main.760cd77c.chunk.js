(this["webpackJsonpear-training"]=this["webpackJsonpear-training"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),i=n(6),c=n.n(i),s=(n(12),n(1)),l=n.n(s),u=n(2),d=n(3),m=n(4),h=(n(14),{A:0,Bb:1,B:2,C:3,Db:4,D:5,Eb:6,E:7,F:8,Gb:9,G:10,Ab:11}),v={MAJOR:[2,2,1,2,2,2,1]};function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e+12*t}function b(e){return Number((440*Math.pow(2,e/12)).toFixed(2))}function E(){var e=new AudioContext,t=e.createOscillator();t.connect(e.destination),t.start(0),a={context:e,oscilator:t}}function p(){var e=function(){var e=g(1)?1:-1,t=g(2)*e;return{note:f(g(Object.keys(h).length-1),t),octave:t}}();return{tonic:e,interval:function(e){var t=g(1)?1:-1,n=g(2)*t,a=g(7);return{number:a,note:f(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:v.MAJOR,a=e-1;if(a<0)return t;var r=n.reduce((function(e,t,n){return n>a?e:e+t}),0);return t+r}(a,e.note),n),octave:n}}(e)}}function g(e){return Math.floor(Math.random()*Math.floor(e+1))}function w(e){return T.apply(this,arguments)}function T(){return(T=Object(d.a)(l.a.mark((function e(t){var n,a,r,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:500,a=t.tonic,r=t.interval,e.next=4,C(a.note,n);case 4:return e.next=6,C(r.note,n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;if(!a.context||!a.oscilator)throw new Error("Audio engine not initialised.");var n=b(e);return a.oscilator.frequency.setTargetAtTime(n,a.context.currentTime,0),new Promise((function(e){a.context.resume(),setTimeout((function(){a.context.suspend(),e()}),t)}))}function y(e){if(!e)return"???";var t=(e/1e3).toFixed(2);return"".concat(t,"s")}function k(e,t){return H.apply(this,arguments)}function H(){return(H=Object(d.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=p(),t.questions.unshift(a),n(Object(u.a)({},t)),e.next=5,w(t.questions[0]);case 5:t.questions[0].hasPlayed=!0,t.questions[0].start=Date.now(),n(Object(u.a)({},t));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=function(e){var t=e.start;return o.a.createElement("section",{className:"start"},o.a.createElement("header",null,"Ear Trainer \ud83c\udfbc"),o.a.createElement("button",{onClick:t},"Press to START!"))},q=function(e){var t=e.answer,n=e.question,a=e.skipQuestion,r=e.end;return o.a.createElement("section",{className:"question"},o.a.createElement("header",null,"What is the interval?"),o.a.createElement("section",{className:"choice"},o.a.createElement("button",{value:0,onClick:t,disabled:!n.hasPlayed},"1"),o.a.createElement("button",{value:1,onClick:t,disabled:!n.hasPlayed},"2"),o.a.createElement("button",{value:2,onClick:t,disabled:!n.hasPlayed},"3"),o.a.createElement("button",{value:3,onClick:t,disabled:!n.hasPlayed},"4"),o.a.createElement("button",{value:4,onClick:t,disabled:!n.hasPlayed},"5"),o.a.createElement("button",{value:5,onClick:t,disabled:!n.hasPlayed},"6"),o.a.createElement("button",{value:6,onClick:t,disabled:!n.hasPlayed},"7"),o.a.createElement("button",{value:7,onClick:t,disabled:!n.hasPlayed},"+1")),o.a.createElement("section",{className:"other-actions"},o.a.createElement("button",{onClick:function(){return w(n)},disabled:!n.hasPlayed},"Re-play"),o.a.createElement("button",{onClick:a,disabled:!n.hasPlayed},"Next!"),o.a.createElement("button",{onClick:r,disabled:!n.hasPlayed},"Enough! Show how well I did")))},x=function(e){var t=e.isChoiceCorrect;return o.a.createElement("section",{className:"choice"},o.a.createElement("p",null,t?"CORRECT! \ud83c\udf89":"Incorrect... \ud83d\ude28"),o.a.createElement("p",null,o.a.createElement("strong",null,"But what about this one?")))},P=function(e){var t,n,a=e.stats;return o.a.createElement("section",{className:"end"},o.a.createElement("header",null,"THE END..."),a.totalQuestions>0&&o.a.createElement(o.a.Fragment,null,o.a.createElement("br",null),o.a.createElement("strong",null,"Total questions: "),a.totalQuestions,o.a.createElement("br",null),o.a.createElement("strong",null,"Correct: "),a.totalCorrect,o.a.createElement("br",null),o.a.createElement("strong",null,"Incorrect: "),a.totalIncorrect,o.a.createElement("br",null),o.a.createElement("strong",null,"Faster hit: "),y(null===(t=a.fasterHit)||void 0===t?void 0:t.timeToHit),o.a.createElement("br",null),o.a.createElement("strong",null,"Slower hit: "),y(null===(n=a.slowerHit)||void 0===n?void 0:n.timeToHit),o.a.createElement("br",null),o.a.createElement("strong",null,"Avg time to hit: "),y(a.avgTimeToHit),o.a.createElement("br",null),o.a.createElement("strong",null,"Total elapsed time: "),y(a.totalTime)))};var j=function(){var e=Object(r.useState)({}),t=Object(m.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)({}),c=Object(m.a)(i,2),s=c[0],h=c[1],v=function(e){var t,n=!!e.start,a=!!e.end,r=e.questions,o=r&&r.length>0?r[0]:void 0,i=null===o||void 0===o?void 0:o.choice;return{hasGameStarted:n,hasGameEnded:a,questions:r,question:o,hasMadeChoice:void 0!==i,isChoiceCorrect:i===(null===o||void 0===o||null===(t=o.interval)||void 0===t?void 0:t.number)}}(n);console.debug({gameState:n,gameProps:v,stats:s});var f=v.hasGameStarted,b=v.hasGameEnded,p=v.question,g=v.hasMadeChoice,w=v.isChoiceCorrect;function T(){return{start:Date.now(),questions:[],end:void 0}}function C(){return y.apply(this,arguments)}function y(){return(y=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(),t=T(),e.next=4,k(t,a);case 4:console.debug("START");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(){return j.apply(this,arguments)}function j(){return(j=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(n,a);case 2:console.debug("SKIP QUESTION");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){n.questions[0].choice=Number(e.target.value),n.questions[0].end=Date.now(),a(Object(u.a)({},n)),setTimeout(H,2e3),console.debug("ANSWER")}function S(){n.end=Date.now();var e=function(e){var t={totalQuestions:0,totalIncorrect:0,totalCorrect:0,sumTimeToHit:0};if(e.questions.pop(),e.questions.length<1)return t;var n=e.questions.reduce((function(e,t){if(e.totalQuestions++,t.choice!==t.interval.number)return e.totalIncorrect++,e;e.totalCorrect++;var n=t.end-t.start;e.sumTimeToHit=e.sumTimeToHit+n;var a=e.fasterHit&&e.fasterHit.end-e.fasterHit.start,r=e.fasterHit&&e.slowerHit.end-e.slowerHit.start;return(!a||n<a)&&(e.fasterHit=Object(u.a)({},t,{timeToHit:n})),(!r||n>r)&&(e.slowerHit=Object(u.a)({},t,{timeToHit:n})),e}),t);return n.date=e.start,n.totalTime=e.end-e.start,n.avgTimeToHit=n.totalCorrect&&n.sumTimeToHit/n.totalCorrect,n}(n);h(e),n.start=void 0,a(Object(u.a)({},n)),console.debug("END")}return o.a.createElement("div",{className:"app"},!f&&o.a.createElement(O,{start:C}),f&&!g&&o.a.createElement(q,{answer:N,question:p,skipQuestion:H,end:S}),f&&g&&o.a.createElement(x,{isChoiceCorrect:w}),b&&o.a.createElement(P,{stats:s}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){e.exports=n(15)}},[[7,1,2]]]);
//# sourceMappingURL=main.760cd77c.chunk.js.map