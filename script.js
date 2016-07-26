		var timer;
		var timer2;
		var timer3;
		var now;
		var now2;
		var time;
		var runS;
		var runScorr;
		var price;
		var tarif;
		var tarif2;
        var nobar;
        var stopgame;
		var editPrice = new Array();
		var editRunS = new Array();
		
		function checkTime(i){
			if (i<10){
				i="0" + i;
			}
			return i;
		}
		
		function showTime() {  /* выводит текущие время */
			now = new Date();
			var hours = checkTime(now.getHours());
			var min = checkTime(now.getMinutes());
			var sec = checkTime(now.getSeconds());
			var c = document.getElementById('real_time');
			time = hours + ":" + min + ":" + sec;
			c.innerHTML = "Текущие время - " + time;
			if(time >= "15:00:00" && time <= "17:59:59") {tarif = 150; nobar = 1; }
			if(time >= "18:00:00" && time <= "20:59:59") {tarif = 210; nobar = 1; }
			if(time >= "21:00:00" && time <= "23:59:59") {tarif = 300; nobar = 1; }
			if(time >= "00:00:00" && time <= "02:59:59") {tarif = 360; nobar = 1; }
            if(time >= "03:00:00" && time <= "14:59:59") {tarif = 0; nobar = null; }
			var z = document.getElementById('tarif');
			z.innerHTML = "Тариф: " + tarif + " руб/ч*";
            status();
		}
		timer = window.setInterval("showTime()", 1000);
		
		function runTime(){  /* устанавливаем время начала игры по клику */
            if(nobar){
			var t = document.getElementById('run_game');
			t.innerHTML = "Начало игры - " + time;
			now2 = now;
			tarif2 = tarif;
			timer2 = window.setInterval("lengthGame()", 1000);
			timer3 = window.setInterval("costGame()", 1000);
			priceGame();
            status();
            }else{ alert("Клуб закрыт! Стол открыть невозможно..."); }
		}
		
		function lengthGame(){  /* определяем и высчитываем продолжительность игры */
			if(tarif == tarif2){
				runS = parseInt(((now - now2)/1000)/60);
			}else{
				editRunS.push(runS + 1);
				now2 = now;
				runS = 0;
			}
			if(editRunS.length > 0){
			for(var i=0; i<editRunS.length; i++) {
  					runScorr = runS + editRunS[i];
				}
			}else{runScorr = runS;}
			var r = document.getElementById('time_game');
			if(runScorr >= 1){
				r.innerHTML = "Длительн. - " + runScorr + " мин.";
			}else{
				r.innerHTML = "Длительн. - " + "< 1 мин.";
			}
			
		}
		
		function costGame(){  /* считаем текущую стоимость */
				if(tarif == tarif2){
					price = Number(runS) * (tarif2/60);
					
				}else{ 
					tarif2 = tarif;
					editPrice.push(price+(tarif2/60));
					price = 0;
					}
					
				for(var i=0; i<editPrice.length; i++) {
  					price = price + editPrice[i];
				}
			var p = document.getElementById('summ');
			p.innerHTML = "Cтоимость: " + price + " руб.";
		}
		
        function status(){
            var x = document.getElementById('status');
            if(nobar){
                if(now2){
                    x.innerHTML = "<h3 class='green'>Стол открыт</h3>";
                }
                if(now2 == 0){
                    x.innerHTML = "<h3 class='red'>Стол закрыт в " + stopgame + "</h3>";
                }
            }else{
			    x.innerHTML = "<h3>Клуб закрыт! Работает с 15:00</h3>";
            }
        }
		
		function pauseTime() {
			window.clearInterval(timer2);
			window.clearInterval(timer3);
			timer2 = null;
			timer3 = null;
            now2 = 0;
            stopgame = time;
		}
		
		function sbrosTime() {
			window.location.reload()
		}
	