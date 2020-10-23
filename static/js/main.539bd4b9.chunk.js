(this["webpackJsonpear-training"]=this["webpackJsonpear-training"]||[]).push([[0],{12:function(e,t,n){e.exports=n(20)},17:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),o=n(8),l=n.n(o),c=(n(17),n(1)),s=n.n(c),u=n(2),d=n(3),m=n(6),v=(n(19),n(11)),h=n(9),f=n(10),E=function(){function e(){Object(h.a)(this,e),this.context=new(window.AudioContext||window.webkitAudioContext)}return Object(f.a)(e,[{key:"init",value:function(){this.oscillator=this.context.createOscillator(),this.gainNode=this.context.createGain(),this.oscillator.connect(this.gainNode),this.gainNode.connect(this.context.destination)}},{key:"play",value:function(e){this.init(),this.oscillator.frequency.setValueAtTime(e,this.context.currentTime),this.gainNode.gain.setValueAtTime(1,this.context.currentTime),this.oscillator.start()}},{key:"stop",value:function(){this.gainNode.gain.setValueAtTime(0,this.context.currentTime),this.oscillator.stop(this.context.currentTime+1)}}]),e}(),p={MAJOR:[2,2,1,2,2,2,1]};function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e+12*t}function w(e){return Number((440*Math.pow(2,e/12)).toFixed(2))}function g(){a=new E}function H(){var e=function(){var e=C(1)?1:-1,t=C(2)*e;return{note:b(C(11),t),octave:t}}();return{tonic:e,interval:function(e){var t=C(1)?1:-1,n=C(2)*t,a=C(7),r=b(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p.MAJOR,a=e-1;if(a<0)return t;var r=n.reduce((function(e,t,n){return n>a?e:e+t}),0);return t+r}(a,e.note),n);return{number:a=function(e,t,n,a){if((e-t.note)%12===0){var r=n-t.octave;r>0&&(a=7),r<0&&(a=0)}e===t.note&&(a=0);return a}(r,e,n,a),note:r,octave:n}}(e)}}function C(e){return Math.floor(Math.random()*Math.floor(e+1))}function y(e){return x.apply(this,arguments)}function x(){return(x=Object(d.a)(s.a.mark((function e(t){var n,a,r,i=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:750,a=t.tonic,r=t.interval,e.next=4,k(a.note,n);case 4:return e.next=6,k(r.note,n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e,t){return T.apply(this,arguments)}function T(){return(T=Object(d.a)(s.a.mark((function e(t,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.play(w(t)),e.abrupt("return",new Promise((function(e){setTimeout((function(){a.stop(),e()}),n)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){var t={totalQuestions:0,totalIncorrect:0,totalCorrect:0,sumTimeToHit:0,slowerHit:{},fasterHit:{},avgHit:{},date:e.start,totalTime:e.end-e.start};if(e.questions.length<1)return t;var n=e.questions.reverse(),a=JSON.parse(localStorage.getItem("stats"))||[],r=a.reduce((function(e,t){var n,a,r,i,o,l;return(!e.avgHit||(null===(n=t.avgHit)||void 0===n?void 0:n.time)<(null===(a=e.avgHit)||void 0===a?void 0:a.time))&&(e.avgHit=t.avgHit),(!e.fasterHit||(null===(r=t.fasterHit)||void 0===r?void 0:r.time)<(null===(i=e.fasterHit)||void 0===i?void 0:i.time))&&(e.fasterHit=t.fasterHit),(!e.slowerHit||(null===(o=t.slowerHit)||void 0===o?void 0:o.time)>(null===(l=e.slowerHit)||void 0===l?void 0:l.time))&&(e.slowerHit=t.slowerHit),e}),{}),i=n.reduce((function(e,t){if(e.totalQuestions++,t.choice!==t.interval.number)return e.totalIncorrect++,e;e.totalCorrect++;var n=t.end-t.start;e.sumTimeToHit=e.sumTimeToHit+n;var a=e.fasterHit&&e.fasterHit.end-e.fasterHit.start,r=e.slowerHit&&e.slowerHit.end-e.slowerHit.start;return(!a||n<a)&&(e.fasterHit=Object(u.a)({},t,{time:n})),(!r||n>r)&&(e.slowerHit=Object(u.a)({},t,{time:n})),e}),t);return i.avgHit={time:i.totalCorrect&&i.sumTimeToHit/i.totalCorrect,start:e.start},localStorage.setItem("stats",JSON.stringify([].concat(Object(v.a)(a),[i]))),function(e,t){var n,a,r,i,o,l;e.avgHit.isRecord=(null===(n=e.avgHit)||void 0===n?void 0:n.time)<(null===(a=t.avgHit)||void 0===a?void 0:a.time),e.avgHit.lastRecord=t.avgHit,e.fasterHit.isRecord=(null===(r=e.fasterHit)||void 0===r?void 0:r.time)<(null===(i=t.fasterHit)||void 0===i?void 0:i.time),e.fasterHit.lastRecord=t.fasterHit,e.slowerHit.isRecord=(null===(o=e.slowerHit)||void 0===o?void 0:o.time)>(null===(l=t.slowerHit)||void 0===l?void 0:l.time),e.slowerHit.lastRecord=t.slowerHit}(i,r),i}function q(e){if(!e)return"???";var t=(e/1e3).toFixed(2);return"".concat(t,"s")}function N(e,t){return R.apply(this,arguments)}function R(){return(R=Object(d.a)(s.a.mark((function e(t,n){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=H(),t.questions.unshift(a),n(Object(u.a)({},t)),e.next=5,y(t.questions[0]);case 5:t.questions[0].hasPlayed=!0,t.questions[0].start=Date.now(),n(Object(u.a)({},t));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var j,P=function(e){var t=e.start;return i.a.createElement("section",{className:"start"},i.a.createElement("header",null,"Ear Trainer \ud83c\udfbc"),i.a.createElement("button",{onClick:t},"Press to START!"))},S=function(e){var t=e.answer,n=e.question,a=e.nextQuestion,r=e.end;return i.a.createElement("section",{className:"question"},i.a.createElement("header",null,"What is the interval?"),i.a.createElement("section",{className:"choice"},i.a.createElement("button",{value:0,onClick:t,disabled:!n.hasPlayed},"1"),i.a.createElement("button",{value:1,onClick:t,disabled:!n.hasPlayed},"2"),i.a.createElement("button",{value:2,onClick:t,disabled:!n.hasPlayed},"3"),i.a.createElement("button",{value:3,onClick:t,disabled:!n.hasPlayed},"4"),i.a.createElement("button",{value:4,onClick:t,disabled:!n.hasPlayed},"5"),i.a.createElement("button",{value:5,onClick:t,disabled:!n.hasPlayed},"6"),i.a.createElement("button",{value:6,onClick:t,disabled:!n.hasPlayed},"7"),i.a.createElement("button",{value:7,onClick:t,disabled:!n.hasPlayed},"8")),i.a.createElement("section",{className:"other-actions"},i.a.createElement("button",{onClick:function(){return y(n)},disabled:!n.hasPlayed},"Re-play"),i.a.createElement("button",{onClick:a,disabled:!n.hasPlayed},"Next!"),i.a.createElement("button",{onClick:r,disabled:!n.hasPlayed},"I'm done... Stats!")))},I=function(e){var t=e.isChoiceCorrect,n=e.question,a=e.nextQuestion,r=e.end;return i.a.createElement("section",{className:"choice-feedback"},i.a.createElement("p",null,t?"CORRECT! \ud83c\udf89":"Incorrect... \ud83d\ude28"),!t&&i.a.createElement("p",null,"You chose ",n.choice+1," but the write interval is ",i.a.createElement("strong",null,n.interval.number+1)),i.a.createElement("p",null,i.a.createElement("strong",null,"But what about this one?")),i.a.createElement("p",null,i.a.createElement("button",{onClick:a},"Next, pls!")),i.a.createElement("p",null,i.a.createElement("button",{onClick:function(){return r(!1)}},"I'm done... Stats!")))},A=function(e){var t=e.stats;return i.a.createElement("section",{className:"end"},i.a.createElement("div",{className:"stats"},t.totalQuestions>0&&i.a.createElement(i.a.Fragment,null,i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Total questions")),i.a.createElement("td",null,t.totalQuestions)),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Correct")),i.a.createElement("td",null,t.totalCorrect)),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Incorrect")),i.a.createElement("td",null,t.totalIncorrect)),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Faster hit")),i.a.createElement("td",null,i.a.createElement(M,{stat:t.fasterHit}))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Slower hit")),i.a.createElement("td",null,i.a.createElement(M,{stat:t.slowerHit}))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Avg time to hit")),i.a.createElement("td",null,i.a.createElement(M,{stat:t.avgHit}))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("strong",null,"Total elapsed time")),i.a.createElement("td",null,q(t.totalTime))))))))};function M(e){var t,n,a,r,o=e.stat;return i.a.createElement(i.a.Fragment,null,q(null===o||void 0===o?void 0:o.time)," ",(null===o||void 0===o?void 0:o.isRecord)?i.a.createElement("strong",null," RECORD!"):i.a.createElement("span",null,(null===o||void 0===o||null===(t=o.lastRecord)||void 0===t?void 0:t.time)&&i.a.createElement(i.a.Fragment,null," - Last record: ",i.a.createElement("strong",null,q(null===o||void 0===o||null===(n=o.lastRecord)||void 0===n?void 0:n.time))),(null===o||void 0===o||null===(a=o.lastRecord)||void 0===a?void 0:a.start)&&" at "+new Intl.DateTimeFormat("en-US").format(new Date(null===o||void 0===o||null===(r=o.lastRecord)||void 0===r?void 0:r.start))))}var Q=function(){var e=Object(r.useState)({}),t=Object(m.a)(e,2),n=t[0],a=t[1],o=Object(r.useState)({}),l=Object(m.a)(o,2),c=l[0],v=l[1],h=function(e){var t,n=!!e.start,a=!!e.end,r=e.questions,i=r&&r.length>0?r[0]:void 0,o=null===i||void 0===i?void 0:i.choice;return{hasGameStarted:n,hasGameEnded:a,questions:r,question:i,hasMadeChoice:void 0!==o,isChoiceCorrect:o===(null===i||void 0===i||null===(t=i.interval)||void 0===t?void 0:t.number)}}(n),f=h.hasGameStarted,E=h.hasGameEnded,p=h.question,b=h.hasMadeChoice,w=h.isChoiceCorrect;function H(){return{start:Date.now(),questions:[],end:void 0}}function C(){return y.apply(this,arguments)}function y(){return(y=Object(d.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(),t=H(),e.next=4,N(t,a);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return k.apply(this,arguments)}function k(){return(k=Object(d.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return clearTimeout(j),e.next=3,N(n,a);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){n.questions[0].choice=Number(e.target.value),n.questions[0].end=Date.now(),a(Object(u.a)({},n)),j=setTimeout(x,3e3)}function q(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];clearTimeout(j),e&&n.questions.shift(),n.end=Date.now();var t=O(n);v(t),n.start=void 0,a(Object(u.a)({},n))}return i.a.createElement("div",{className:"app"},!f&&i.a.createElement(P,{start:C}),f&&!b&&i.a.createElement(S,{answer:T,question:p,nextQuestion:x,end:q}),f&&b&&i.a.createElement(I,{isChoiceCorrect:w,question:p,nextQuestion:x,end:q}),E&&i.a.createElement(A,{stats:c}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.539bd4b9.chunk.js.map