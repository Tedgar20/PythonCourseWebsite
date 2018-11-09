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
	//var mainDiv = document.getElementById("main");
	//var gradeH1 = document.getElementById("grade");
	
	var tableRow = document.createElement("tr");
	var tableElementUser = document.createElement("td");
	tableElementUser.appendChild(document.createTextNode(student));
	var tableElementFinalGrade = document.createElement("td");
	tableElementFinalGrade.appendChild(document.createTextNode(examScores[examScores.length-1] + "%"));
	
	examTable.appendChild(tableRow);
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
		
			var questionText = document.createTextNode(question);
			tableElementQuestion.appendChild(questionText);
		
			var studentAnswerText = document.createTextNode(studentAnswer);
			tableElementAnswer.appendChild(studentAnswer);
		
			var commentsText = document.createTextNode(comments);
			tableElementDeductions.appendChild(commentsText);
			
			var gradeText = document.createTextNode(grade);
			tableElementGrade.appendChild(gradeText);
		
			examTable.appendChild(tableRow);
			tableRow.appendChild(tableElementQuestion);
			tableRow.appendChild(tableElementAnswer);
			tableRow.appendChild(tableElementDeductions);
			tableRow.appendChild(tableElementGrade);
			
	}
}

/*var question = examScores[i];
			var studentAnswer = examScores[i+1];
			var grade = examScores[i+2];
			var comments = examScores[i+3];
		
			//var tableRow = document.createElement("tr");
			//var tableElement = document.createElement("td");
	
			//var questionInput = document.createElement("TEXTAREA");
			questionInput.defaultValue = question;
			questionInput.readOnly = true;
		
			var questionPara = document.createElement("p");
			var questionParaText = document.createTextNode(question);
			questionPara.appendChild(questionParaText);
			questionPara.setAttribute("id", "question");
		
			var questionDiv = document.createElement("div");
			questionDiv.appendChild(questionPara);
			questionDiv.setAttribute("class", "questionDivClass");
		
			var studentAnsTextArea = document.createElement("TEXTAREA");
			studentAnsTextArea.defaultValue = studentAnswer;
		    studentAnsTextArea.readOnly = true;
			
			var gradeInput = document.createElement("INPUT");
			gradeInput.defaultValue = grade;
			gradeInput.readOnly = true;
			gradeInput.setAttribute("type", "number");
			gradeInput.setAttribute("id", "gradeInput");
			gradeInput.setAttribute("min", "0");
			gradeInput.setAttribute("max", "100");
			var gradePara = document.createElement("p");
			var gradeText = document.createTextNode("Points:");
			gradePara.appendChild(gradeText);
			gradePara.setAttribute("id", "gradePara");
		
			var studentResultDiv = document.createElement("div");
			studentResultDiv.setAttribute("class", "studentResultsDivClass");
			studentResultDiv.appendChild(studentAnsTextArea);
			studentResultDiv.appendChild(gradePara);
			studentResultDiv.appendChild(gradeInput);
		
			/*var studentAnsTextArea = document.createElement("TEXTAREA");
			studentAnsTextArea.defaultValue = studentAnswer;
		    studentAnsTextArea.readOnly = true;
			studentAnsTextArea.setAttribute("name", "examRevision[]");
			
			var gradeInput = document.createElement("INPUT");
			gradeInput.defaultValue = grade;
			gradeInput.readOnly = true;
			gradeInput.setAttribute("type", "number");
			gradeInput.setAttribute("min", "0");
			gradeInput.setAttribute("max", "100");
			gradeInput.setAttribute("name", "examRevision[]");
		
			var cmtsTextArea = document.createElement("TEXTAREA");
			cmtsTextArea.defaultValue = comments;
			cmtsTextArea.readOnly = true;
		
			var commentsPara = document.createElement("p");
			var cmtsLabelText = document.createTextNode("Grade Report:");
			commentsPara.appendChild(cmtsLabelText);
			commentsPara.setAttribute("id", "commentsPara");
		
			var commentsDiv = document.createElement("div");
			commentsDiv.setAttribute("class", "commentsDivClass");
			commentsDiv.appendChild(commentsPara);
			commentsDiv.appendChild(cmtsTextArea);
		
		
			mainDiv.appendChild(questionDiv);
			mainDiv.appendChild(studentResultDiv);
			mainDiv.appendChild(commentsDiv);
			
			//examTable.appendChild(tableRow);
			examTable.appendChild(tableElement);
			tableElement.appendChild(questionInput);
			tableElement.appendChild(studentAnsTextArea);
			tableElement.appendChild(gradeInput);
			tableElement.appendChild(cmtsTextArea);