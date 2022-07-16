window.addEventListener('DOMContentLoaded', function(){
	'use strict';
	let input = document.getElementsByTagName('input'),
		btn = document.getElementsByClassName('button'),
		inputTime = document.getElementById('deadline'),
		overlay = document.querySelector('.overlay'),
		startTimer = document.getElementById('start'),
		stopTimer = document.getElementById('stop'),
		deadLine = '',
		timer = document.getElementById('timer'),
		days = timer.querySelector('.days'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		stop = false;
		close = document.querySelector('.popup-close');		
		
	function getTimeRemaining(endtime){
			let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t/1000) % 60),
				minutes = Math.floor((t/1000/60) % 60),
				hours = Math.floor((t/1000/60/60) % 24),
				days = Math.floor(t/1000/60/60/24);
				
				if (days < 9) {
					days = '0' + days;
				}
				
				if (hours < 10) {
					hours = '0' + hours;
				}
		
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
		
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				
				return {
					'total': t,
					'days': days,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				};
	}
	
	function display(){
						overlay.style.display = 'block';
						overlay.classList.add('more-splash');
						document.body.style.overflow = 'hidden';
	};

	function reset (){
		inputTime.value = '';
		days.innerHTML = '00',
		hours.innerHTML = '00',
		minutes.innerHTML = '00',
		seconds.innerHTML = '00'
	}

	function setClock(id, endtime){
		let timeInterval = setInterval(updateClock, 1000);
			
		function updateClock(){
			let t = getTimeRemaining(endtime);
				days.textContent = t.days;
				hours.textContent = t.hours;
				minutes.textContent = t.minutes;
				seconds.textContent = t.seconds;
				
				if (t.total <= 0){
					clearInterval(timeInterval);
					display();
					reset();
				}else{
					if(stop == true){
						clearInterval(timeInterval);
						reset();
					}
				}	
		};
	}
	
	
	
	startTimer.addEventListener('click', function(){
		stop = false;
		deadLine = inputTime.value;
		if(deadLine == '' || null){
			alert('Введите время в формате ГГГГ-ММ-ДД');
		}else{
		setClock(timer, deadLine);
		}
	});
	
	
	
	close.addEventListener('click', function(){
			overlay.style.display = 'none';
			startTimer.classList.remove('more-splash');
			document.body.style.overflow = '';
		});
		
	stopTimer.addEventListener('click', function(){
		stop = true;
	});

});