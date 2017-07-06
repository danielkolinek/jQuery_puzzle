$(function(){
	//move counter
	var counter = 0;
	//is viewed picture or puzzle
	var puzzle = true;
	//starting position of free space
	var free = 15;
	//array of numbers (val in div with picture)
	var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	//reshufle pieces by clicking on button
	$('#shufle').click(function() {



		//count of numbers in array (val in div with picture)
		var count = 15;
		//mix all numbers
		for(var i = 0; i < numbers.length; i++ ){
			var j = Math.floor((Math.random() * count));
			var tmp = numbers[i];
			numbers[i] = numbers[j];
			numbers[j] = tmp;
		}
		//give each piece it's position (position is randomized by array)
		for(var i = 0; i < numbers.length; i++){
			var selector = ".piece[val=" + i + "]";
			$(selector).attr("now",numbers[i]);


			//set left
			if(numbers[i] % 4 === 0){
				$(selector).css("left",0);
			}else if(numbers[i] % 4 === 1){
				$(selector).css("left",102);
			}else if(numbers[i] % 4 === 2){
				$(selector).css("left",204);
			}else if(numbers[i] % 4 === 3){
				$(selector).css("left",306);
			}

			//set top
			if( (numbers[i] >= 0) && (numbers[i] <= 3) ){
				$(selector).css("top",0);
			}else if( (numbers[i] >= 4) && (numbers[i] <= 7) ){
				$(selector).css("top",102);
			}else if( (numbers[i] >= 8) && (numbers[i] <= 11) ){
				$(selector).css("top",204);
			}else if( (numbers[i] >= 12) && (numbers[i] <= 14) ){
				$(selector).css("top",306);
			}
		}
		free = 15;
		//reset counter
		counter = 0;
		$("#counter").text("Počet tahů je " + counter);
		$("#end").text('');
		$(".counter").css("display", "block");
	});
	//move
	$('.piece').click(function() {
		$("#end").text('');
		var position = parseInt($(this).attr("now"));
		var move = 102;
		//go down
		if (parseInt($(this).attr("now"))+4 == free){
			$(this).css("top",parseInt($(this).css("top"))+move);
			free = free - 4;
			$(this).attr("now", position+4);
			counter++;
		}
		//go left
		else if(parseInt($(this).attr("now"))+1 == free){
			$(this).css("left", parseInt($(this).css("left"))+move);
			free = free - 1;
			$(this).attr("now", position+1);
			counter++;
		}
		//go right
		else if(parseInt($(this).attr("now"))-1 == free){
			$(this).css("left", parseInt($(this).css("left"))-move);
			free = free + 1;
			$(this).attr("now", position-1);
			counter++;
		}
		//go up
		else if (parseInt($(this).attr("now"))-4 == free){
			$(this).css("top",parseInt($(this).css("top"))-move);
			free = free + 4;
			$(this).attr("now", position-4);
			counter++;
		}
		//write count
		$("#counter").text("Počet tahů je " + counter);
		//check if done
		var i = 0;
		var equal = true;
		while(equal && i<numbers.length){
			var selector = ".piece[val=" + i + "]";
			if (i != parseInt($(selector).attr("now"))){
				equal = false;
			}
			i++;
		}
		if(equal){
			$("#counter").next().text("Počet tahů je " + counter);
			$("#end").text('Výborně');
			//reset counter
			counter = 0;

		}

	});
	$('#see').click(function() {
        $(".piece").toggle();
        $(".puzzle_picture").toggle();
        if(puzzle){
        	$("#see").text("Zobrazit puzzle");
        	puzzle = false;
        }else{
        	$("#see").text("Zobrazit původní obrázek");
        	puzzle = true;
        }
	});
});
