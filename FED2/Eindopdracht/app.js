// De namespace: maak een namespace object FRISBEEAPP als die al bestaat een leeg object
// behoudt alle onbjecten en zorgt dat er geen conflicten ontstaan
var FRISBEEAPP = FRISBEEAPP || {};


// Self invoking function, creert een lokale scope
(function () {

        // Zorgt ervoor dat je script in EMASCRIPT 5 draait
        "use strict";

        //Settings, zijn er zodat de links makkelijk te bereiken zijn
        FRISBEEAPP.settings = {
            gameURL: 'https://api.leaguevine.com/v1/games',
            rankingURL: 'https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D&access_token=bf1541681d'
        },

        // Controller Init: Je gebruikt init: om te bepalen wanneer je je code wilt laten starten.
        FRISBEEAPP.controller = {
            init: function () {
                console.log("stap1. Controller");
                // Initialize router
                FRISBEEAPP.router.init();
                //Log dat de controller is gestart
            }
        };

        // Router, library waarmee je over 1 single page kan navigeren. Dit door middel van #page
        FRISBEEAPP.router = {
            // Init methode, zorgt ervoor dat deze als eerste wordt uitgevoerd
            init: function () {
                console.log(" stap2. Router");
                routie({
                    //Deze route naar de Ranking pagina
                    '/ranking': function() {
                        FRISBEEAPP.page.ranking();
                    },
                    //Deze route naar de schedule pagina
                    '/schedule': function() {
                        FRISBEEAPP.page.schedule();
                    },

                    '/game/:id': function(id){
                        FRISBEEAPP.page.game(id);
                    }
                });
            },
            // Methode voor het wisselen van de pagina's
            change: function (page) {

                //Roep de lader aan
                FRISBEEAPP.loader.show();
                // var route = sectie naam
                var route = page;
                // zoek alle secties
                var sections = qwery('section[data-route]');
                // data route + sectie naam = locatie van de pagina
                var section = qwery('[data-route=' + route + ']')[0];

                // Show actieve secties, en verberg de andere, is verwerkt in de CSS
                if (section) {
                    for (var i=0; i < sections.length; i++){
                        sections[i].classList.remove('active');
                    }
                    //voeg de actieve sectie toe
                    section.classList.add('active');

                }
                // Default route
                if (!route) {
                    sections[0].classList.add('active');
                }
            }
        };

        // Pages, Templating library zorgt ervoor dat een html element wordt gekoppeld aan een data object 
        FRISBEEAPP.page = {
            //Game methode
            game: function (id) {
                console.log("3. RENDER GAME PAGE", id);

                // Pak id uit URL balk
                var getID = window.location.hash.slice(6);
                // Log game ID
                console.log(getID);

                //laat loader zien
                
                // Gebruik standaard request link en vul die aan met specifiek game ID
                promise.get(FRISBEEAPP.settings.gameURL + getID + "/" ).then(function(error, text, xhr){
                    if (error) {
                        alert('Error ' + xhr.status);
                        return;
                    }
                    //geef de objecten van de request weer in de console.
                    console.log(JSON.parse(text));

                    // Parse de string naar javascript objecten zodat je hem kunt uitlezen.
                    FRISBEEAPP.game = JSON.parse(text);
                    //Zoek in html naar data-route:game en zet de FRISBEE.game data op de eerste "data-route" die je kan vinden.
                    Transparency.render(qwery('[data-route=game')[0], FRISBEEAPP.game);

                    //hide de loader
                    FRISBEEAPP.loader.hide();


                    //
            });

            // Zit niet in de wachtrij van Asynchrone functie

            // Pak een html element d.m.v. native javascript functie
            var e = document.getElementById('update');
            e.onclick = postData;

            function postData() {
                console.log('4. DATA WORDT GEPOST')

                //hide de loader
                FRISBEEAPP.loader.show();
                
                // var d = document.getElementById("loader");
                // d.classList.remove('loaded');

                var postID = window.location.hash.slice(7);
                // Haal team 1 score uit de html
                var el = document.getElementById("team1Score");
                // Pak het geselecteerde element in het dropdown menu
                // Leaguevine API wilt alleen strings terug dus pak .text
                var team1Score = el.options[el.selectedIndex].text;
                // Haal team 2 score uit de html
                var k = document.getElementById("team2Score");
                // Pak het geselecteerde element in het dropdown menu
                // Leaguevine API wilt alleen strings terug dus pak .text
                var team2Score = k.options[k.selectedIndex].text;

                // Zoek een element met het ID isFinal
                var checkBox = document.getElementById('isFinal');
                // Maak nieuwe variabele aan met de waarde False
                var eindScore = "False";

                // Als checkbox is checked 
                // .checked is native javascript functie
                if(checkBox.checked)
                {
                    //dan is eindScore 'true'
                    eindScore = "True";
                }

                // Geef waardes mee aan variabele om te posten
                var type        =  'POST',
                    url         =  'https://api.leaguevine.com/v1/game_scores/',
                    postData    = JSON.stringify({
                        game_id: postID,
                        team_1_score: team1Score,
                        team_2_score: team2Score,
                        // is Final is altijd False behalve als checkbox.checked
                        is_final: eindScore
                    });

                // Create request
                var xhr = new XMLHttpRequest();

                // Open request
                xhr.open(type,url,true);

                // Set request headers
                xhr.setRequestHeader('Content-type','application/json');
                xhr.setRequestHeader('Authorization','bearer 82996312dc');


                xhr.onreadystatechange = function() {
                   
                  if (xhr.readyState==4 ){
                   var statusdiv = document.getElementById("status");
                   console.log(statusdiv);
                        statusdiv.innerHTML = "Score upated!";
                        // Div heeft een class "Hide"
                        // Verwijder class "hide" -> Element wordt zichtbaar
                        statusdiv.className = "";

                        // Update score met zelfde variabelen als die je meegeeft
                        // met de post.
                        // Score data == directive
                        var scoreData = {
                          team_1_score: team1Score,
                          team_2_score:  team2Score
                        };

                        Transparency.render(qwery('[data-route=game')[0], scoreData);

                    //hide de loader
                    FRISBEEAPP.loader.hide();

                    setTimeout(function(){
                        statusdiv.className = "hide";
                    },8000);

                    //alert the user that a response now exists in the responseTest property.
                   console.log(xhr.responseText);
                   // And to view in firebug
                   console.log('xhr', xhr);
                  } else {  
 
                    }  
                 }

                // Send request (with data as a json string)
                xhr.send(postData);
                // // Maak de sectie waarop geklikt is actief
                //   d.className =  "loaded"
                return false;
            }

                // Gesture game
                    var element = document.getElementById('gestureGame');
                    var hammertime = Hammer(element).on("swipeleft", function(event) {
                        routie('/schedule')
                    });

                FRISBEEAPP.router.change('game');
            },

            //methode
            ranking: function(){
                console.log("3. RENDER RANKING PAGE")
                // Er wordt een variabele loader aangemaakt, deze bevat de Id van de fysieke loader in de html
                // var loader = document.getElementById('loader');
                // classList.remove('active');

                //de url die bij de request wordt opgevraagd zorgt ervoor dat de data op een "specifieke manier" wordt getoont.
                promise.get('https://api.leaguevine.com/v1/pools/19219/?access_token=93f9b6e889').then(function(error, text, xhr){
                    if (error) {
                        alert('Error ' + xhr.status);
                        return;
                    }
                    //geef de objecten van de request weer in de console.
                    console.log(JSON.parse(text));

                    // Parse de string naar javascript objecten zodat je hem kunt uitlezen.
                    FRISBEEAPP.ranking = JSON.parse(text);
                    Transparency.render(qwery('[data-route=ranking')[0], FRISBEEAPP.ranking); 
                    console.log("3.2 RANKING RENDER DONE") 
                    //hide de loader
                    FRISBEEAPP.loader.hide();
            });


                //Er wordt een classname toegevoegd aan de loader, deze wordt in de css verborgen
                // loader.className = "stoploader"; 

                FRISBEEAPP.router.change('ranking');

                    // swipe left to navigate to schedule
                    var element = document.getElementById('gestureRanking');
                    var hammertime = Hammer(element).on("swiperight", function(event) {
                        routie('/schedule')
                    });



            },

            //methode
            schedule: function(){
                // Er wordt gelogt dat de Schedule gaat renderen
                console.log("3. RENDER SCHEDULE PAGE")

                // Er wordt een variabele loader aangemaakt, deze bevat de Id van de fysieke loader in de html
                // var loader = document.getElementById('loader');  

                //de url die bij de request wordt opgevraagd zorgt ervoor dat de data op een "specifieke manier" wordt getoont.
                promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&access_token=16efeb5be0').then(function(error, text, xhr){
                    if (error) {
                        alert('Error' + xhr.status);
                        return;
                    }
                    // Parse de string naar javascript objecten zodat je hem kunt uitlezen.
                    console.log(JSON.parse(text));

                    FRISBEEAPP.schedule = JSON.parse(text);

                    var directives = {
                        // Ga in objects (van je request)
                        objects: {
                            // Maak nieuwe value aan (weet niet zeker of dit de juiste benaming is)
                            gameID: {
                                // Dat is een Href (link)
                                href: function(params) {
                                    // Href bevat #/game + het id van de game waarop je klikt
                                    return "#/game/" + this.id;
                                }
                            },

                        date: {
                            text: function(params){
                                var startTime = new Date(this.start_time);
                                var day = startTime.getDate();
                                var month = startTime.getMonth() + 1;
                                var year = startTime.getFullYear();

                                var date = day + "/" + month + "/" + year;
                                return date;
                            }
                        }
                        }
                    }

                    Transparency.render(qwery('[data-route=schedule')[0], FRISBEEAPP.schedule, directives);
                    console.log("3.2 SCHEDULE RENDER DONE")

                    //hide de loader
                    FRISBEEAPP.loader.hide();
                });  
                    //Er wordt een classname toegevoegd aan de loader, deze wordt in de css verborgen
                    // loader.className = "stoploader"; 

                    FRISBEEAPP.router.change('schedule');

                    // swipe right to navigate to Ranking
                    var element = document.getElementById('gestureSchedule');
                    var hammertime = Hammer(element).on("swipeleft", function(event) {
                        routie('/ranking')
                    });
            }


        };

        //Een nog leeg object ranking.
        FRISBEEAPP.ranking = {
        };
        //Een nog leeg object schedule.
        FRISBEEAPP.schedule = {
        };

        //Het loader object met twee methodes
        FRISBEEAPP.loader = {
            show: function() {
                // geef wat style elementen mee om de loader te showen        
                document.getElementById('overlay').style.opacity=0.65;
                document.getElementById('overlay').style.zIndex=1;
            }, 

           hide: function() {
                // geef wat style elementen mee om de loader te showen                   
                document.getElementById('overlay').style.opacity=0;
                document.getElementById('overlay').style.zIndex=-1;
           }
        };


        // DOM ready
        // Domready Als alles klaar staat, je dom klaar is gemaakt kan je DOM Ready gebruiken om de app te initialiseren
        domready(function () {
            // Kickstart FRISBEEAPPlication, moet onderaan anders werkt hij niet!
            // Voordeel is dat alles geladen is en alles dus klaarstaat. Anders wordt je code geladen en uitgevoerd tegelijk
            FRISBEEAPP.controller.init();
        });
    


})();