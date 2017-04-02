function displayAuthor (authorDetail) {
	var fullName = authorDetail.givenname + " " + authorDetail.familyname;
	if (authorDetail.homepage) {
		var link = $("<a>");
		if (authorDetail.highlight) {
			link.append("<b>"+fullName+"</b>");
		} else {
			link.append(fullName);
		}
		link.attr("href", authorDetail.homepage);
		return link;
	} else {
		return fullName;
	}
}
function displayProject(projObj, authorsDict, pubDict) {
	var container = $("<div>");
	container.attr('id', projObj.id);
	container.addClass('section');

	// add thumbnail
	var thumbnail = $("<div>");
	thumbnail.addClass('thumbnail');
	if (projObj.thumbnail) {
		thumbImg = $("<img>");
		thumbImg.attr('src', projObj.thumbnail);
		thumbnail.append(thumbImg);
	}
	container.append(thumbnail);


	// Add details
	var details = $("<div>");
	details.addClass('details');
	// add title
	var title = $("<h1>");
	title.addClass("title");
	title.append(projObj.title);
	details.append(title);
	if (projObj.description) {
		var des = $("<h2>");
		des.append(projObj.description);
		details.append(des);
	}
	// add authors
	var authors = $("<p>");
	authors.addClass("authors");
	for (var i = 0; i < projObj.authors.length; i++) {
		var author = projObj.authors[i];
		if (authorsDict[author]) {
			authors.append(displayAuthor(authorsDict[author]));
		} else {
			authors.append(author);
		}
		if (i != projObj.authors.length - 1) {
			authors.append(", ");
		}
	}
	details.append(authors);

	// add publication name
	var pub = $("<p>");
	pub.addClass("publication");
	pub.append(pubDict[projObj.publication]);
	pub.append(", "+projObj.year);
	details.append(pub);


	// add links
	var linkNames = ["paper", "poster", "video", "code"];
	for (var i = 0; i < linkNames.length; i++) {
		var linkName = linkNames[i];
		if (projObj[linkName]) {
			var link = $("<a>");
			link.attr("href", projObj[linkName]);
			link.attr("title", linkName);
			link.attr("style", "margin-right: 5px");
			link.attr("target", "_blank");
			link.append(linkName.charAt(0).toUpperCase()+
				linkName.slice(1));
		}
		details.append(link);
	}
	container.append(details);


	// add clear div
	var clear = $("<div>");
	clear.addClass("clear");
	container.append(clear);

	$("#cv_body_wrap").append(container);
}
