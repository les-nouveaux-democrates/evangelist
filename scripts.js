function loadTargets() {
	// Tries to get data from the Sheets api. Otherwise, retries 200ms later.
	if (callTargets.responseJSON === undefined) setTimeout(loadTargets, 200)
	else buildTargets(callTargets.responseJSON.feed.entry) 
}

function showRandomTargets(i) {
	var result = $('.target').get().sort(function(){ 
		return Math.round(Math.random())-0.5
	}).slice(0,i)
	$(result).fadeIn().css("display","inline-block")
}

function buildTargets(people) {

	var $targets = $('#targets')

	// Builds the HTML structure around a portrait.
	$.each(people, function(i, person) {
		var id = person.title.$t
			details = person.content.$t
				.replace('nom: ','')
				.replace(', prénom: ','|')
				.replace(', need: ','|')
				.split('|')
			nom = details[0]
			prenom = details[1]
			need = details[2]

		if (need > 0) {
			var html = 
				'<div' +
				'	class="target" ' +
				'	data-nom="' + nom + '" ' +
				'	data-prenom="' + prenom + '" ' +
				'	data-need="' + need + '" ' +
				'>'+
				'	<span class="oui">OUI</span>' +
				'	<span>' + prenom + '<br/><strong>' + nom + '</strong></span>' +
				'	<span class="non">NON</span>' +
				'</div>'	
			$targets.append(html)
		}

	})


	showRandomTargets(3)

	$('.target .non').click(function(){
		$(this).closest('.target').remove()
	})


//	$('#listeux > div, #copains > div').each(function(){
//		var $membre = $(this)
//			name = $membre.attr('data-name')
//			image = $membre.attr('data-image')
//			quote = $membre.attr('data-quote')
//			description = $membre.attr('data-description')
//			status = $membre.attr('data-status')
//			active = $membre.attr('data-active')
//			randomDelay = '.' + (Math.floor(Math.random() * 10 ) + 1).toString() + 's'
//		if (active==="Non") {
//			image = "http://imgur.com/8Nc65xR.png"
//			name = "???"
//			description = "Pas encore dévoilé"
//		}
//		$(this).addClass('col-sm-6 col-md-4 col-lg-3 text-center wow flipInY')
//		$(this).attr('data-wow-delay', randomDelay).attr('data-wow-duration', '3s' )
//		$(this).append('<div class="portrait" style="background-image: url(&quot;' + image + '&quot;)"></div>')
//		$(this).append('<h3>' + name + '</h3>')
//		if (typeof description !== "undefined") $(this).append('<p class="description">' + description + '</p>')
//	//	if (typeof quote !== "undefined") $(this).append('<hr><p class="quote">' + quote + '</p>')
//	})
}

var doc = "1Eez-1zPKD7UsIUukRQJoH1dVBM6HXNSQaVChxCzwLwE"
	api = "https://spreadsheets.google.com/feeds/list/" + doc + "/1/public/basic?alt=json"

callTargets = $.ajax(api)
loadTargets()