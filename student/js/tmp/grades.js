function scores(){
	var student = sessionStorage.getItem("currentUser");
	var uniqueExam = sessionStorage.getItem("uniqueExam");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 //alert(data);
			 var jsonResponse = JSON.parse(data);
			 
			 loadScores(jsonResponse);
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(`student=${student}&uniqueExam=${uniqueExam}`);
}

function loadScores(examScores){
	var examTable = document.getElementById("ExamTable");
	var studentTable = document.getElementById("studentTable");
	var student = sessionStorage.getItem("currentUser");
	
	var tableRow = document.createElement("tr");
	var tableElementUser = document.createElement("td");
	tableElementUser.appendChild(document.createTextNode(student));
	var tableElementFinalGrade = document.createElement("td");
	tableElementFinalGrade.appendChild(document.createTextNode(examScores[examScores.length-1] + "%"));
	
	studentTable.appendChild(tableRow);
	tableRow.appendChild(tableElementUser);
	tableRow.appendChild(tableElementFinalGrade);
	
	for(var i = 0; i < examScores.length-1; i+=4){
			var question = examScores[i];
			var studentAnswer = examScores[i+1];
			var grade = examScores[i+2];
			var comments = examScores[i+3];
		
			var tableRow = document.createElement("tr");
			var tableElementQuestion = document.createElement("td");
			var tableElementAnswer = document.createElement("td");
			var tableElementDeductions = document.createElement("td");
			var tableElementGrade = document.createElement("td");
		
			var questionTextPara = document.createElement("p");
			questionTextPara.setAttribute("class", "quesDedu");
			var questionText = document.createTextNode(question);
			questionTextPara.appendChild(questionText);
			tableElementQuestion.appendChild(questionTextPara);
		
			var studentAnswerPara = document.createElement("p");
			studentAnswerPara.setAttribute("class", "studentAnsClass");
			var studentAnswerText = document.createTextNode(studentAnswer);
			studentAnswerPara.appendChild(studentAnswerText);
			tableElementAnswer.appendChild(studentAnswerPara);
		
			var commentsTextPara = document.createElement("p");
			commentsTextPara.setAttribute("class", "quesDedu");
			var commentsText = document.createTextNode(comments);
			commentsTextPara.appendChild(commentsText);
			tableElementDeductions.appendChild(commentsTextPara);
			
			var gradeText = document.createTextNode(grade);
			tableElementGrade.appendChild(gradeText);
		
			examTable.appendChild(tableRow);
			tableRow.appendChild(tableElementQuestion);
			tableRow.appendChild(tableElementAnswer);
			tableRow.appendChild(tableElementDeductions);
			tableRow.appendChild(tableElementGrade);
			
	}
}