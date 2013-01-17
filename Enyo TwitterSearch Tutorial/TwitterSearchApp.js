enyo.kind({
  name: "TwitterSearchApp",
  kind: enyo.FittableRows,
  classes: "onyx",   
style:"min-height:480px; min-width:320px;",  
components: [
	{kind: "onyx.Toolbar",  components: [
		{content: "Twitter Search", style: "padding-right:70px"},
			{kind: "onyx.Button", content: "Install", ontap: "installMe" },
							
	]},
	{ kind: "onyx.InputDecorator", style:"width:220px;", components:[
    	{ kind: "onyx.Input", name: "searchTerm", 
			placeholder: "Search on Twitter" 
		},
	]},			
		
	{kind: "onyx.Button",style:"margin-left:5px;",content: "Search", ontap: "search" },
		
    {kind: "enyo.Scroller", fit:true, components:[
		{ 
			tag: "div", style:"border:solid 1px black;", name: "tweetList"}
		]}
	],
	

  addTweet: function(inResult) {
    this.createComponent({
      kind: Tweet,
      container: this.$.tweetList,
      icon: inResult.profile_image_url,
      handle: inResult.from_user,
      text: inResult.text
    });
  },

searchOnEnter:function(inSender, inEvent){
	if (inEvent.keyCode === 13){
		
		this.search();
		return true;
	}
},
//Install function created by Francisco Jordano!
installMe: function() {
  var req = navigator.mozApps.install('http://gamehack.co.uk/test/enyo/manifest.json');
  req.onsuccess = function onsucess() {
    console.log('Yay! \o/');
  };


  req.onerror = function onerror(evt) {
    console.log('Oh crap! ' + evt.target.error.name);
  };
},

  search: function() {
    var searchTerm = this.$.searchTerm.hasNode().value;
    var request = new enyo.JsonpRequest({
        url: "http://search.twitter.com/search.json",
        callbackName: "callback"
      });

    request.response(enyo.bind(this, "processSearchResults"));
    request.go({ q: searchTerm });
  },

  processSearchResults: function(inRequest, inResponse) {
    if (!inResponse) return;
    this.$.tweetList.destroyClientControls();
    enyo.forEach(inResponse.results, this.addTweet, this);
    this.$.tweetList.render();
  }
});

var twitterSearchApp = new TwitterSearchApp();
twitterSearchApp.renderInto(document.body);




window.addEventListener('load', function init(evt) {
  document.getElementById('install').addEventListener('click', installMe);
});
