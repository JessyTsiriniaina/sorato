#include <stdio.h>
#include <string.h>
#include <stdlib.h>


char simple[][10] = {"", "un", "deux", "trois", "quatre", "cinq", "six", "sept",
        "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
        "dix-sept", "dix-huit", "dix-neuf"};

char dizaine[][20] = {"","", "vingt", "trente", "quarante", "cinquante",
        "soixante", "soixante", "quatre-vingt", "quatre-vingt"};

char sortie[100];
char *convert(unsigned int n, char *sortie);

char *checklast(char *sortie;) 
{	
	size_t i = 0;
	while (sortie[i] != '\0') 
		i++;

	if ((i != 0) && (sortie[i - 1] != '-'))
		strcat(sortie, "-");
	
	return sortie;
}

char *underOut(unsigned int n, char *sortie) 
{	
	unsigned int units, tens;
	units = n % 10;
        tens = (n % 100) / 10;
	
	if(tens == 0 && units == 0) return sortie;

	checklast(sortie);

	if (tens <= 1) 
                strcat(sortie, simple[tens * 10 + units]);
        else 
        {
                strcat(sortie, dizaine[tens]);

                if(units == 1 && tens != 8 && tens != 9) {
                        strcat(sortie, "-et");
                }

                strcat(sortie, units == 0 ? "" : "-");

                if (tens == 7 || tens == 9) {
                        strcat(sortie, units == 0 ? "-" : "");
                        strcat(sortie, simple[units + 10]);
                }
                
		if (tens == 8 && units != 0) {
                        strcat(sortie, simple[units]);
                }
                
		if(tens != 7 && tens != 8 && tens != 9) {
                        strcat(sortie, simple[units]);
                }
        }
	return sortie;
}

char *hundredsOut(unsigned int n, char *sortie) 
{	
	unsigned int hundreds = (n % 1000) / 100;
	if(hundreds != 0)
	{
		checklast(sortie);

    		if (hundreds > 1) 
    		{
            		strcat(sortie, simple[hundreds]);
            		strcat(sortie, "-");
        	}

        	strcat(sortie, "cent");
        }
	return sortie;
}

char *thousandsOut(unsigned int n, char *sortie) 
{        
        unsigned int thousands = (n % 1000000) / 1000;
        if(thousands == 0) return sortie;

        checklast(sortie);
	
	if(thousands == 1) 
        	strcat(sortie, "mille");
	else 
	{
        	convert(thousands, sortie);
                strcat(sortie, "-mille");
        }	
	return sortie;
}

char *adjectiveOut(unsigned int adject, char *sortie, char *adject_name) 
{
        if(adject == 0) return sortie;
        
        checklast(sortie);

        convert(adject, sortie);
    	strcat(sortie, "-");
	strcat(sortie, adject_name);
	strcat(sortie, adject > 1 ? "s": "");
        
	return sortie;
}

char *convert(unsigned int n, char *sortie) 
{
	unsigned int millions, milliards;
	millions = (n% 1000000000) / 1000000;
	milliards = (n % 1000000000000) / 1000000000;

	if (n == 0) 
	{
		strcpy(sortie, "zero");
		return sortie;
	}

        adjectiveOut(milliards, sortie, "milliard");
	adjectiveOut(millions, sortie, "million");
	thousandsOut(n, sortie);	
	hundredsOut(n, sortie);
	underOut(n, sortie);

	return sortie;
}

int main(void) 
{	
	unsigned int inpt;
	while(1) 
	{
		if(scanf("%u", &inpt) != 1) break;

		unsigned int hundreds = (inpt % 1000) / 100, under = (inpt % 1000) - hundreds*100;

		printf("%s", convert(inpt, sortie));
		printf("%c\n", (hundreds > 1 && under == 0) || (under == 80)? 's': ' ');
		strcpy(sortie, "");
	}
	return 0;
}