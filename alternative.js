	$( document ).ready(function() {	
	
	get_customerdata();
	
	$('#selectform').submit(function(){
			var value = $("input[name='selectpro']:checked").val();		
			localStorage.tripname = value;
	});	

	$('#sameadd').on('click',function(){		
		if($('#sameadd').prop('checked')){
			$('#dstreetaddress').val($('#bstreetaddress').val());
			$('#dsuburbtown').val($('#bsuburbtown').val());
			$('#dstate').val($('#bstate').val());
			$('#dpostcode').val($('#bpostcode').val());
		} else {
			$('#dstreetaddress').val('');
			$('#dsuburbtown').val('');
			$('#dstate').val(0);
			$('#dpostcode').val('');
		}
	});
	
	$('#regform').submit(function() {
		var errMsg = '';
		var result = true;

		var bstate = $('#bstate').val();
		var bpostcode = $('#bpostcode').val();
		
		if(isFinite(bpostcode))
			{
				var firstdigit = bpostcode.charAt(0);
				switch(bstate)
					{
						case "vic":
							if (!((firstdigit == 3) || (firstdigit == 8)))
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digits 3 or 8.\n"; 
									result = false;
								}
							break;
						case "nsw":
							if (!((firstdigit == 1) || (firstdigit == 2)))
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digits 1 or 2.\n";  
									result = false;
								}
							break;
						case "qld":
							if (!((firstdigit == 4) || (firstdigit == 9)))
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digits 4 or 9.\n";  
									result = false;
								}
							break;
						case "nt":
						case "act":
							if (firstdigit != 0)
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digit 0.\n"; 
									result = false;
								}
							break;
						case "wa":
							if (firstdigit != 6)
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digit 6.\n"; 
									result = false;
								}
							break;
						case "sa":
							if (firstdigit != 5)
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digit 5.\n"; 
									result = false;
								}
							break;
						case "tas":
							if (firstdigit != 7)
								{
									errMsg += "You can not have state for Billing Address as " + bstate.toUpperCase() +" and postcode does not start with digit 7.\n"; 
									result = false;
								}
							break;
						default:
							errMsg += "Please Select State for Billing Address.\n";
							result = false;
							break;
					}
			}
		
		var dstate = $('#dstate').val();
		var dpostcode = $('#dpostcode').val();
		
		if(isFinite(dpostcode))
			{
				var firstdigit = dpostcode.charAt(0);
				switch(bstate)
					{
						case "vic":
							if (!((firstdigit == 3) || (firstdigit == 8)))
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digits 3 or 8.\n"; 
									result = false;
								}
							break;
						case "nsw":
							if (!((firstdigit == 1) || (firstdigit == 2)))
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digits 1 or 2.\n";  
									result = false;
								}
							break;
						case "qld":
							if (!((firstdigit == 4) || (firstdigit == 9)))
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digits 4 or 9.\n";  
									result = false;
								}
							break;
						case "nt":
						case "act":
							if (firstdigit != 0)
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digit 0.\n"; 
									result = false;
								}
							break;
						case "wa":
							if (firstdigit != 6)
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digit 6.\n"; 
									result = false;
								}
							break;
						case "sa":
							if (firstdigit != 5)
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digit 5.\n"; 
									result = false;
								}
							break;
						case "tas":
							if (firstdigit != 7)
								{
									errMsg += "You can not have state for Delivery Address as " + dstate.toUpperCase() +" and postcode does not start with digit 7.\n"; 
									result = false;
								}
							break;
						default:
							errMsg += "Please Select State for Delivery Address.\n";
							result = false;
							break;
					}
			}
		
		if (errMsg != "")
			{   
				//only display message box if there is something to show
				alert(errMsg);
			}
		
		if (result)
			{ 
				//if the form validates OK.
				//As result is a Boolean variable saying (result) is the same as saying (result == true)
				store_customerdata();
			}
			
		return result; 
		event.preventDefault();
	});
	
	$('#purchaseform').submit(function() {
		var errMsgPur = "";								/* stores the error message */
		var resultPur = true;								/* assumes no errors */
		
		var cardexpdate = $('#cardexpdate').val();
		
		var arr = cardexpdate.split('-');
		arr[1] = '20'+ arr[1]; 
		var arr_str = arr[1] + '-' + arr[0];
		
		var selectedDate = new Date(arr_str);
		var todayDate = new Date();
		
		if(todayDate > selectedDate)
			{
				errMsgPur += "Your credit card is expired.\n"; 
				resultPur = false;
			}

		if (errMsgPur != "")
			{   
				//only display message box if there is something to show
				alert(errMsgPur);
			}
		
		if(resultPur)
			{
				var confirmorder = confirm("Do you want to confirm the Order?");
				if (confirmorder == true) 
					{
						var showstatus = $('#showstatus');
						showstatus.html('<h3 style=\'color: green;\'>Your Order is CONFIRMED !!!</h3>');
					} 
				else 
					{
						resultPur = false;
						var showstatus = $('#showstatus');
						showstatus.html('<h3 style=\'color: red;\'>Your Order is CANCELED !!!</h3>');
						$('#showstatus').fadeOut(5000, function() {
							// Extra enhancement of JQuery.
						  });
					}
			}
			
		return resultPur;  
	event.preventDefault();
	});
});

/* Store customer registration data */
function store_customerdata()
	{
		//get values and assign them to a localStorage attribute.
		//we use the same name for the attribute and the element id to avoid confusion
		$('#bstreetaddress').val()
		localStorage.firstname = $('#firstname').val();
		localStorage.lastname = $('#lastname').val();
		localStorage.birthdate = $('#birthdate').val();
		localStorage.bstreetaddress = $('#bstreetaddress').val();
		localStorage.bsuburbtown = $('#bsuburbtown').val();
		localStorage.bstate = $('#bstate').val();
		localStorage.bpostcode = $('#bpostcode').val();
		localStorage.sameadd =  $('sameadd').is(":checked");
		localStorage.dstreetaddress = $('#dstreetaddress').val();
		localStorage.dsuburbtown = $('#dsuburbtown').val();
		localStorage.dstate = $('#dstate').val();
		localStorage.dpostcode = $('#dpostcode').val();
		localStorage.emailid = $('#emailid').val();
		localStorage.phoneno = $('#phoneno').val();
	}

function get_customerdata()
	{
		if(localStorage.firstname != undefined)
			{
				var customerdata = $('#custdata');
				var innerCustHtml = "<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trip Name : " +  
								localStorage.tripname + "</label><br />" +			
								"<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"&nbsp;&nbsp;Name : " + 
											localStorage.firstname + " " + localStorage.lastname + "</label><br />" +
								"<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date of Birth : " + localStorage.birthdate + "</label><br />" +
								"<label> &nbsp;&nbsp;&nbsp;Billing Address : " + localStorage.bstreetaddress + "</label><br />" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"<label>" + localStorage.bsuburbtown + "</label><br />" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"<label>" + localStorage.bstate.toUpperCase() + "-" + localStorage.bpostcode + "</label><br />" +
								"<label> Delivery Address : " + localStorage.dstreetaddress + "</label><br />" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"<label>" + localStorage.dsuburbtown + "</label><br />" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
								"<label>" + localStorage.dstate.toUpperCase() + "-" + localStorage.dpostcode + "</label><br />" +
								"<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email ID : " + 
											localStorage.emailid + "</label><br />" +
								"<label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact No. : " + 
											localStorage.phoneno + "</label><br />";
				customerdata.html(innerCustHtml);
			}
	}
