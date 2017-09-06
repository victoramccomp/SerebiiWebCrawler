var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var crawlerSerebii = function(pokemonNumber) {

    request('https://www.serebii.net/pokedex-sm/' + pokemonNumber + '.shtml', timeout = 0, function(err, res, body) {
        if (err)
            console.log('Erro: ' + err);

        var $ = cheerio.load(body);
        var lv50 = $('i:contains("Neutral Nature")').parent().parent().find('td');
        var lv100 = $('i:contains("Neutral Nature")').parent().parent().next().find('td');
        var text50 = "";
        var text100 = "";

        lv50.each(function() {
            var dataLV50 = $(this).text();
            text50 += dataLV50.replace('-', ';') + " | ";
        });

        fs.appendFile('serebii2.txt', pokemonNumber + ' ; ' + text50.replace('Max StatsNeutral Nature | ', '') + '\n');

        lv100.each(function() {
            var dataLV100 = $(this).text();
            text100 += dataLV100.replace('-', ';') + " | ";
        });

        fs.appendFile('serebii2.txt', pokemonNumber + ' ; ' + text100.trim() + '\n');
    })
}

var correctPokemonNumber = function(pokemonNumber) {

    if (pokemonNumber < 10)
        pokemonNumber = '00' + pokemonNumber;
    else if (pokemonNumber >= 10 && pokemonNumber < 100)
        pokemonNumber = '0' + pokemonNumber;
    else
        pokemonNumber = pokemonNumber;

    return pokemonNumber;
}

var total = 802;
var count = 1;
var myVar = setInterval(function() { myTimer() }, 2000);

function myTimer() {
    if (count >= total)
        myStopFunction();

    crawlerSerebii(correctPokemonNumber(count));
    console.log(count);
    count++;
}

function myStopFunction() {
    clearInterval(myVar);
}