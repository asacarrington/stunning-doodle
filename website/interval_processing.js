	$(document).ready(function () {
		//instance variables, and scale initialisations
		var $cards = $('.row p'),scales = [], notes = [], mapping = [], sorted = [], derived = [], RandomiserScales = [], duplicates = [], selectedScale, intervalsContainer = [], intervalCount = 0, selectedTone = '';
		scales['Minor'] = ['t','s','t','t','s','t','s'];
		scales['Major'] = ['t','t','s','t','t','t','s'];
		notes = ['A', 'A#','B','C','C#','D', 'D#', 'E','F','F#','G','G#'];
		RandomiserScales = ['Minor', 'Major'];
		intervalsContainer = [0,1,2,3,4,5,6];
		//set up dom elements
		InitilisePage();

		//add event listerner
		$('#submit').click(function(){
			$("#lld-results").show();
			$( "#deck" ).empty();
			intervalsContainer = [0,1,2,3,4,5,6];
			selectedScale = $('#dd-scales').val();
			selectedTone = $('#dd-tones').val();
			intervalCount = $('#dd-interval-count').val();

			var randomiserData = '<h3> You Scale is: ' + selectedScale + '</br>Your Tone is: ' + selectedTone + '</h3>';
			$('#info-panel').html(randomiserData);

			if(selectedScale == 'Random' || intervalCount == 'Random' || selectedTone == 'Random'){
				LessSuperRandom(selectedScale, intervalCount, selectedTone);
				console.log('one of you is random');
			}
			else{
			SortNotes(selectedTone);
			DeriveScale(selectedScale);
			UpdateCards();}
		});

		$('#super-random').click(function(){
			$("#lld-results").show();
			SuperRandom();
		});


		//return random intervals from derived scale
		function GetIntervals(){
			var random = Math.floor(Math.random() * intervalsContainer.length);
			var displayValue =  (intervalsContainer[random] +  ' ' + derived[intervalsContainer[random]]) +'';
			intervalsContainer.splice(random,1);
			console.log('r ' + random + 'dis ' + displayValue);
			return displayValue + '';
		}
		//sort notes acording to selected tone
		function SortNotes(tone){
			var tonePosistion = 0;
			for(var i = 0; i < notes.length; i++){
				if(notes[i] == tone){
					tonePosistion = i;
				}
			}
			for(var i = 0; i < notes.length; i++){
					if(tonePosistion >= notes.length){tonePosistion=0;}
					sorted[i] = notes[tonePosistion];
					tonePosistion++;
			}
			console.log(sorted + 'sorted');
		}
		//create the scale for selected tone
		function DeriveScale(scale){
			var pointer  = 0;
			for(var i = 0; i < scales[scale].length; i++){
				if(scales[scale][i] == 't'){
					derived[i] = sorted[pointer];
					pointer ++;
					console.log('tone' + i);
				}
				else if(scales[scale][i] == 's'){
					derived[i] = sorted[pointer];
					console.log('semi tone' + i);
				}
				pointer++;
			}
			console.log(derived + ' derived');
		}
		//update UI components
		function UpdateCards(){
				var unfilteredIntervals = GetIntervals();
				var intervalCorrection = 0;
				console.log('count from update cards ' + intervalCount);
				var columSize = 12  / intervalCount;
			for(var i = 0; i < intervalCount; i++){
					var resultData = GetIntervals().split(" ")
					if(resultData[0] == '0'){
						intervalCorrection = 'Root';
					}
					else{
						intervalCorrection = parseInt(resultData[0])+1;
					}
					console.log(resultData);

					var j = (i%4) + 1;
					//var card = '<div class="'+ /*col-md-'+ columSize +*/ 'lld-card"><div class="panel"><div><h3 class="form-controls"> Your note is: </h3><h1 class="form-controls">'+ resultData[1] + '</h1><h3 class="form-controls">Your interval is: </h3><h1 class="form-controls">' + intervalCorrection + '</h1></div></div></div>';
					var card = '<div class="'+ /*col-md-'+ columSize +*/ 'lld-card lld-card-colour-'+ j +'"><h3 class="form-controls"> Your note is: </h3><h1 class="form-controls">'+ resultData[1] + '</h1><h3 class="form-controls">Your interval is: </h3><h1 class="form-controls">' + intervalCorrection + '</h1></div>';

					var cardContent ='<div><h3 class="form-controls"> Your note is: </h3><h1 class="form-controls">'+ resultData[1] + '</h1><h3 class="form-controls">Your interval is: </h3><h1 class="form-controls">' + intervalCorrection + '</h1></div>';

					$('#deck').append(card);
			}
				$('#cards-container').fadeIn( "slow" );
		}
		//initise dropdowns
		function InitilisePage(){
			for(var i = 0; i  < notes.length; i++){
				//$('<option />', {value: notes[i], text: notes[i]}).appendTo('#tones');
				$('<li value="'+ notes[i] +'"><a href="#">'+ notes[i] +'</a></li>').appendTo("#tones");
			}
			for(var scale in scales){
				//$('<option />', {value: scale, text: scale}).appendTo('#scales');
				$('<li value="'+ scale +'"><a href="#">'+ scale +'</a></li>').appendTo("#scales");
			}
		}
		//select super random functionallity
		function SuperRandom(){
			$( "#deck" ).empty();
			intervalsContainer = [0,1,2,3,4,5,6];
			var randomTone = GetRandom(11);
			SortNotes(notes[randomTone]);
			intervalCount = GetRandom(4)+1;
			var randomScale = RandomiserScales[GetRandom(2)];
			DeriveScale(randomScale);
			UpdateCards();
			var randomiserData = '<h3> You Scale is: ' + randomScale + '</br>Your Tone is: ' + notes[randomTone] + '</h3>';
			$('#info-panel').html(randomiserData);
		}

		function UpdateInfoPannel(scale, tone){

			var randomiserData = '<h3> You Scale is: ' + scale + '</br>Your Tone is: ' + tone + '</h3>';
			$('#info-panel').html(randomiserData);
		}

		function LessSuperRandom(selectedScale, Count, Tone){
			if(Tone == 'Random'){

				Tone = notes[GetRandom(11)];
				SortNotes(Tone);
			}else{SortNotes(Tone)}
			if(selectedScale == 'Random'){
					selectedScale = RandomiserScales[GetRandom(2)];
					DeriveScale(selectedScale);
			}else{
				DeriveScale(selectedScale);
			}if(Count == 'Random'){
				intervalCount = GetRandom(5);
			}
			else{intervalCount = intervalCount;}
			UpdateInfoPannel(selectedScale, Tone);
			UpdateCards();
		}

		function GetRandom(limiter){
			return Math.floor(Math.random() * limiter);
		}

	 });
