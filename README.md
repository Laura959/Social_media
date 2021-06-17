## Sveiki!
___

## Apie projektą

Projektas skirtas dalintis naujienomis su kitais vartotojais. Programa leidžia sukurti, redaguoti, ištrinti įrašą. Taip pat galima pamėgti, surasti bei pakomentuoti įrašą. 

___

## Programos diegimo instrukcija

1. Parsisiųskite projektą Zip formatu arba pasitelką Git "clone" komandą (kad galėtumėte panaudoti "clone" komandą, įsirašykite [Git programą](https://git-scm.com/downloads). 
2. Jei siuntėte Zip formatu, išskleiskite failus.
3. Atsisiųskite ir įsirašykite XAMPP programą. Atsisiuntimo instrukciją rasite [čia](https://www.apachefriends.org/download.html). 
4. Suraskite kur įrašėte XAMPP programą ir nueikite į "dashboard" failą (xampp/htdocs/dashboard).
5. Nukopijuokite iš Github atsisiųstus failus į minėtą folderį.
6. Tada atidarykite XAMPP kontrolės skydelį (angl. "Control panel"):

![](https://devtuts.butlerccwebdev.net/testserver/xampp-control-panel.png)

7. Kontrolės skydelyje paleiskite "Apache" ir "Mysql" servisus, tai padarysite paspaudę ant "Stop" mygtukų, esančių šalia minėtų modulių. 
8. Tame pačiame kontrolės skydelį paspauskite ant "Shell" mygtuko. "Shell" langas atrodo taip: 

![](https://i.stack.imgur.com/kf2oI.jpg)

9. Kai atidarėte komandinę eilutę, pakeiskite savo darbinę direktoriją. Jums reikės atsidurti atsisiųsto projekto "Social_media" failo viduje. Tą galite padaryti komandinėje eilutėje ("Shell") suvedę:

cd [kelias iki Social media new_api.php failo]

Pavyzdys (vietoj nurodyto kelio iki failo, įrašykite savo kelią iki new_api.php failo): 

![shell_cd](https://user-images.githubusercontent.com/70938274/122460816-45188180-cfbb-11eb-8b1b-1afcd5cd716e.PNG)

10. Kai pakeitėte darbinę direktoriją, suveskite šią komandą:

#### php -S localhost:8888 new_api.php

ir paspauskite "Enter". Komandinėje eilutėje turi atsirasti įrašas:

##### PHP 7.4.20 Development Server (http://localhost:8888) started
