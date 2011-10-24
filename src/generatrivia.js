/* @author: sgurin */

var gt = {  
	
	initGame : function() {
//		gt.initTriviaData();
		if(!window["triviadata"]){
			var params = gt.getRequestParams();
			if(params["triviaDataUrl"]) {
				langUtil._loadF(params["triviaDataUrl"], "js", function(){
					/* now window.triviadata should be loaded, so reinitialize game */
					if(params["baseUrl"])
						window.triviaData.baseUrl=params["baseUrl"];
					gt.initGame();
				});
			}
		}
		else {
			gt.data=window["triviadata"];
		}
		if(!gt.data.baseUrl)
			gt.data.baseUrl="./";
		//framework language init
		gt.langs = [
			{"locale":"en", "name": "English", "url":gt.data.baseUrl+"language-en.js"}, 
			{"locale":"es", "name": "Español", "url":gt.data.baseUrl+"language-es.js"}, 
		];
	
		gt.doAskLangAndStart();
	}, 
	doAskLangAndStart : function() {		
		gt.languageDialog = $("#language-dialog");
		var s = "<select id=\"language-select\">";
		for(var i = 0; i< gt.langs.length; i++) {
			var lang = gt.langs[i];
			s+="<option value=\""+lang.locale+"\">"+lang.name+"</option>";
		}
		s+="</select>";
		gt.languageDialog.append(s);
		
		gt.languageDialog.dialog({width: 600, title: "Select language...", "buttons": {
			"Ok": function() { 
				$(this).dialog("close"); 
				var selected = $("#language-dialog select option:selected").attr("value");
				for(var i = 0; i< gt.langs.length; i++) {					
					if(gt.langs[i].locale==selected) {
						gt.currentLocale=gt.langs[i].locale;						
						langUtil.addLocale(gt.langs[i].locale, gt.langs[i].url, function(){
							gt.startGame();
						});
					}
				}				
			}
		}});
		gt.languageDialog.show();
	},
	
	startGame : function() {
		gt.initRaphael();
		gt.initLocale();
		gt.processData();
		gt.initComponents();
		gt.buildBoard();
	},
	
	initComponents : function() {
		//init tools
		gt.toolsContainer = $("#tools-container");
		for(var toolId in gt.tools) {
			var tool = gt.tools[toolId], 
				toolMainElId = "tool-"+toolId;
			
//			alert("toold id : "+toolId+" - is enabled: "+tool.isEnabled(gt.data)+" - toolMainElId: "+toolMainElId);
			if(tool.isEnabled(gt.data)) {				
				gt.toolsContainer.append("<div id=\""+toolMainElId+"\"></div>");			
				tool.init($("#"+toolMainElId));
			}
		}
	},
	
	initLocale : function() {
		langUtil.fixMarkup(gt.currentLocale);
		if(gt.data["categories-"+gt.currentLocale]) 
			gt.data.categories=gt.data["categories-"+gt.currentLocale];
		if(gt.data["questions-"+gt.currentLocale]) 
			gt.data.questions=gt.data["questions-"+gt.currentLocale];
	},
	initRaphael : function() {
		gt.paperWidth = parseInt(gt.data.boardSize.split(",")[0]);
		gt.paperHeight = parseInt(gt.data.boardSize.split(",")[1]);
		gt.boardPaper = Raphael("trivia-paper", gt.paperWidth, gt.paperHeight);
		gt.paperX = $("#trivia-paper").offset().left;
		gt.paperY = $("#trivia-paper").offset().top;
	},
	buildBoard : function() {		
		var paper = gt.boardPaper;
		gt.boardImage = paper.image(gt.data.boardImage, 0, 0, gt.paperWidth, gt.paperHeight);
						
		//pieces tools
		gt.addPiececolorSelector = $("#add-piece-piece-selector");
		var s = "<select id=\"add-piece-piece-selector-select\">";
		for(var i in gt.data.piecesEls) {
			s+="<option value=\""+i+"\">"+i+"</option>";
		}
		s+="</select>";
		gt.addPiececolorSelector.append(s);
		
		gt.addPiececolorSelector = $("#add-piece-color-selector");	
		
		$("#add-pieces-tool-main #add-piece-button").before(
			"<span>Size: </span><input type=\"text\" id=\"add-piece-size\" value=\"20,30\"></input>");
		
		gt.addPieceButton = $("#add-piece-button");
		gt.addPieceButton.click(function(){
			gt.doAddPiece();
		});
		
		
		
		
		//dices	tools
		gt.rollDiceButton = $("#dice-button");//gt.diceValueInput = $("#dice-value");
		gt.rollDiceButton.click(function(){
			gt.doRollDices();
		});
		for(var i = 0; i<gt.data.dices.amount; i++) 
			gt.rollDiceButton.parent().append("<input class=\"dice-value\"></input>");		
		if(gt.data.dices.amount==0) 
			gt.rollDiceButton.hide();		
		
		gt.showQuestionsButton = $("#show-questions-button");
		gt.showQuestionsButton.click(function(){
			gt.doShowQuestions(null, false);
		});
		if(!gt.data.questions ||gt.data.questions.length==0)
			gt.showQuestionsButton.hide();
		
		gt.doAddPieces();
		
		
		//help
		$("#help-using-particular")
	},
	
	processData: function() {
		var data = gt.data;
		data.categories=data.categories?data.categories:[];
		data.questions=data.questions?data.questions:[];
		data.boardWidth = parseInt(data.boardSize.split(",")[0]);
		data.boardHeight = parseInt(data.boardSize.split(",")[1]);
		
		//build pieces
		data.piecesEls = {};
		for(var i = 0; i<data.pieces.length; i++) {
			var el = eval("gt.boardPaper."+triviadata.pieces[i].code);			
			data.piecesEls[data.pieces[i].name] = el;
			el.hide();
		}
		
		//categorize questions
		data.questionsByCat = {};	
		for(var i = 0; i<data.categories.length; i++) {
			data.questionsByCat[data.categories[i].name]=[];
		}
		for(var i = 0; i<data.questions.length; i++) {
			var categoryName = data.questions[i].categoryName;
			if(!categoryName || categoryName=="")
				alert("ERROR PARSING DATA: question "+data.questions[i].question+" without ctegory");
			else if(!data.questionsByCat[categoryName])
				alert("ERROR PARSING DATA: question "+data.questions[i].question+" category not found : "+categoryName);
			else 
				data.questionsByCat[categoryName].push(data.questions[i]);
		}
		
		//dice
		data.dices=data.dices?data.dices:{amount: 0, range: [1, 6]};
	},
	
	
	
	//game actions
	/** hadler for adding pirces clicking add piece GUI button */
	doAddPiece : function() {
		var pieceName = $($("#add-piece-piece-selector option:selected")[0]).attr("value"), 
			pieceColor = "#"+gt.addPiececolorSelector.attr("value"),
			size = gt.extractMeasures($("#add-piece-size").attr("value"));
		
		gt.addPiece(pieceName, pieceColor, 60, 60, size[0], size[1]);
	},
	
	_pieceCounter : 0,
	_pieces : {},
	addPiece : function(pieceName, pieceColor, x, y, width, height, disableDrag) {
		
		x=x?x:40;
		y=y?y:40;
		pieceColor=pieceColor?pieceColor:"#ffffff";
		var newPiece = gt.data.piecesEls[pieceName].clone();
		newPiece._gt_name=pieceName;
		newPiece._gt_color=pieceName;
//		newPiece._gt_x=Math.round(x);
//		newPiece._gt_y=Math.round(y);
		newPiece.attr({fill: pieceColor, stroke: "black", strokewidth: "1"});
		newPiece.translate(x, y);
		
		var bbox = newPiece.getBBox();
		this._gt_x=Math.round(bbox.x-11);
		this._gt_y=Math.round(bbox.y-11);
				
		gt._pieceCounter++;
		newPiece._gt_id="gtPiece-"+gt._pieceCounter;
		gt._pieces[newPiece._gt_id]=newPiece;
		
//		bbox=newPiece.getBBox();
		if(width && height) {
			newPiece.attr({"width": width, "height": height});
			newPiece._gt_width=Math.round(width);
			newPiece._gt_height=Math.round(height);
		}
		else {
			newPiece._gt_height=newPiece.getBBox().height;			
			newPiece._gt_width=newPiece.getBBox().width;
		}
		
//		newPiece._gt_x=Math.round(x);
//		newPiece._gt_y=Math.round(y);
		
		
		if(!disableDrag) {
			newPiece.drag(function(dx, dy, x, y){
				var realX = x-gt.paperX, 
					realY = y-gt.paperY;
				this.transform("T"+(realX-30)+","+(realY-40));
				
				var bbox = this.getBBox();
				this._gt_x=Math.round(bbox.x-11);//Math.round(x-gt.paperX);
				this._gt_y=Math.round(bbox.y-11);//Math.round(y-gt.paperY);
			});
		}
		newPiece.show();
	},
	/** perform adding pieces defined in data.js addPieces property */
	doAddPieces : function() {
		if(gt.data.addPieces) {
			for(var i = 0; i<gt.data.addPieces.length; i++) {
				var p = gt.data.addPieces[i], 
					pos = gt.extractMeasures(p.position), 
					size = gt.extractMeasures(p.size), 
					amount = p.amount ? parseInt(p.amount) : 1; 
				//alert("addpieces: "+pos[0]+"-"+pos[1]);
				for(var j=0; j<amount; j++) {
					gt.addPiece(p.name, p.color, pos[0], pos[1], size[0], size[1], p["disable-drag"]);
				}
			}
		}
	},
	doRollDices : function() {
		$(".dice-value").each(function(){
			var a = data.dices.range[0], b = data.dices.range[1];
			gt.diceValue = gt.randomInt(b-1)+a;		
			$(this).attr("value", gt.diceValue+"");
		});		
	},
	doShowQuestions : function(catQuestions, showAnswer) {
		
		if(catQuestions==null) {
			//pic a question randomly from each categry and show them
			catQuestions = {}; //category idx - > question map
			for(var i = 0; i<gt.data.categories.length; i++) {
				var catQuest = gt.data.questionsByCat[gt.data.categories[i].name] //questions of this category
				var questionIndex = gt.randomInt(catQuest.length-1);
				catQuestions[i] = catQuest[questionIndex];			
			}
			
			gt._answerShowed=false;
			gt._currentCatQuestions = catQuestions;		
		}
		
		var dialog = $("#question-dialog-table").clone(true);
		for(var catIdx = 0; catIdx < gt.data.categories.length; catIdx++) {
			var question = catQuestions[catIdx], 
				questionString = showAnswer ? question.answer : question.question, 
				category = gt.data.categories[catIdx];
			
			dialog.append(
				"<tr class=\"question-column\">"+
					"<td class=\"question-color\" style=\"background-color: "+category.color+"\">"+category.name+"</td>"+
					"<td class=\"question-text\">"+questionString+"</td>"+
				"</tr>");
		}
		var buttons = null;
		if(!showAnswer){
			buttons={
				"Show answers": function() { 
					$(this).dialog("close"); 
					if(!gt._answerShowed) {
						gt._answerShowed=true;
						gt.doShowQuestions(gt._currentCatQuestions, true);
					}
				}, 
				"Show other questions": function() { 
					$(this).dialog("close"); 
					gt.doShowQuestions(null, false);
				},
				"Cancel": function() { 
					$(this).dialog("close"); 
				}
			};
		}
		else {
			buttons={
				"Ok": function() { 
					$(this).dialog("close"); 
				}
			}
		}
		dialog.dialog({width: 600, "buttons": buttons});
		dialog.show();
	},
	
	
	
	//misc utilities
	/** return int between 0 and max */
	randomInt : function(max) {
		var v = -1;
		do {
			v = Math.floor(Math.random()*(max+1));
		} while(v<0 || v>max);
		return v;
	}, 
	dump : function(o) {
		var s = "{";
		for(var i in o) {
			s+=i+", ";
		}
		return s+"}";
	}, 
	extractMeasures : function(s, boardW, boardH) {	
		boardW=boardW?boardW:gt.data.boardWidth;
		boardH=boardH?boardH:gt.data.boardHeight;
		if(!s) return [-1,-1];
		try {
			var a = s.split(","), x_ = a[0], y_ = a[1], x=0, y=0, 
				xIsPercent=false, yIsPercent=false;
			//debugger;
			if(a.length!=2)
				return [0,0];
//			alert(x_.indexOf("%")+"=="+x_.length-1);
			//alert(a+", "+x_+", "+y_);
			if(x_.length>1 && x_.indexOf("%")==x_.length-1) {
				try {
					x=parseInt(x_.substring(0,x_.length-1));
					xIsPercent=true;
				}catch(ex){}
			}
			
			else if(x_.length>0) {
				x=parseInt(x_);
			}
			//alert(y_.indexOf("%")+"=="+y_.length-1)
			if(y_.length>1 && y_.indexOf("%")==y_.length-1) {				
					y=parseInt(y_.substring(0,y_.length-1));
					yIsPercent=true;				
			}
			else if(y_.length>0) {
				y=parseInt(y_);
			}
			if(boardW && xIsPercent)
				x=x*boardW*0.01;
			if(boardH && yIsPercent)
				y=y*boardH*0.01;
			return [x,y];
		}catch(ex){
			return [-1,-1];
		}		
	}, 	
	getRequestParams : function() {
		var hu = window.location.search.substring(1),
			gy = hu.split("&"), params={};
		for (i=0;i<gy.length;i++) {
			var ft = gy[i].split("=");
			params[ft[0]]=ft[1];
		}
	},
	/** getx,y coords of a mouse click event relative to paper pos */
	getPositionFromEvent : function(e) {alert(gt.paperX+" - "+gt.paperY);
		var x = e.pageX - this.offsetLeft - gt.paperX;
		var y = e.pageY - this.offsetTop - gt.paperY;
		return [x,y];
	},
	getPointPercent : function(p) {
		var relX = Math.round((p[0]/gt.paperWidth)*100), 
			relY = Math.round((p[1]/gt.paperHeight)*100);
		//debugger;
		return [relX, relY];
	},
	
	tools: {},	
	
	initToolMarkup : function(parentEl,markup) {
		$(parentEl).html(markup);
	},
	
	"":""
};


/* a cutom tool (plugin) example : mouseCoords */
gt.tools.mouseCoords = {
	name: "mouse coordinates in board",
	description: "a tool that shows absolute and percentual position of a point in the board on mouse click",
	
	/**this method will be called by the frameowork for loading the tool, if isEnabled is true. concrete tools should create the markup in the parent, register event listeners, etc here. 
	 * the tool shoud *append* a new element to the parrent. 	
	 * @param parentEl is a dom object or an id or jquery selector for this tool dom parent */		
	init : function(parentEl) {
		gt.initToolMarkup(parentEl, gt.tools.mouseCoords._markup);
		
		gt.tools.mouseCoords.mouseCoordsIsActive = false;
		$("#mouse-coords-tool-button").text("activate");
		$("#mouse-coords-tool-button").click(gt.tools.mouseCoords._mouseCoordsToggleActive);
	},
	
	
	/** this function indicates if this tool shoud be showed according to a game's data. 
	 * This method will be called at least one, so this way the tool can define custom 
	 * game's configuration for indicating if tool should be enabled, or passing other data. */
	isEnabled : function(data) {
		return data.mouseCoordsToolEnabled;
	},
	 
	_mouseCoordsMouseHandler : function(e) {
		var pos = gt.getPositionFromEvent(e), 
			posPercent = gt.getPointPercent(pos);
		var s = "Click position in the board:\n"+
			"absolute: "+pos[0]+","+pos[1]+"\n"+
			"percentual: "+posPercent[0]+"%,"+posPercent[1]+"%";
		alert(s);
//		    $('#mouse-coords-tool-input-abs').attr("value", x +', '+ y);
	},
	_mouseCoordsToggleActive : function() {
		if(gt.tools.mouseCoords.mouseCoordsIsActive)
			gt.tools.mouseCoords._mouseCoordsSetActive(false);
		else
			gt.tools.mouseCoords._mouseCoordsSetActive(true);
	},
	_mouseCoordsSetActive : function(active) {
		if(active) {
			if(!gt.tools.mouseCoords.mouseCoordsIsActive) {
				$("#mouse-coords-tool-button").text("deactivate");
//				debugger;//bind
				$("#trivia-paper").bind("click", gt.tools.mouseCoords._mouseCoordsMouseHandler);
				gt.tools.mouseCoords.mouseCoordsIsActive=true;
			}
		}
		else {
			if(gt.tools.mouseCoords.mouseCoordsIsActive) {
				$("#mouse-coords-tool-button").text("activate");
				$("#trivia-paper").unbind("click", gt.tools.mouseCoords._mouseCoordsMouseHandler);
				gt.tools.mouseCoords.mouseCoordsIsActive=false;
			}
		}
	},
	/** the murkup should be only input elements like buttons, inputs, etc. The framework will put the tool name and description automatically in the markup.*/
	_markup : 
		"		<button id=\"mouse-coords-tool-button\">activate</button>\n"
//			"		<input id=\"mouse-coords-tool-input\"></input>\n"
};//end of mouseCoords plugin 
	


gt.tools.piecePositions = {
   name: "pieces position extractor",
   description: "a tool for extracting the current state of the board pieces positions",
	
	/**this method will be called by the frameowork for loading the tool, if isEnabled is true. concrete tools should create the markup in the parent, register event listeners, etc here. 
	 * the tool shoud *append* a new element to the parrent. 	
	 * @param parentEl is a dom object or an id or jquery selector for this tool dom parent */		
	init : function(parentEl) {
		gt.initToolMarkup(parentEl, gt.tools.piecePositions._markup);
		$(document.body).append("<div id=\"piecePositionsToolDialog1\"></div>")
		gt.tools.piecePositions.dialog1=$("#piecePositionsToolDialog1");
		
		gt.tools.piecePositions.dialog1.append("<p>The pieces code is: </p>");
		gt.tools.piecePositions.dialog1.append("<textarea style=\"width: 100%\" id=\"piecePositionsToolDialog1Text\"></textarea>");
		gt.tools.piecePositions.dialog1Text=$("#piecePositionsToolDialog1Text");
		
		gt.tools.piecePositions.dialog1.dialog({ autoOpen: false })
		gt.tools.piecePositions.dialog1.dialog("close");
		
		$("#tool-piece-position-absolute").click(function(){
			gt.tools.piecePositions.dialog1Text.attr("value", 
				gt.tools.piecePositions.extractPiecePositions(false));
			gt.tools.piecePositions.dialog1.dialog("open");
		});
		$("#tool-piece-position-percent").click(function(){
			gt.tools.piecePositions.dialog1Text.attr("value", 
				gt.tools.piecePositions.extractPiecePositions(true));
			gt.tools.piecePositions.dialog1.dialog("open");
		});
	},
	isEnabled : function(data) {
		return data.piecePositionsToolEnabled;
	},
	extractPiecePositions : function(percent) {		
		var pcodes = [];
		for(var pid in gt._pieces) {
			var piece = gt._pieces[pid];
			if(!percent) {
				pcodes.push("{name: \""+piece._gt_name+"\""+
					", position: \""+piece._gt_x+","+piece._gt_y+"\""+
					", size: \""+piece._gt_width+","+piece._gt_height+"\""+
					", color: \""+piece._gt_color+"\""+
					"}");
			}
			else {
				var pos = gt.getPointPercent([piece._gt_x, piece._gt_y]), 
					size = gt.getPointPercent([piece._gt_width, piece._gt_height]);
				pcodes.push("{name: \""+piece._gt_name+"\""+
					", position: \""+pos[0]+"%,"+pos[1]+"%\""+
					", size: \""+size[0]+"%,"+size[1]+"%\""+
					", color: \""+piece._gt_color+"\""+
					"}");
			}
		}
		var s = "addPieces : [";
		s+=pcodes.join(",\n");
		return s+"]";
	},
	_markup :
		"<button id=\"tool-piece-position-absolute\">get pieces absolute info</button>\n"+
		"<button id=\"tool-piece-position-percent\">get pieces percentual info</button>\n"
}
// a
$(document).ready(function(){
	gt.initGame();
});