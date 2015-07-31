/**
* Author: Hiral Chandora
* Purpose: This file is for validation of customer, product selection and purchase pages.
* Created: 01 May,2014
* Last updated: 01 May,2014
**/

/* link HTML elements to corresponding event function */
function init()
	{
		var selectform = document.getElementById("selectform"); 	//link the variable to the HTML element
		if(selectform)
			{
				selectform.onsubmit = AddTripBtnClick; 	/* assigns functions to corresponding events */
			}
		
		var sameadd = document.getElementById("sameadd");
		if (sameadd) 
			{
                sameadd.addEventListener ("CheckboxStateChange", OnChangeCheckbox, false);
            }

		var regForm = document.getElementById("regform"); 	//link the variable to the HTML element
		if(regForm)
			{
				regForm.onsubmit = validatecustomer; 	/* assigns functions to corresponding events */
			}
		
		var purchaseform = document.getElementById("purchaseform"); 	//link the variable to the HTML element
		if(purchaseform)
			{
				purchaseform.onload = get_customerdata();
				purchaseform.onsubmit = validatepurchase; 	/* assigns functions to corresponding events */
			}
	}

/* Add trip to local storage  */
function AddTripBtnClick()
	{
		var isUnitedState = document.getElementById("unitedstate").checked;   
		var isEgypt = document.getElementById("egypt").checked;
		var isDubai = document.getElementById("dubai").checked;
		var isIndia = document.getElementById("india").checked;
	
		if (isUnitedState) 
			{localStorage.tripname = "Chicago, United States";}
		else if (isEgypt) 
			{localStorage.tripname = "Cairo, Egypt";}
		else if (isDubai) 
			{localStorage.tripname = "Dubai";}
		else if (isIndia) 
			{localStorage.tripname = "Ahmedabad, India";}
		else
			{localStorage.tripname = "Unknown";}
			
		//window.open("customer.html",'_self');
	}
 
/* set delivery address same as billing address if select checkbox */
function OnChangeCheckbox (event) 
	{
		var chksameadd = event.target;
		if (chksameadd.checked) 
			{
				var bstreetaddress = document.getElementById("bstreetaddress").value;
				var bsuburbtown = document.getElementById("bsuburbtown").value;
				var bstate = document.getElementById("bstate").options[document.getElementById("bstate").selectedIndex].value;
				var bpostcode = document.getElementById("bpostcode").value;
				
				var dstreetaddress = document.getElementById("dstreetaddress");
				var dsuburbtown = document.getElementById("dsuburbtown");
				var dstate = document.getElementById("dstate");
				var dpostcode = document.getElementById("dpostcode");
				
				dstreetaddress.value = bstreetaddress;
				dsuburbtown.value = bsuburbtown;
				dstate.value = bstate;
				dpostcode.value=bpostcode;
			}
		else 
			{
				document.getElementById("dstreetaddress").value = "";
				document.getElementById("dsuburbtown").value = "";
				document.getElementById("dstate").selectedIndex = 0;
				document.getElementById("dpostcode").value = "";
			}
	}
	
/* get variables from form and check rules */
function validatecustomer()
	{
		var errMsg = "";								/* stores the error message */
		var result = true;								/* assumes no errors */
		
		/* Checking Postcode with selected state */
		var bstate = document.getElementById("bstate").options[document.getElementById("bstate").selectedIndex].value;
		var bpostcode = document.getElementById("bpostcode").value;
		
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
			
		var dstate = document.getElementById("dstate").options[document.getElementById("dstate").selectedIndex].value;
		var dpostcode = document.getElementById("dpostcode").value;
		
		if(isFinite(dpostcode))
			{
				var firstdigit = dpostcode.charAt(0);
				switch(dstate)
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
			
		return result;    //if false the information will not be sent to the server
	}

/* Store customer registration data */
function store_customerdata()
	{
		//get values and assign them to a localStorage attribute.
		//we use the same name for the attribute and the element id to avoid confusion
		localStorage.firstname = document.getElementById("firstname").value;
		localStorage.lastname = document.getElementById("lastname").value;
		localStorage.birthdate = document.getElementById("birthdate").value;
		localStorage.bstreetaddress = document.getElementById("bstreetaddress").value;
		localStorage.bsuburbtown = document.getElementById("bsuburbtown").value;
		localStorage.bstate = document.getElementById("bstate").options[document.getElementById("bstate").selectedIndex].value;
		localStorage.bpostcode = document.getElementById("bpostcode").value;
		localStorage.sameadd = document.getElementById("sameadd").checked;
		localStorage.dstreetaddress = document.getElementById("dstreetaddress").value;
		localStorage.dsuburbtown = document.getElementById("dsuburbtown").value;
		localStorage.dstate = document.getElementById("dstate").options[document.getElementById("dstate").selectedIndex].value;
		localStorage.dpostcode = document.getElementById("dpostcode").value;
		localStorage.emailid = document.getElementById("emailid").value;
		localStorage.phoneno = document.getElementById("phoneno").value;
		//alert(localStorage.firstname + "\n" + localStorage.phoneno);
	}

/* Get customer data and show it on Purchase Page */
function get_customerdata()
	{
		if(localStorage.firstname != undefined)
			{
				var customerdata = document.getElementById("custdata");
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
				customerdata.innerHTML = innerCustHtml;
			}
	}
	
function validatepurchase()
	{
		var errMsgPur = "";								/* stores the error message */
		var resultPur = true;								/* assumes no errors */
		
		var cardexpdate = document.getElementById("cardexpdate").value;
		
		var arr = cardexpdate.split('-');
		arr[1] = '20'+ arr[1]; 
		var arr_str = arr[1] + '-' +arr[0];
		
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
						var showstatus = document.getElementById("showstatus");
						showstatus.innerHTML = "<h3 style=\'color: green;\'>Your Order is CONFIRMED !!!</h3>";
					} 
				else 
					{
						resultPur = false;
						var showstatus = document.getElementById("showstatus");
						showstatus.innerHTML = "<h3 style=\'color: red;\'>Your Order is CANCELED !!!</h3>";
					}
			}
		
		return resultPur;    //if false the information will not be sent to the server
	}
	
	
window.onload = init;
