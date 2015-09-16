//checkanswers.js
//Description: for checking the answers of the variables
$(window).load(function()  {
	$('#btnSubmit').click(function(e){
		
		var question1Ans=$("input[name=question1]:checked").val();
		var question2Ans=$("input[name=question2]:checked").val();
		var question3Ans=$("input[name=question3]:checked").val();
		var feedback1,feedback2,feedback3;
		var data=Number(12);
		if(question1Ans==Number(12))
		{
			jQuery("label[for='q1']").html("Correct");
			feedback1="Correct";
		}
		else
		{
			jQuery("label[for='q1']").html("Incorrect");	
			feedback1="Incorrect";
		}
		if(question2Ans==Number(1))
		{
			jQuery("label[for='q2']").html("Correct");
			feedback2="Correct";
		}
		else
		{
			jQuery("label[for='q2']").html("Incorrect");
			feedback2="Incorrect";	
		}
		if(question3Ans==Number(4))
		{
			jQuery("label[for='q3']").html("Correct");
			feedback3="Correct";
		}
		else
		{
			jQuery("label[for='q3']").html("Incorrect");	
			feedback3="Incorrect";
		}

		var answersFromCustomer={question1Ans,question2Ans,question3Ans,feedback1,feedback2,feedback3};
		$.ajax({
		        url : "/answers", 
		        headers: { 'Content-Type': 'application/json'},
		        type : "POST", 
		        dataType:"json",
		        data : JSON.stringify({answersFromCustomer}), 
		   		
		        
		        success : function(json) {
		            console.log(json); 
		            console.log("success"); 
		        }, 
	
		        error : function(xhr,errmsg,err) {
		            console.log("Error.");
		            console.log(xhr.status + ": " + xhr.responseText); 
		        }
		    });			
	});

});
