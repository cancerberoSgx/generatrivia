/* @author: sgurin */


/**
 * generatrivia toolkit
 */
var gt = {  
	
  /**
   * main game initialization method. called from html document.
   */
	initGame : function(gameData) {
//	   if(!window["triviadata"]){
//			var params = gt.getRequestParams();
//			if(params["triviaDataUrl"]) {
//				langUtil._loadF(params["triviaDataUrl"], "js", function(){
//					/* now window.triviadata should be loaded, so reinitialize game */
//					if(params["baseUrl"])
//						window.triviaData.baseUrl=params["baseUrl"];
//					gt.initGame();
//				});
//			}
//		}

		//first read data from global. It can be overwritten below 
		gt.data=window["triviadata"];
	   
		if(gameData) {
		   gt.data=gt.overwriteObject(gt.data, gameData);
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
		
//		debugger;
		if(gt.data.gameLocale && gt._getLocale(gt.data.gameLocale)) {
			gt._startGameWithLocale(gt.data.gameLocale);
		}
		
		else {
			
			$(document.body).append(
				"<div id=\"language-dialog\">\n"+
				"	<p>Language: </p>\n"+
				"</div>");
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
							gt._startGameWithLocale(gt.langs[i].locale);
						}
					}				
				}
			}});
			gt.languageDialog.show();
		}
		
		
		
	},
	
	_startGameWithLocale : function(localeName) {
		var locale = gt._getLocale(localeName);
		if(locale) {
			gt.currentLocale = locale.locale;//gt.langs[localeName].locale;
		}
		else {//if(!gt.currentLocale) {
			gt.currentLocale=gt.langs[0].locale;
			alert("locale "+localeName+" not found, using default locale: "+gt.currentLocale);
		}
		langUtil.addLocale(locale.locale, locale.url, function(){
			gt.startGame();
		});
	},
	
	_getLocale : function(localeName) {
		for(var i = 0; i<gt.langs.length; i++) {
			if(gt.langs[i].locale==localeName)
				return gt.langs[i];
		}
		return null;
	},
		
	
	startGame : function() {
		gt.initRaphael();
//		gt.initLocale();
		gt.initData();
//		gt.buildBoard();	
		gt.initTools();
		
		gt.paperX = $("#trivia-paper").offset().left;
		gt.paperY = $("#trivia-paper").offset().top;
		//alert("paperX: "+gt.paperX);
		
		//do the locale translation now!
		langUtil.fixMarkup(gt.currentLocale);
	},
	
	initTools : function() {
		//init tools
		gt.toolsContainer = $("#tools-container");
		for(var toolId in gt.tools) {
			var tool = gt.tools[toolId], 
				toolMainElId = "tool-"+toolId;			
//			alert("toold id : "+toolId+" - is enabled: "+tool.isEnabled(gt.data)+" - toolMainElId: "+toolMainElId);
			if(tool.isEnabled(gt.data)) {	
				
				//init tool locale, if any
				if(tool["name-"+gt.currentLocale])
					tool.name=tool["name-"+gt.currentLocale];
				if(tool["description-"+gt.currentLocale])
					tool.description=tool["description-"+gt.currentLocale];
				tool.locale=gt.currentLocale;
				
				gt.toolsContainer.append(
					"<h3 class=\"tool-title\" title=\""+tool.description+"\">"+tool.name+"</h3>"+
					"<div class=\"tool-container\" id=\""+toolMainElId+"\"></div>");			
				tool.init($("#"+toolMainElId));
			}
		}		
		$("#tools-container h3").click(function(){
			$(this).next().toggle("slow");
			return false;
		}).css({cursor: "pointer"});//.next().hide();
	},
	
	initRaphael : function() {
		gt.paperWidth = parseInt(gt.data.boardSize.split(",")[0]);
		gt.paperHeight = parseInt(gt.data.boardSize.split(",")[1]);
		gt.boardPaper = Raphael("trivia-paper", gt.paperWidth, gt.paperHeight);
		
		var paper = gt.boardPaper;
		gt.boardImage = paper.image(gt.data.boardImage, 0, 0, gt.paperWidth, gt.paperHeight);
		
	},
	
//	buildBoard : function() {
//	},
	
	initData: function() {
		var data = gt.data;
		
		data.boardWidth = parseInt(data.boardSize.split(",")[0]);
		data.boardHeight = parseInt(data.boardSize.split(",")[1]);
	},
	
	
	
	
	
	//game actions	
	
	
	
	
	
	
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
	overwriteObject : function(o1, o2) {
		for(var i in o2) {
			o1[i]=o2[i];
		}
		return o1;
	},
	/**
	 * @param s - a string of the form "22px" or "22px,22%". all css units accepted
	 * @param boardW - optional - width of the board
	 * @param boardH - optional - height of the board
	 * @return - an array of 2 integers that correspond to absolute mesures in pixels
	 * of given string according to board dims.
	 */
	extractMeasures : function(s, boardW, boardH) {	
		boardW=boardW?boardW:gt.data.boardWidth;
		boardH=boardH?boardH:gt.data.boardHeight;
		if(!s) return [-1,-1];
		try {
			var a = s.split(",")
			if(a!=null&&a.length==1)
				a=[a,a];
			var x_ = a[0], y_ = a[1], x=0, y=0, 
				xIsPercent=false, yIsPercent=false;
			if(a.length!=2)
				return [0,0];
			if(x_.length>1 && x_.indexOf("%")==x_.length-1) {
				try {
					x=parseInt(x_.substring(0,x_.length-1));
					xIsPercent=true;
				}catch(ex){}
			}			
			else if(x_.length>0) {
				x=parseInt(x_);
			}
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
	getPositionFromEvent : function(e) {
		var x = e.pageX - gt.paperX;
		var y = e.pageY - gt.paperY;
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





/* *** TOOLS _ (plugins) ***/
		
		
var gt_tools_pieces = {

    name: "Add pieces",
    "name-en" : "Add pieces",
    "name-es" : "Agregar fichas",
    description: "A tool for adding pieces with custom shape, colors and sizes",
	"description-en" : "A tool for adding pieces with custom shape, colors and sizes",
	"description-es" : "Herramienta para agregar fichas con formas, colores y tamaños personalizados.",
    isEnabled : function(data) {
		return data.pieces;
	},
    init : function(parent)  {
//		gt.data.pieces=data.pieces?data.pieces:[];		
		var data = gt.data;
		//init pieces
		data.piecesEls = {};
		for(var i = 0; i<data.pieces.length; i++) {
			var el = eval("gt.boardPaper."+data.pieces[i].code);			
			data.piecesEls[data.pieces[i].name] = el;
			el.hide();
		}
		
		parent.append(
			"	<span class=\"translate\" translate-inner=\"color\">Color:</span><br/>		\n"+
			"	<input type=\"text\" value=\"\" id=\"add-piece-color-selector\"></input><br/>\n"+
			"	<span class=\"translate\" translate-inner=\"shape\">Piece type:</span><br/>\n"+
			"	<div id=\"add-piece-piece-selector\"></div><br/>\n"+
			"   <span class=\"translate\" translate-inner=\"size\">Size: </span><br/><input type=\"text\" id=\"add-piece-size\" value=\"\"></input><br/>"+
			"	<button id=\"add-piece-button\" class=\"translate\" translate-inner=\"add-piece\">Add piece</button>\n"
		);

		gt.tools.pieces.addPieceTypeSelector = $("#add-piece-piece-selector");
		var s = "<select id=\"add-piece-piece-selector-select\">";
		for(var i = 0; i< gt.data.pieces.length; i++) {
			s+="<option value=\""+gt.data.pieces[i].name+"\">"+gt.data.pieces[i].name+"</option>";
		}
		s+="</select>";
		gt.tools.pieces.addPieceTypeSelector.append(s);
		
		gt.tools.pieces.addPieceTypeSelector = $("#add-piece-piece-selector-select");
		gt.tools.pieces.addPieceTypeSelector.change(function(){
			var selectedPieceName = $("#add-piece-piece-selector-select option:selected").attr("value"), 
				piece = gt.tools.pieces.getPieceDefinitionNamed(selectedPieceName);
			if(piece && piece.color) {
				var color = piece.color;
				if(piece.color.indexOf("#")==0)
					color = color.substring(1,color.length);
				
				gt.tools.pieces.addPieceColorSelector.attr("value", color);				
				gt.tools.pieces.addPieceColorPicker.fromString(color);
			}
		});
		gt.tools.pieces.addPieceColorSelector = $("#add-piece-color-selector");		
		gt.tools.pieces.addPieceColorPicker = new jscolor.color(document.getElementById("add-piece-color-selector"), {})
		
		gt.tools.pieces.addPieceButton = $("#add-piece-button");
		gt.tools.pieces.addPieceButton.click(function(){
			gt.tools.pieces.doAddPiece();
		});
		gt.tools.pieces.addPieceTypeSelector.trigger("change");
		
		gt.tools.pieces.doAddPieces();
    }, 
    getPieceDefinitionNamed : function(pieceName) {
		for(var i = 0; i<gt.data.pieces.length; i++) {
			if(gt.data.pieces[i].name==pieceName)
				return gt.data.pieces[i];
		}
		return null;
	},
	/** hadler for adding pirces clicking add piece GUI button */
	doAddPiece : function() {
		var pieceName = $($("#add-piece-piece-selector option:selected")[0]).attr("value"), 
			pieceColor = "#"+gt.tools.pieces.addPieceColorSelector.attr("value"),
			sizeInputValue = $("#add-piece-size").attr("value"), 
			size = [20,20], 
			pieceDef = gt.tools.pieces.getPieceDefinitionNamed(pieceName);
			
		if(sizeInputValue!=null&&sizeInputValue!="")
			size = gt.extractMeasures(sizeInputValue);
		else if(pieceDef.size)
			size = gt.extractMeasures(pieceDef.size);
		gt.tools.pieces.addPiece(pieceName, pieceColor, 60, 60, size[0], size[1]);
	}, 
	
	/** perform adding all pieces defined in data.js addPieces property */
	doAddPieces : function() {
		if(gt.data.addPieces) {
			for(var i = 0; i<gt.data.addPieces.length; i++) {
				var p = gt.data.addPieces[i], 
					pos = gt.extractMeasures(p.position), 
					size = gt.extractMeasures(p.size), 
					amount = p.amount ? parseInt(p.amount) : 1;
				for(var j=0; j<amount; j++) {
					if(!gt.data.piecesEls[p.name]) {
						alert("error when adding new pieces: piece definition \""+p.name+"\" doesn't exists. ");
					}
					gt.tools.pieces.addPiece(p.name, p.color, pos[0], pos[1], size[0], size[1], p["disable-drag"]);
				}
			}
		}
	},
	

	_pieceCounter : 0,
	_pieces : {},
	addPiece : function(pieceName, pieceColor, x, y, width, height, disableDrag) {
		var newPiece = gt.data.piecesEls[pieceName].clone(), 
			bb = newPiece.getBBox();
		x=x?x:40;
		y=y?y:40;
		width=width?width:bb.width;//30;
		height=height?height:bb.height;//30;
		pieceColor=pieceColor?pieceColor:"#ffffff";
		
		newPiece._gt_name=pieceName;
		newPiece._gt_color=pieceName;
		newPiece.attr({fill: pieceColor, stroke: "black", strokewidth: "1"});
		newPiece.translate(0,0);
		
		newPiece._gt_translateTranform = "T"+(x)+","+(y);		
		
		gt.tools.pieces._pieceCounter++;
		newPiece._gt_id="gtPiece-"+gt.tools.pieces._pieceCounter;
		gt.tools.pieces._pieces[newPiece._gt_id]=newPiece;
		
		newPiece._gt_scaleTransform="";
		if(width && height) {
			var bbox=newPiece.getBBox();
			var scaleStr = "s"+width/bbox.width+","+height/bbox.height;
			newPiece._gt_width=Math.round(width);
			newPiece._gt_height=Math.round(height);
			newPiece._gt_scaleTransform="s"+width/bbox.width+","+height/bbox.height;
		}
		else {
			newPiece._gt_height=newPiece.getBBox().height;			
			newPiece._gt_width=newPiece.getBBox().width;
		}
				
		if(!disableDrag) {
			newPiece.drag(function(dx, dy, x, y){
//				debugger;
//				alert()
				var realX = x - gt.paperX - this._gt_width, 
					realY = y - gt.paperY - this._gt_height;
				this._gt_translateTranform = "T"+(realX)+","+(realY);
				this.transform(this._gt_translateTranform+this._gt_scaleTransform);
				
				var bbox = this.getBBox();
				this._gt_x=Math.round(bbox.x - (this._gt_width/2));//Math.round(x-gt.paperX);
				this._gt_y=Math.round(bbox.y - (this._gt_height/2));//Math.round(y-gt.paperY);
			});
		}
		
		newPiece.show();
		newPiece.transform(newPiece._gt_translateTranform+newPiece._gt_scaleTransform);
		
		newPiece._gt_x=Math.round(bbox.x - (newPiece._gt_width/2));
		newPiece._gt_y=Math.round(bbox.y - (newPiece._gt_height/2));
		return newPiece;
	}
	
};
gt.tools.pieces = gt_tools_pieces;






var gt_tools_dices = {

    name: "Dices",
    description: "a tool for rolling dices",
    isEnabled : function(data) {
		return data.dices;
	},
    init : function(parent)  {
		parent.append(
		"	<p class=\"translate\" translate-inner=\"roll-dices\"></p>		\n"+
		"	<button id=\"dice-button\" class=\"translate\" translate-inner=\"roll-dices\">Roll the dices!</button>\n");

		gt.rollDiceButton = $("#dice-button");//gt.diceValueInput = $("#dice-value");
		gt.rollDiceButton.click(function(){
			gt.tools.dices.doRollDices();
		});
		for(var i = 0; i<gt.data.dices.amount; i++) 
			gt.rollDiceButton.parent().append("<input class=\"dice-value\"></input>");		
		if(gt.data.dices.amount==0) 
			gt.rollDiceButton.hide();		
    },
    doRollDices : function() {
		$(".dice-value").each(function(){
			var a = gt.data.dices.range[0], b = gt.data.dices.range[1];
			gt.diceValue = gt.randomInt(b-1)+a;		
			$(this).attr("value", gt.diceValue+"");
		});		
	}
};
gt.tools.dices = gt_tools_dices;






var gt_tools_questions = {

    name: "Questions and Answers",
    description: "A tool for showing categories, questions and answers for trivia-like games",
    isEnabled : function(data) {		
		gt.tools.questions._initData(data);
		return data.categories && data.categories.length>0 
			&& data.questions && data.questions.length>0;
	},
	_initData : function(data) {
		//init questions & categories		
		if(!data.questions) 
			data.questions = data["questions-"+gt.currentLocale];		
		if(!data.categories) 
			data.categories = data["categories-"+gt.currentLocale];
		data.questions=data.questions?data.questions:[];
		data.categories=data.categories?data.categories:[];
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
//		//init locale
//		if(gt.currentLocale) {
//			if(gt.data["categories-"+gt.currentLocale]) 
//				gt.data.categories=gt.data["categories-"+gt.currentLocale];
//			if(gt.data["questions-"+gt.currentLocale]) 
//				gt.data.questions=gt.data["questions-"+gt.currentLocale];
//		}
	},
    init : function(parent)  {	
		gt.tools.questions._initData(gt.data);
		$(document.body).append(
		"<div id=\"question-dialog\">\n"+
			"<table id=\"question-dialog-table\">\n"+
			"</table>\n"+
		"</div>")
		$("#question-dialog").hide();
		parent.append(
			"	<h3 class=\"translate\" translate-inner=\"third-step\"></h3>	\n"+
			"	<p class=\"translate\" translate-inner=\"answer-question\"></p>		\n"+
			"	<button id=\"show-questions-button\" class=\"translate\" translate-inner=\"show-questions\">Show the questions!</button>\n"
		);
	
		gt.showQuestionsButton = $("#show-questions-button");
		gt.showQuestionsButton.click(function(){
			gt.tools.questions.doShowQuestions(null, false);
		});
		if(!gt.data.questions ||gt.data.questions.length==0)
			gt.showQuestionsButton.hide();
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
						gt.tools.questions.doShowQuestions(gt._currentCatQuestions, true);
					}
				}, 
				"Show other questions": function() { 
					$(this).dialog("close"); 
					gt.tools.questions.doShowQuestions(null, false);
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
	}	
};
gt.tools.questions = gt_tools_questions;






var gt_tools_piecePositions = {

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
		for(var pid in gt.tools.pieces._pieces) {
			var piece = gt.tools.pieces._pieces[pid];
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
};
gt.tools.piecePositions = gt_tools_piecePositions;







/**
 * idea 1
 */
var gt_tools_boardGameEditor = {
    name: "a board game editor",
    description: "Let the user fill all the information in a game description file (data.js) in a web page.",	
	/**this method will be called by the frameowork for loading the tool, if isEnabled is true. concrete tools should create the markup in the parent, register event listeners, etc here. 
	 * the tool shoud *append* a new element to the parrent. 	
	 * @param parentEl is a dom object or an id or jquery selector for this tool dom parent */		
	init : function(parentEl) {}, 
	isEnabled : function(data){
		return false;
	}
};
gt.tools.boardGameEditor = gt_tools_boardGameEditor;






/**
 * idea 2: modelar cartas y mazo de cartas. Las cartas y mazos de cartas son como las fichas. 
 * los mazos de cartas son fichas que tienen fichas adentro y muestran todas las fichas de alguna forma
 * 
 * 
 * 
 * DECKS: 
 * 
 * the deck defines all the cards.  * there will be a control panel for each deck in the tool bar, with buttons to perform deck actions, like
 * shuffle, reset, deal, getFirst(n), etc. The user will define in data.js the 
 * meaning of som eof this actions, like where to deal, where to get the following cards in a solitaire game, etc
 * 
 * in data.js the user car configure the meaning of some 
 * messages understanded by the decks, for example, the user can configure: 
 * 
 * //for truco (uruguayan game) 
 * cards.deal : [{amount: 3,position: "200,20", turned: true}, 
 * 	{amount: 3, position: "200,400", turned: true}]; //truco
 * 
 * //for solitaire
 * cards.deal : [{amount: 1, position: "20,20", turned: false}, 
 * 	{amount: 1, position: "20,20", turned: false},
 * 	{amount: 1, position: "20,100", turned: false},
 * 	{amount: 1, position: "20,200", turned: false},
 *  {amount: 1, position: "20,200", turned: false}],
 */
var gt_tools_cards = {

    name: "cards",
    description: "cards support for generatrivia, so games like solitaire can be defined.",
	isEnabled : function(data){
		return gt.data.cards;
	},
	/**this method will be called by the frameowork for loading the tool, if isEnabled is true. concrete tools should create the markup in the parent, register event listeners, etc here. 
	 * the tool shoud *append* a new element to the parrent. 	
	 * @param parentEl is a dom object or an id or jquery selector for this tool dom parent */		
	init : function(parentEl) {
		 $(parentEl).append(
			 '<button id="tool-cards-deck-deal">deal</button>'+
			 '<button id="tool-cards-deck-shuffle">shuffle</button>',
			 '<button id="tool-cards-deck-getcards">get cards</button>'
		 );
		 $("#tool-cards-deck-deal").click(gt.tools.cards.doDeal);
		 $("#tool-cards-deck-shuffle").click(gt.tools.cards.doReset);
		 $("#tool-cards-deck-getcards").click(gt.tools.cards.doGetCards);
		 
		 
//		var el = eval("gt.boardPaper."+gt.data.cards.allCards[0].code);	
		 
		 //cards and deck are game pieces, so I define the piueces and create them.
//		 gt.tools.pieces.addPiece(pieceName, pieceColor, x, y, width, height, disableDrag);
		 
		 //build card-pieces
		gt.data.piecesEls = {};
		for(var i = 0; i<gt.data.cards.allCards.length; i++) {
			var el = eval("gt.boardPaper."+gt.data.cards.allCards[i].code);			
			gt.data.piecesEls[gt.data.cards.allCards[i].name] = el;
			el.hide();
		}
		var el = eval("gt.boardPaper."+gt.data.cards.turnedCard.code);			
		gt.data.piecesEls[gt.data.cards.turnedCard.name] = el;
		el.hide();
			
		for(var i = 0; i<gt.data.cards.allCards.length; i++) {
			var card = gt.data.cards.allCards[i], 
				pos = card.position ? gt.extractMeasures(card.position) : [30,30], 
				size = card.size ? gt.extractMeasures(card.size) : [40,60], 
				color = card.color?card.color: "#ff0000";
			var cardImage = gt.tools.pieces.addPiece(gt.data.cards.allCards[i].name, 
				gt.data.cards.allCards[i].color, pos[0], pos[1], size[0], size[1], false);
			cardImage.hide();
		}
		//turned card: 
		var tcpos = gt.data.cards.turnedCard.position ? 
				gt.extractMeasures(gt.data.cards.turnedCard.position) : [30,30], 
			size = gt.data.cards.turnedCard.size ? 
					gt.extractMeasures(gt.data.cards.turnedCard.size) : [40,60];
		gt.data.cards.turnedCardImage = gt.tools.pieces.addPiece(gt.data.cards.turnedCard.name, 
				"#ff0000", pos[0], pos[1], size[0], size[1], false);
		
		gt.tools.cards.doReset();
	}, 
	
	doReset : function() {
		//alert("do reset");
		gt.data.cards.cardsInDeck = [];
		for(var i in gt.tools.pieces._pieces) {
			gt.tools.pieces._pieces[i].hide();
			gt.data.cards.cardsInDeck.push(i);			
		}
		gt.data.cards.cardsInDeck.sort(function(){ //randomize cards in deck
			return (Math.round(Math.random())-0.5); 
		});
	}, 
	_setCardTurned : function(cardName, turned) {
		if(turned) {
			var turnedImg = gt.data.cards.turnedCardEl.clone();
			
			gt.tools.pieces._pieces[cardName].hide();
		}
		else {
			
		}
	},
	doDeal: function(){
		if(!gt.data.cards.deal || gt.data.cards.deal.length<1)
			return;
		for(var i = 0; i<gt.data.cards.deal.length; i++) {
			//deal above cards of the deck
			var d = gt.data.cards.deal[i];
			//TODO: amunt
			var cardName = gt.data.cards.cardsInDeck.pop(),
				card = gt.tools.pieces._pieces[cardName],//.clone(),
				pos = gt.extractMeasures(d.position);
			
			card._gt_translateTranform = "T"+(pos[0])+","+(pos[1]);
			card.transform(card._gt_translateTranform+card._gt_scaleTransform);
			//card.translate(pos[0], pos[1]);
//			if(d.horizontal)
//				card.rotate(0.5);
			
			var bbox = card.getBBox();
//			alert(bbox.x+", "+bbox.y+", "+bbox.width+", "+bbox.height);
			card.show();
		}		
	},
	doGetCards : function(){
		alert("do get cards")
	}, 
	doShuffle : function() {
		alert("doShuffle - TODO");
	}
};
gt.tools.cards = gt_tools_cards;


/** a cutom tool (plugin) example : mouseCoords */
var gt_tools_mouseCoords = {                        
	name: "mouseCoords",
	description: "a tool that shows absolute and percentual position "+
		"of a point in the board on mouse click",	
	/**this method will be called by the frameowork for loading the tool, 
	 * In this method the tools should create the markup in the
	 * parent, register event listeners, etc. 
	 * the tool shoud *append* a new element to the parrent.
	 *  	
	 * @param parentEl - is a dom object or an id or jquery selector for this 
	 * tool dom parent */		
	init : function(parentEl) {
		 //create an check box that will be our only tool control. 
		$(parentEl).append("<input type=\"checkbox\" id=\"mouse-coords-tool-button\">get click board coords</input>");
		//add a mouse click listener in the paper
		$("#trivia-paper").click(gt.tools.mouseCoords._mouseCoordsMouseHandler);
	},	
	/** this function indicates if this tool shoud be showed according to a game's data. 
	 * This method will be called at least one, so this way the tool can define custom 
	 * game's configuration for indicating if tool should be enabled, or passing other data. */
	isEnabled : function(data) {
		return data.mouseCoordsToolEnabled;
	},
	/** internal mouse click handler */
	_mouseCoordsMouseHandler : function(e) {
		//if the checkbox is checked, then show click's  coordinates
		if($("#mouse-coords-tool-button:checked").size()>0) {
			var pos = gt.getPositionFromEvent(e), 
				posPercent = gt.getPointPercent(pos);
			var s = "Click position in the board:\n"+
				"absolute: "+pos[0]+","+pos[1]+"\n"+
				"percentual: "+posPercent[0]+"%,"+posPercent[1]+"%";
			alert(s);
		}		
	}		
};
gt.tools.mouseCoords = gt_tools_mouseCoords;//end of mouseCoords plugin 
	