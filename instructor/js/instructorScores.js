function getScores(){
	var uniqueID = sessionStorage.getItem("uniqueExam");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 var jsonResponse = JSON.parse(data);
			 loadScores(jsonResponse);
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhttp.send(`uniqueID=${uniqueID}`);
}

function loadScores(examScores){
	var scoresForm = document.getElementById("scores");
	var submitBtn = document.getElementById("submitButton");
	var examTable = document.getElementById("ExamTable");
	var studentName = examScores[0];
	var examID = examScores[1];
	var uniqueID = sessionStorage.getItem("uniqueExam");
	
	for(var i = 2; i < examScores.length; i+=4){
			var question = examScores[i];
			var studentAnswer = examScores[i+1];
			var grade = examScores[i+2];
			var comments = examScores[i+3];
		
			var tableRow = document.createElement("tr");
			tableRow.setAttribute("id", "");
			var tableElement = document.createElement("td");
			tableElement.setAttribute("id", "");
	
			
			/*var questionInput = document.createElement("TEXTAREA");
			questionInput.defaultValue = question;
			questionInput.readOnly = true;*/
		
			var questionPara = document.createElement("p");
			var questionParaText = document.createTextNode(question);
			questionPara.appendChild(questionParaText);
			questionPara.setAttribute("id", "question");
		
			var questionDiv = document.createElement("div");
			questionDiv.appendChild(questionPara);
			questionDiv.setAttribute("class", "questionDivClass");
			//Give each of the below elements the same name except questionInput
			//TextAreas will have a default value set
			//QuestionInput should not be editable
		
			var studentAnsTextArea = document.createElement("TEXTAREA");
			studentAnsTextArea.defaultValue = studentAnswer;
		    studentAnsTextArea.readOnly = true;
			studentAnsTextArea.setAttribute("name", "examRevision[]");
			
			var gradeInput = document.createElement("INPUT");
			gradeInput.defaultValue = grade;
			gradeInput.setAttribute("type", "number");
			gradeInput.setAttribute("id", "gradeInput");
			gradeInput.setAttribute("min", "0");
			gradeInput.setAttribute("max", "100");
			gradeInput.setAttribute("name", "examRevision[]");
			var gradePara = document.createElement("p");
			var gradeText = document.createTextNode("Points:");
			gradePara.appendChild(gradeText);
			gradePara.setAttribute("id", "gradePara");
		
			var studentResultDiv = document.createElement("div");
			studentResultDiv.setAttribute("class", "studentResultsDivClass");
			studentResultDiv.appendChild(studentAnsTextArea);
			studentResultDiv.appendChild(gradePara);
			studentResultDiv.appendChild(gradeInput);
		
			/*var gradeDiv = document.createElement("div");
			gradeDiv.setAttribute("class", "gradeDivClass");
			
			gradeDiv.appendChild(gradeInput);*/
			
			
		
			var cmtsTextArea = document.createElement("TEXTAREA");
			cmtsTextArea.defaultValue = comments;
			cmtsTextArea.setAttribute("name", "examRevision[]");
			cmtsTextArea.setAttribute("id", "comments");
		
			var commentsPara = document.createElement("p");
			var cmtsLabelText = document.createTextNode("Grade Report:");
			commentsPara.appendChild(cmtsLabelText);
			commentsPara.setAttribute("id", "commentsPara");
		
			var commentsDiv = document.createElement("div");
			commentsDiv.setAttribute("class", "commentsDivClass");
			commentsDiv.appendChild(commentsPara);
			commentsDiv.appendChild(cmtsTextArea);
		
			
		
			
		
			
		
			
		
			/*examTable.appendChild(tableRow);
			examTable.appendChild(tableElement);
			tableElement.appendChild(questionInput);
			tableElement.appendChild(studentAnsTextArea);
			tableElement.appendChild(gradeInput);
			tableElement.appendChild(cmtsTextArea);*/
			scoresForm.insertBefore(questionDiv,submitBtn);
			scoresForm.insertBefore(studentResultDiv,submitBtn);
			scoresForm.insertBefore(commentsDiv,submitBtn);
			/*scoresForm.appendChild(studentAnsTextArea);
			scoresForm.appendChild(gradeInput);
			scoresForm.appendChild(cmtsTextArea);*/
	}
	var studentNameInput = document.createElement("INPUT");
	studentNameInput.defaultValue = studentName;
	studentNameInput.setAttribute("type", "hidden");
	studentNameInput.setAttribute("name", "examRevision[]");
	
	var examIDInput = document.createElement("INPUT");
	examIDInput.defaultValue = examID;
	examIDInput.setAttribute("type", "hidden");
	examIDInput.setAttribute("name", "examRevision[]");
	
	var uniqueIDInput = document.createElement("INPUT");
	uniqueIDInput.defaultValue = uniqueID;
	uniqueIDInput.setAttribute("type", "hidden");
	uniqueIDInput.setAttribute("name", "examRevision[]");
	
	scoresForm.appendChild(studentNameInput);
	scoresForm.appendChild(examIDInput);
	scoresForm.appendChild(uniqueIDInput);
}

function submitExam(){
	var xhttp = new XMLHttpRequest();
	var examForm = document.getElementById("scores");
	var formData = new FormData(examForm);

	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 //var jsonResponse = JSON.parse(data);
			 //alert(data);
			 
			 document.body.removeChild(examForm);
			 var para = document.getElementById("response");
			 para.appendChild(document.createTextNode(data + "You will now be redirected"));
			 //sleep(3000); //milliseconds
			 //window.location = "https://web.njit.edu/~efc9/cs490/instructor/instructorRevise.html";
		}
	};
	xhttp.open("POST", "https://web.njit.edu/~efc9/cs490/php/login_page.php",true);
	xhttp.send(formData);
}



function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}