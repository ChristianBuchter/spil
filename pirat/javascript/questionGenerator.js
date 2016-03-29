var random = function(upperVal){
		return Math.floor(Math.random() * upperVal);
	};
	
	
var questionSelector = function(array){
	return array[random(array.length)];
};
	
var generateAlgebra = function(){
	var questionType = questionSelector(algebra);
	var op1 = random(11);
	var	op2 = random(11);
	var task;
	var result;

	switch(questionType) {
		case "ADDITION": //plus
			result = op1 + op2;
			task = op1 + "%2B" + op2 + "&chs=60";
			break;

		case "SUBSTRACTION": //minus
			result = Math.max(op1, op2) - Math.min(op1, op2);
			task = Math.max(op1, op2) + "-" + Math.min(op1, op2)+ "&chs=60";
			break;

		case "MULTIPLICATION": //gange (lav lige en smart f- finder)
			result = op1 * op2;
			task = op1 + "\\cdot" + op2+ "&chs=60";
			break;

		case "DIVISION": //divider
			op1 = random(10) +1;
			result = random(11);
			op2 = op1 * result;
			task = "\\frac{" + op2 + "}{" + op1 + "}&chs=140";
			break;
			
		case "SQUAREROOT": //divider
			result = random(11);
			op1 = result * result;
			task = "\\sqrt{"+ op1+ "}&chs=95" ;
			break;
		}
return [task, result]
};