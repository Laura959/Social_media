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
6. Tada atidarykite XAMPP kontrolės skydelį **(angl. "Control panel")**:

![](https://devtuts.butlerccwebdev.net/testserver/xampp-control-panel.png)

7. Kontrolės skydelyje paleiskite "Apache" ir "Mysql" servisus, tai padarysite paspaudę ant "Stop" mygtukų, esančių šalia minėtų modulių. 
8. Tame pačiame kontrolės skydelį paspauskite ant **"Shell"** mygtuko. "Shell" langas atrodo taip: 

![](https://i.stack.imgur.com/kf2oI.jpg)

9. Kai atidarėte komandinę eilutę, pakeiskite savo darbinę direktoriją. Jums reikės atsidurti atsisiųsto projekto "Social_media" failo viduje. Tą galite padaryti komandinėje eilutėje ("Shell") suvedę:

cd [kelias iki Social media new_api.php failo]

Pavyzdys (vietoj nurodyto kelio iki failo, įrašykite savo kelią iki new_api.php failo): 

![shell_cd](https://user-images.githubusercontent.com/70938274/122460816-45188180-cfbb-11eb-8b1b-1afcd5cd716e.PNG)

10. Kai pakeitėte darbinę direktoriją, suveskite šią komandą:

#### php -S localhost:8888 new_api.php

ir paspauskite "Enter". Komandinėje eilutėje turi atsirasti įrašas:

##### PHP 7.4.20 Development Server (http://localhost:8888) started

11. Kai atliksite minėtus veiksmus, XAMPP kontrolės skydelyje, prie "Apache" paspauskite "Admin" mygtuką. Atsivers naršykės langas, kurio viršutinėje meniu juostoje, dešinėje pusėje rasite nuorodą **"phpMyAdmin"**. Paspauskite ant šios nuorodos ir prisijunkite prie duomenų bazės (Vartotojas "root", jei nesukūrėte slaptažodžio, slapažodžio eilutę palikite tuščią. 
12. Sukurkite duomenų bazę pavadinimu "facebook": ir importuokite atsisiųsto Social_media projekto "db" faile esančią duomenų bazę "facebook":

![duombaze](https://user-images.githubusercontent.com/70938274/122462750-a17ca080-cfbd-11eb-8973-7264fd316b3c.PNG)

ir importuokite atsisiųsto Social_media projekto "db" faile esančią duomenų bazę **"facebook"**:

![import](https://user-images.githubusercontent.com/70938274/122463272-17810780-cfbe-11eb-883b-74d780c8ffca.PNG)

12. Atidarykite naršyklę (programa daugiausia ištestuota ant Firefox naršyklės, tad rekomenduoju naudoti būtent šią naršyklę, tačiau ir su kitomis naršyklėmis programa turėtų veikti). Naršyklėje, url juostoje suveskite kelią iki projekto: 

pvz: "localhost/dashboard/Facebook projektas/"

13. Jums bus atidarytas prisijungimo langas, su pasveikinimu "Welcome".
14. Prieš pradedant naudotis programa atsisiųskite **"CORS"** (angl. "Cross-Origin Resource Sharing") plėtinį:

Firefox naršyklei galite atsisiųsti [čia](https://addons.mozilla.org/lt/firefox/addon/cors-everywhere/); Jei naudojate kitą naršyklę, atsisiųskite jūsų naršyklei pritaikytą CORS plėtinį ir jį aktyvinkite. 

![cors](https://user-images.githubusercontent.com/70938274/122464787-edc8e000-cfbf-11eb-807c-6198fe9598ad.PNG)

15. Galiausiai atidarykite su Social_media programa atsisiųstą **connect.php** failą, ir slaptažodžio vietoje įveskite savo prisijungimo, prie XAMPP duomenų bazės slaptažodį.

![slap](https://user-images.githubusercontent.com/70938274/122465495-d76f5400-cfc0-11eb-9888-bbdd903d3296.PNG)

Duomenų bazėje, "Users" lentelėje rasite prisijungimo vardus ir slaptažodžius, su kuriais galėsite prisijungti prie Social Media programos. 

___

## Programos naudojimo instrukcija"


