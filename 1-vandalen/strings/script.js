"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		var answer = new Array();
		var character;
		var i;
		
		if (str.length === 0){
                try {
                    throw new Error('Hallå där! Du måste skriva något!');
                }
                catch (e){
                    return(e.message);
                }
            }
        
        for (i = 0; i <= str.length; i++){
            character = str.charAt(i);
            
            if (character === 'a' || character === 'A'){
                character = '#';
                answer[i] = character;
            }
            else if (character === character.toLowerCase()){
                answer[i] = character.toUpperCase();
            }
            else if (character === character.toUpperCase()){
                answer[i] = character.toLowerCase();
            }
        }
        
        return answer.join('');



	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};