$( document ).ready(function(){ 
     
var dataSP = [];
var dataSPStates = [];

var ddlConus  = $('#ConusOconus');
var ddlCountry  = $('#Country');
var ddlStates = $('#State');
var ddlSites  = $('#SiteName');
ddlCountry.append($("<option />").val(0).text("Show All")); 
ddlStates.append($("<option />").val(0).text("Select a State"));  

	//Fetch data using SPServices.
	$().SPServices({
    operation: "GetListItems",
    async: false,
    listName: "Pages",
    CAMLQuery: "<Query><Where><Eq><FieldRef Name='ContentType' /><Value Type='Computed'>DispoSvcSiteLocation</Value></Eq></Where><OrderBy><FieldRef Name='SiteName' /></OrderBy></Query>",
    CAMLViewFields: "<ViewFields><FieldRef Name='DLACountry' /><FieldRef Name='State' /><FieldRef Name='SiteName' /><FieldRef Name='LinkFilename' /></ViewFields>",
    completefunc: function (xData, Status) {
    	var countryFound = {};
    	var stateFound = {};
    	var strCountry;
    	var strState;    	   	   	
    
      $(xData.responseXML).SPFilterNode("z:row").each(function() {      
      strCountry = $(this).attr("ows_DLACountry");
      strState = $(this).attr("ows_State"); 
      
       if(countryFound[strCountry] === undefined){
      		countryFound[strCountry] = 1;            
       }
      
      if(strState && stateFound[strState] === undefined){
      		stateFound[strState] = 1;      		     		     		 
      }
      
	  //Build list of site names with properties.            
      dataSP.push({label: $(this).attr("ows_SiteName"), url: "/drmo/Pages/" + $(this).attr("ows_LinkFilename"), country: strCountry, state: strState});
	  
       });
       buildSortedDropdown(countryFound, ddlCountry);
       buildSortedDropdown(stateFound, ddlStates);
    }        
  });

//Builds alphabetically sorted list
function buildSortedDropdown(sortableData, dropdown){
	var myArray = [];
	for(var key in sortableData){
		myArray.push(key);
	}
	myArray.sort();
	
	for (var obj=0; obj < myArray.length; obj++){
    	dropdown.append("<option>" + myArray[obj]+ "</option>");
    }
}

//Filter Site Name based on country section. 
ddlCountry.change(function()
{
  // We want to make sure the following code does not trigger the Sites dropdown's handler
  var selectedCountry = $(':selected', ddlCountry).text();
			
		//Empty Site dropdown and add default value
		ddlSites.empty();
   		ddlSites.append($("<option />").val(0).text("Select a Site"));

  		// Go through all sites data and populate Site Name dropdown
		$.each(dataSP, function(index, item)
		{
			// Filter
			if (selectedCountry == "Show All" || item.country === selectedCountry)
				 ddlSites.append($("<option />").val(item.url).text(item.label));
		});
		
		//Only United States has values for States. Hence hide the State field if a country other than United States is selected.
		if($(this).val() !== "United States"){
			$("#State").parent("div").hide();
		}
		else {
			$("#State").parent("div").show();
		}

  
  });

//Filter Site Name based on State section.
ddlStates.change(function()
{
  // We want to make sure the following code does not trigger the Sites dropdown's handler
   	var selectedState = $(':selected', ddlStates).text();
  
  // Empty Sites dropdown and add default item
  ddlSites.empty();
  ddlSites.append($("<option />").val(0).text("Select a Site"));

  // Go thru all site data
  $.each(dataSP, function(index, item)
  {
    // Filter
    if (item.state === selectedState)
      ddlSites.append($("<option />").val(item.url).text(item.label));
  });
});
 
  //End Filter code 
 
$("#SiteName").change(function()
{
  window.location = $(this).val();
});

// Make textbox autocomplete using our data and our select function
$('#SiteTyped').autocomplete({
  source: dataSP,
  response: function(event, ui) {
            	if (ui.content.length === 0) {
                	$("#empty-message").text("No matching sites");
           	 	} else {
                $("#empty-message").empty();
            	}
            },
  select: function(event, ui)
  {
    window.location = ui.item.url;
  }
});

//Select United States by defualt.
ddlCountry.val("United States");
//Make sure state is filtered initially for the selected country. In this case United States is the default selection.
ddlCountry.trigger("change"); 
}); 
