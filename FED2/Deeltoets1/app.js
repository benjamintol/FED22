// De namespace: maak een namespace object FRISBEEAPP als die al bestaat een leeg object
// behoudt alle onbjecten en zorgt dat er geen conflicten ontstaan
var FRISBEEAPP = FRISBEEAPP || {};

// Self invoking function, creert een lokale scope
(function () {
// Data objecten
//object schedule in de namespace
    FRISBEEAPP.schedule = {
        items: [ 
        { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
        { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
        { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
        { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
        { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
        { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
        { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
        { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
        { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
        { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
        ]
    };
//object game in de namespace
    FRISBEEAPP.game = {
        items: [
        { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
        { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
        { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
        { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
        { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
        { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
        { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
        { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
        { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
        { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
        { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
        { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
        { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
        { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
        { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
        { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
        { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
        { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
        { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
        { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
        { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
        { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
        { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
        ]
    };
//object ranking in de namespace
    FRISBEEAPP.ranking = {
        items: [
        { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
        { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
        { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
        { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
        { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
        ]
    };

    // Controller Init: 
    // Je gebruikt init: om te bepalen wanneer je je code wilt laten starten.
    FRISBEEAPP.controller = {
        init: function () {
            // Initialize router
            FRISBEEAPP.router.init();
        }
    };

    // Router, library waarmee je over 1 single page kan navigeren. Dit door middel van #page
    FRISBEEAPP.router = {
        init: function () {
            routie({
                '/game': function() {
                    FRISBEEAPP.page.game();
                },
                '/schedule': function() {
                    FRISBEEAPP.page.schedule();
                },

                '/ranking': function() {
                    FRISBEEAPP.page.ranking();
                },
                '*': function() {
                    FRISBEEAPP.page.schedule();
                }
            });
        },
        // Het wisselen van de pagina's
        change: function () {
            var route = window.location.hash.slice(2),
                // Ga alle secties langs
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

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

    // Pages, Template library zorgt ervoor dat een html element wordt gekoppeld aan een data object 
    FRISBEEAPP.page = {
        game: function () {
            //Zoek in html naar data-route:game en zet de FRISBEE.game data op de eerste "data-route" die je kan vinden.
            Transparency.render(qwery('[data-route=game')[0], FRISBEEAPP.game);
            FRISBEEAPP.router.change();
        },

        schedule: function () {
            Transparency.render(qwery('[data-route=schedule')[0], FRISBEEAPP.schedule);
            FRISBEEAPP.router.change();
        },

        ranking: function () {
            Transparency.render(qwery('[data-route=ranking')[0], FRISBEEAPP.ranking);
            FRISBEEAPP.router.change();
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