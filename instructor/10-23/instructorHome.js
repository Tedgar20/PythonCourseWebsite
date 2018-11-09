//This function gets questions from the question bank and populates a form with all the available questions
function getQuestions(){
	var currentUser = sessionStorage.getItem("currentUser");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 jsonResponse = JSON.parse(data);
			 //document.getElementById("Database").innerHTML = data;
			 makeForm();
			 for( var i in jsonResponse ){
				loadQuestion(jsonResponse[i], +i+1);
			}
			addButton();
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(`submit=submit&currentUser=${currentUser}`);
}

//Creates a form that handles selecting questions for an exam
function makeForm(){
	var myForm = document.createElement('form');
	myForm.setAttribute("id", "choice");
	myForm.setAttribute("action", "javascript:makeExam()");
	myForm.setAttribute("method", "post");
	myForm.setAttribute("accept-charset", "utf-8");	

	document.getElementById("makeExamDiv").appendChild(myForm);
}

//This function is called only when question are loaded and is ment to add a submit button for the make exam form
function addButton(){
	 var mybr = document.createElement('br');
	 var newButton = document.createElement("INPUT");

	 newButton.setAttribute("type", "submit");
	 newButton.setAttribute("name", "submit");
	 newButton.setAttribute("value", "Make Exam");

	 document.getElementById("choice").appendChild(newButton);
	 document.getElementById("choice").appendChild(mybr);
}

//This function loads all the questions that were submitted to the question bank
function loadQuestion (question, num) { 
	var mybr = document.createElement('br');
	var newContent = document.createTextNode(question);

	var newInput = document.createElement("INPUT"); 
	newInput.setAttribute("type", "checkbox");
	newInput.setAttribute("name", "formCheck[]");
	newInput.setAttribute("id", "question"+num);
	newInput.setAttribute("value", question);
	
	var newLabel = document.createElement("LABEL");
	newLabel.setAttribute("for", "question"+num);
	newLabel.setAttribute("id", num);

	document.getElementById("choice").appendChild(newInput);
	document.getElementById("choice").appendChild(newLabel);
	document.getElementById(num).appendChild(newContent);
	document.getElementById("choice").appendChild(mybr);
}

//This function takes the questions you chose and makes an exam for you with those questions
function makeExam(){
	var xhttp = new XMLHttpRequest();
	var form = document.getElementById("choice");
	var formData = new FormData(form);

	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 //var jsonResponse = JSON.parse(data);
			 //document.getElementById("Database").innerHTML = data;
			 document.getElementById("choice").reset();
			 alert("Exam Created");

		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.send(formData);
}

function submitQuestion(Q1,F1,A1){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 window.location.reload();
			 document.getElementById("question").reset();
			 //document.getElementById("Database").innerHTML = this.responseText;
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(`question1=${Q1}&function1=${F1}&answer1=${A1}`);
 }

function filterQuestions(diff,type){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var choice = document.getElementById("choice")
			 document.getElementById("makeExamDiv").removeChild(choice);
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(`diff=${diff}&type=${type}`);
}