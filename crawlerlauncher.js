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
            text50 += dataLV50.replace('-', ';') + " ; ";
        });

        fs.appendFile('pkmnStatsresult.txt', pokemonNumber + ' ; ' + text50.replace('Max StatsNeutral Nature ; ', '') + '\n');

        lv100.each(function() {
            var dataLV100 = $(this).text();
            text100 += dataLV100.replace('-', ';') + " ; ";
        });

        fs.appendFile('pkmnStatsresult.txt', pokemonNumber + ' ; ' + text100.trim() + '\n');
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
var interval = setInterval(function() { requestSerebiiCrawler() }, 2000);

function requestSerebiiCrawler() {
    if (count >= total)
        stopCrawler();

    crawlerSerebii(correctPokemonNumber(count));
    console.log(count);
    count++;
}

function stopCrawler() {
    clearInterval(interval);
}