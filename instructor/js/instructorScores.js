function getScores(){
	var uniqueID = sessionStorage.getItem("uniqueExam");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 var jsonResponse = JSON.parse(data);
			 //alert(data);
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
	var studentName = examScores[0];
	var examID = examScores[1];
	var uniqueID = sessionStorage.getItem("uniqueExam");
	
	for(var i = 2; i < examScores.length; i+=6){
			var question = examScores[i];
			var studentAnswer = examScores[i+1];
			var grade = examScores[i+2];
			var comments = examScores[i+3];
			var studentOutput = examScores[i+4] // i+4 is an array of students output
			var expectedAnswers = examScores[i+5] // i+5 is an array of expected answers
		
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

			scoresForm.insertBefore(questionDiv,submitBtn);
			scoresForm.insertBefore(studentResultDiv,submitBtn);
			scoresForm.insertBefore(commentsDiv,submitBtn);
			gradeReport(studentOutput,expectedAnswers);

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
function gradeReport(studentOut, expectedAns){
	var scoresForm = document.getElementById("scores");
	var submitBtn = document.getElementById("submitButton");
	var examTable = document.createElement("table");
	
	var tableRowHeader = document.createElement("tr");
	tableRowHeader.setAttribute("id", "header");
	
	var tableHeaderExpected = document.createElement("th");
	tableHeaderExpected.setAttribute("id", "Expected");
	tableHeaderExpected.appendChild(document.createTextNode("Expected"))
	
	var tableHeaderStudent = document.createElement("th");
	tableHeaderStudent.setAttribute("id", "Run");
	tableHeaderStudent.appendChild(document.createTextNode("Run"))
	
	tableRowHeader.appendChild(tableHeaderExpected);
	tableRowHeader.appendChild(tableHeaderStudent);
	
	examTable.appendChild(tableRowHeader);
	
	for(var i = 0; i < studentOut.length; i++){
		var tableRowOutputs = document.createElement("tr");
		tableRowOutputs.setAttribute("id", "outputs");
		
		
		var expectedOutput = document.createElement("p");
		expectedOutput.setAttribute("class", "expectedOutput");
		var expectedOutputText = document.createTextNode(expectedAns[i]);
		expectedOutput.appendChild(expectedOutputText);
		
		var tableElementExpect = document.createElement("td");
		tableElementExpect.setAttribute("class", "expectedTableElmOutput");
		tableElementExpect.appendChild(expectedOutput);
		tableRowOutputs.appendChild(tableElementExpect);
		
		
		var stOutput = document.createElement("p");
		stOutput.setAttribute("class", "studentOutput");
		var stOutputText = document.createTextNode(studentOut[i]);
		stOutput.appendChild(stOutputText);
		
		var tableElementStud = document.createElement("td");
		tableElementStud.setAttribute("class", "studentTableElemOutput");
		tableElementStud.appendChild(stOutput);
		tableRowOutputs.appendChild(tableElementStud);
		
		examTable.appendChild(tableRowOutputs);
	}
	scoresForm.insertBefore(examTable,submitBtn);
}

function submitExam(){
	var xhttp = new XMLHttpRequest();
	var examForm = document.getElementById("scores");
	var formData = new FormData(examForm);

	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			 var data = this.responseText;
			 
			 document.body.removeChild(examForm);
			 var para = document.getElementById("response");
			 para.appendChild(document.createTextNode("Exam grades posted"));
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