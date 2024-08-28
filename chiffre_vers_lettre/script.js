simple = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept",
         "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze",
         "quinze", "seize","dix-sept", "dix-huit", "dix-neuf"];
         
dizaine = ["","", "vingt", "trente", "quarante", "cinquante",
            "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

function checklast(sortie) {
    
    i = sortie.length;
    if((i != 0) && (sortie[i - 1] != '-'))
        sortie = sortie.concat("-");

    return sortie;
}



function underOut(n, sortie) {
    units = n % 10;
    tens = Math.floor((n % 100) / 10);

    if(tens == 0 && units == 0)
        return sortie;

    sortie = checklast(sortie);
    
    if(tens <= 1)
        sortie = sortie.concat(simple[tens * 10 + units]);

    else
    {
        sortie = sortie.concat(dizaine[tens]);

        if(units == 1 && tens != 8 && tens != 9) 
            sortie = sortie.concat("-et");

        sortie = sortie.concat(units == 0 ? "" : "-");

        if(tens == 7 || tens == 9) {
            sortie = sortie.concat(units == 0 ? "-" : "");
            sortie = sortie.concat(simple[units + 10]);
        }
                
		if(tens == 8 && units != 0) 
            sortie = sortie.concat(simple[units]);        
                
		if(tens != 7 && tens != 8 && tens != 9)
            sortie = sortie.concat(simple[units]);
                

    }

    return sortie;
}


function hundredsOut(n, sortie) {

    hundreds = Math.floor((n % 1000) / 100);

    if(hundreds != 0) {
        sortie = checklast(sortie);
    
            if (hundreds > 1) {
                sortie = sortie.concat(simple[hundreds]);
                sortie = sortie.concat("-");
            }
    
            sortie = sortie.concat("cent");
        }

    return sortie;
}


function thousandsOut(n, sortie) 
{        
    thousands = Math.floor((n % 1000000) / 1000);

    if(thousands == 0) 
        return sortie;

    sortie = checklast(sortie);
	
	if(thousands == 1) 
        	sortie = sortie.concat("mille");

	else 
	{
        sortie = convert(thousands, sortie);
        sortie = sortie.concat("-mille");
    }	

	return sortie;
}


function millionsOut(n, sortie) 
{
    millions = Math.floor((n % 1000000000) / 1000000);
   
    if(millions == 0) 
        return sortie;
        
    sortie = checklast(sortie);

    sortie = convert(millions, sortie);
    sortie = sortie.concat("-");
	sortie = sortie.concat("million");
	sortie = sortie.concat(
             (Math.floor((n % 1000000000) / 1000000)> 1) ? "s" : "");
        
	return sortie;
}

function milliardsOut(n, sortie) 
{
    milliards = Math.floor((n % 1000000000000) / 1000000000);
   
    if(milliards == 0) 
        return sortie;
        
    sortie = checklast(sortie);

    sortie = convert(milliards, sortie);
    sortie = sortie.concat("-");
	sortie = sortie.concat("milliard");
	sortie = sortie.concat(
             (Math.floor((n % 1000000000000) / 1000000000) > 1)  ? "s" : "");
        
	return sortie;
}

function convert(n, sortie) 
{

	if (n == 0) 
	{
		sortie = "zero"
		return sortie;
	}

    sortie = milliardsOut(n, sortie);
	sortie = millionsOut(n, sortie);
	sortie = thousandsOut(n, sortie);	
	sortie = hundredsOut(n, sortie);
	sortie = underOut(n, sortie);

	return sortie;
}

function renderResult() {

    n = document.getElementById('inpt').value;
    sortie = "";
    
    if(n >= 0 && n < 999999999999) {

        sortie = convert(n, sortie);

        hundreds = Math.floor((n % 1000) / 100);
        under = (n % 1000) - hundreds*100;

        sortie = sortie.concat(
                 ((hundreds > 1 && under == 0) || (under == 80)) ? "s" : " ");

        document.getElementById('displayer').innerText =  sortie;
    }
    else {
        document.getElementById('displayer').innerText =  "Hors portee";
    }
}