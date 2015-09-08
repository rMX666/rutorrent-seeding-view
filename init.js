(function () {
	plugin.loadMainCSS();

	var seedingLabelName = '-_-_-see-_-_-',
		completeLabelName = '-_-_-com-_-_-';

	theWebUI.labels[seedingLabelName] = 0;

	plugin.markLoaded();

	plugin.loadLabels = theWebUI.loadLabels;
	theWebUI.loadLabels = function () {
		if ($('#' + seedingLabelName).length === 0) {
			var li = $('<li />', {
				id: seedingLabelName,
				html: theUILang.Seeding + ' (<span id="' + seedingLabelName + 'c">0</span>)'
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
			lbl += seedingLabelName;
			lbl = lbl.replace(completeLabelName, '');
			this.labels[completeLabelName]--;
			if (this.labels[id].indexOf(seedingLabelName) == -1) {
				this.labels[seedingLabelName]++;
			}
		}
		else {
			if (this.labels[id].indexOf(seedingLabelName) > -1) {
				lbl = lbl.replace(seedingLabelName, '');
				this.labels[seedingLabelName]--;
			}
		}

		return lbl;
	};
}) ();
