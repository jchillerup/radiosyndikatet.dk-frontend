/*
 * FolkRadio.dk - http://folkradio.dk/
 * Copyright 2011 by Kamil "Brego" Dzieliński <brego.dk@gmail.com>
 *
 * Feel free to use & modify, but drop me an email ;)
 **/

var PlayerInterface = {
    button:        null,
    button_play:   null,
    button_stop:   null,
    volume:        null,
    current_program: null,
    cover_area:    null,
    current_cover: null,
    cover_cache:   [],

    init: function() {
	log('PlayerInterface initiated');

	// Fetching certain elements into properties (speed)
	this.button        = $('#button');
	this.button_play   = $('#button-play');
	this.button_stop   = $('#button-stop');
	this.volume        = $('#volume');
	this.current_program = $('#current-program');
	this.cover_area    = $('#cover-area');

	// Adding the current cover into the cache
	this.current_cover    = this.cover_area.find('img');

	// Getting the current track
	this.query_current_track();

	this.button.click(function() { PlayerInterface.button_controll(); return false; });
    },
    
    query_current_track: function() {
	var self = this;
	
	$.getJSON("now_playing.php", function(data) {
	    console.log(data.cover);
	    self.current_cover.attr('src', data.cover);
	    self.cover_area.fadeIn('fast');
	    self.current_program.html(data.title);
	});

    },

    button_controll: function() {
	log('PlayerInterface: button clicked');

	if (Player.state == null || Player.state == 'stopped') {
	    log('PlayerInterface: player is stopped, activating');

	    this.indicator_on();
	    this.button_play.hide();
	    Player.play(function(event) {
		// PlayerInterface.volume.fadeIn();
		PlayerInterface.indicator_off();
		PlayerInterface.button_stop.show();
	    });
	} else if (Player.state == 'playing') {
	    log('PlayerInterface: player is playing, stopping');

	    // this.indicator_on();
	    Player.stop(function() {
		// PlayerInterface.volume.fadeOut();
		PlayerInterface.button_stop.hide();
		PlayerInterface.button_play.show();
	    });
	}
    },

    volume_controll: function() {},
    
    set_title: function(program_name) {
	document.title = program_name + ' - Radio Syndikatet';
    },

    load_cover: function(short_name, program_name) {
	log('PlayerInterface: Loading cover for '+album);
	
	new_cover                  = document.createElement('img');
	new_cover.src              = 'covers/' + short_name + '.jpg';
	new_cover.id               = 'cover-' + short_name;
	new_cover.alt              = program_name;
	new_cover.title            = program_name;
	new_cover.style.opacity    = 0;
    },

    track_change: function(artist, track_name, album, cover_id) {
	this.load_cover(cover_id, album);

	if (this.current_track.text() != (artist + ' - ' + track_name)) {
	    this.current_track.add(this.cover_area.children('img')).animate({opacity: 0}, 300, function() {
		// Changing the label
		PlayerInterface.current_track.text(artist + ' - ' + track_name);

		// Changing the page title
		PlayerInterface.set_title(artist, track_name);

		// Empty the cover_area and add the new cover
		PlayerInterface.cover_area.empty();
		PlayerInterface.cover_area.append(PlayerInterface.cover_cache[cover_id]);
		
		PlayerInterface.current_track.add('#cover-' + cover_id).animate({opacity: 1}, 300);
	    });
	}

    },

    indicator_on: function() {
	log('PlayerInterface: toggling indicator on');

	this.button.addClass('loader');
    },

    indicator_off: function() {
	log('PlayerInterface: toggling indicator off');

	this.button.removeClass('loader');
    }
};
