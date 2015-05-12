plugin.loadMainCSS();

theWebUI.labels["-_-_-see-_-_-"] = 0;

plugin.markLoaded();

plugin.loadLabels = theWebUI.loadLabels;
theWebUI.loadLabels = function () {
	if ($('#-_-_-see-_-_-').length === 0) {
		var li = $('<li />', {
			id: '-_-_-see-_-_-',
			html: theUILang.Seeding + ' (<span id="-_-_-see-_-_-c">0</span>)'
		});
		li.addClass('cat').mouseclick(theWebUI.labelContextMenu);
		$('#pstate_cont').append(li);
	}

	return plugin.loadLabels.apply(theWebUI, arguments);
};

plugin.getLabels = theWebUI.getLabels;
theWebUI.getLabels = function (id, torrent) {
	var lbl = plugin.getLabels.call(theWebUI, id, torrent);

	if (torrent.status == theUILang.Seeding) {
		lbl += "-_-_-see-_-_-";
		lbl = lbl.replace('-_-_-com-_-_-', '');
		this.labels["-_-_-com-_-_-"]--;
		if (this.labels[id].indexOf("-_-_-see-_-_-") == -1) {
			this.labels["-_-_-see-_-_-"]++;
		}
	}

	return lbl;
};
