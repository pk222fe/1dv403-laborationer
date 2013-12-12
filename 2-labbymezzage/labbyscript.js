"user strict";

function dateFormat(dateToFix) {
	var hour = dateToFix.getHours();
	// Formatering ifall timmen är mindre än 10.
	if (hour < 10){
		hour = "0"+hour;
	}
    // Formatering ifall minuten är mindre än 10.
    var minute = dateToFix.getMinutes();
	if (minute < 10){
		minute = "0"+minute;
	}
	// Formatering ifall sekunder är mindre än 10.
	var second = dateToFix.getSeconds();
	if (second < 10){
		second = "0"+second;
	}
	
	return hour+":"+minute+":"+second;
}

function infoFormat(dateToOpen) {
    var year = dateToOpen.getFullYear();
    var month = dateToOpen.getMonth();
    var date = dateToOpen.getDate();
    var monthName = "";

    if (month === 0) {
        monthName = "Januari";
    }
    
    else if (month === 1) {
        monthName = "Februari";
    }
    
    else if (month === 2) {
        monthName = "Mars";
    }
    
    else if (month === 3) {
        monthName = "April";
    }
    
    else if (month === 4) {
        monthName = "Maj";
    }
    
    else if (month === 5) {
        monthName = "Juni";
    }
    
    else if (month === 6) {
        monthName = "Juli";
    }
    
    else if (month === 7) {
        monthName = "Augusti";
    }
    
    else if (month === 8) {
        monthName = "September";
    }
    
    else if (month === 9) {
        monthName = "Oktober";
    }
    
    else if (month === 10) {
        monthName = "November";
    }
    
    else{
        monthName = "December";
    }

    return "Inlägget skapades den " + date + " " + monthName + " " + year + " " + dateFormat(dateToOpen) + ".";
}

function Message(message, date){
	
	this.getText = function() {
	    return message;
	};
		
	this.setText = function(_message) {
		message = _message;
	};
		
	this.getDate = function() {
		return date;
	};
		
	this.setDate = function(_date) {
		date = _date;
	};
}

Message.prototype.toString = function(){
	return this.getText()+" ("+this.getDate()+")";
};

Message.prototype.getHTMLText = function () {
    return this.getText().replace(/[\n\r]/g, "<br />");
};

function MessageBoard() {
    var that = this;
    this.messages = [];

    var content = document.createElement("div");
    document.body.appendChild(content);
    content.className = "content";

    var header = document.createElement("header");
    content.appendChild(header);
    var h1_header = document.createElement("h1");
    var h1_text = document.createTextNode("Labby Mezzage");
    h1_header.appendChild(h1_text);
    header.appendChild(h1_header);

    var divMessageBoard = document.createElement("div");
    content.appendChild(divMessageBoard);
    divMessageBoard.className = "MessageBoard";

    var divMessageArea = document.createElement("div");
    divMessageBoard.appendChild(divMessageArea);
    divMessageArea.className = "messageArea";

    var textareaMessage = document.createElement("textarea");
    divMessageBoard.appendChild(textareaMessage);
    textareaMessage.className = "messageText";
    textareaMessage.value = "";
    textareaMessage.placeholder = "Skriv ditt meddelande";
    textareaMessage.onkeypress = function (e) {
        if (!e) { e = window.event; }
        if (!e.shiftKey && e.keyCode === 13) {
            that.klick();
            return false;
        }
    };

    var buttonSubmitMessage = document.createElement("button");
    var buttonText = document.createTextNode("Skriv");
    divMessageBoard.appendChild(buttonSubmitMessage);
    buttonSubmitMessage.appendChild(buttonText);
    buttonSubmitMessage.onclick = function () {
        that.klick();
        return false;
    };
    this.renderMessages = function () {
        divMessageArea.innerHTML = "";
        for (var i = 0; i < this.messages.length; ++i) {
            this.renderMessage(i);
            window.scrollTo(0, i * 95);
        }

        var pAntalMeddelanden = document.createElement("p");
        divMessageArea.appendChild(pAntalMeddelanden);
        pAntalMeddelanden.className = "antalMeddelanden";
        var theAntal = document.createTextNode("Antal meddelanden: " + this.messages.length);
        pAntalMeddelanden.appendChild(theAntal);

    };

    this.renderMessage = function (messageID) {

        // Designen.
        var divMessage = document.createElement("div");
        divMessageArea.appendChild(divMessage);
        divMessage.className = "message";

        // Meddelandet
        var theText = document.createElement("p");
        theText.className = "theTexting";
        theText.innerHTML = this.messages[messageID].getHTMLText();
        divMessage.appendChild(theText);

        // Infoknappen.
        var infoButton = document.createElement("a");
        infoButton.innerHTML = "<img height='24' src='pics/Button-Info-icon.png' alt='Info Knappen' />";
        divMessage.appendChild(infoButton);
        infoButton.className = "right";
        infoButton.href = "#";
        infoButton.onclick = function () {
            that.infoMessage(messageID);
            return true;
        };

        // Deleteknappen.
        var deleteButton = document.createElement("a");
        deleteButton.innerHTML = "<img height='24' src='pics/Button-Delete-icon.png' alt='Delete Knappen' />";
        divMessage.appendChild(deleteButton);
        deleteButton.className = "right";
        deleteButton.href = "#";
        deleteButton.onclick = function () {
            that.removeMessage(messageID);
            return true;
        };

        // Datumet
        var dateParagraph = document.createElement("p");
        divMessage.appendChild(dateParagraph);
        dateParagraph.className = "messageDate";
        var theDate = document.createTextNode(dateFormat(this.messages[messageID].getDate()));
        dateParagraph.appendChild(theDate);
    };

    this.removeMessage = function (messageID) {
        if (confirm("Är du säker på att du vill tabort meddelandet?") === true) {
            that.messages.splice(messageID, 1);
            that.renderMessages();
            return false;
        }
    };

    this.infoMessage = function (messageID) {
        alert(infoFormat(this.messages[messageID].getDate()));
        return false;
    };

    this.klick = function () {
        if (textareaMessage.value === "") {
            alert("Skriv något först!");
            return false;
        }
        else {
            this.messages.push(new Message(textareaMessage.value, new Date()));
            this.renderMessages();
            textareaMessage.value = "";
            textareaMessage.placeholder = "Skriv ditt meddelande";
            return false;
        }
    };
    

    

    var clearFix = document.createElement("div");
    content.appendChild(clearFix);
    clearFix.className = "clearfix";
}

window.onload = function () {
    new MessageBoard();
};