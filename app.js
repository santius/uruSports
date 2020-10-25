const cheerio = require('cheerio')
const fetch = require('node-fetch')
const url = 'http://www.futbol.com.uy/deportesportal/apposiciones.aspx?uruguayo,2020,FA,104'

const fetchData = async () => {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const teams = [];

    $('.posiciones-equipo').each((i, item) => {
        const team = {};
        const $item = $(item);
        team.name = $item.find('.equipo').text().trim().toLowerCase();
        team.puntos = $item.find('.puntos').text().trim().toLowerCase();
        team.winRatio = $item.find('.partidosjgep').eq(0).text().trim().toLowerCase();
        team.pj = $item.find('.partidosjgep').eq(1).text().trim().toLowerCase();
        team.pg = $item.find('.partidosjgep').eq(2).text().trim().toLowerCase();
        team.pe = $item.find('.partidosjgep').eq(3).text().trim().toLowerCase();
        team.pp = $item.find('.partidosjgep').eq(4).text().trim().toLowerCase();  
        team.gf = $item.find('.partidosjgep').eq(5).text().trim().toLowerCase();
        team.gc = $item.find('.partidosjgep').eq(6).text().trim().toLowerCase();
        team.ga = $item.find('.partidosjgep').eq(7).text().trim().toLowerCase();

        teams.push(team);
    })
    console.log(teams);
}

fetchData();