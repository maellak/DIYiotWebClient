function diy_tools () {

        var diy__hostname = "arduino.os.cs.teiath.gr";
        this.https_url = "https://"+diy__hostname;
        this.wss_url = "wss://"+diy__hostname;
        this.client_id = "user";
        this.client_secret = "password";
        this.device = "";
        this.diy_editor = {};   	// editor instance
        this.diy_editor_properties= {};	// properties for editor instance
        this.editor_filemode = "";	// filemode    sketch / lib


}
// ***GIT*** 
// ***GitGit*** 
// var data="grant_type=client_credentials&client_id="+username+"&client_secret="+password;
/*
 * get token from server
 * return access_token
 */
/*
diy_tools.prototype.getToken = function()  {
    	var subject = this;
	$.ajax({
		type: "POST",
		url: this.https_url+'/api/token',
		dataType: "json",
		data: {
			'grant_type': 'client_credentials', 
			'client_id': this.client_id, 
			'client_secret': this.client_secret
		},
		success: function(response) {
			//var result = $.parseJSON(response);
			var result = response;
			return result.access_token;
		},
		error: function(response) {
			var result =  $.parseJSON(response);
			return result;
			console.log(response);
		}
	});
}

*/
                   // Create Base64 Object
diy_tools.prototype.base64 = function()  {
                                 return  Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
}
		   
diy_tools.prototype.getToken = function()  {
    	var subject = this;
	return $.ajax({
		type: "POST",
		url: this.https_url+'/api/token',
		dataType: "json",
		data: {
			'grant_type': 'client_credentials', 
			'client_id': this.client_id, 
			'client_secret': this.client_secret
		}
	});
}

/*
 * open wss 
 * required access_token
 * return wss connection 
 */
diy_tools.prototype.wss_connect = function()  {
    	var subject = this;
	var conn = new ab.Session(this.wss_url+'?access_token='+this.access_token,
		function() {
			var device = new Object();
			device.access_token = subject.access_token;
			device.name = subject.device;
			devicestr = JSON.stringify(device);
			conn.subscribe(subject.device, function(topic, data) {
				//console.log('device data:"' + topic + '" : ' + data);
				$( "#dataDev" ).append( data.data + "<br>" );
			});
		},
		function() {
			console.warn('WebSocket connection closed');
		},
		{
			'skipSubprotocolCheck': true
		}
	);
}

/*
 * get devices from server
 * required access_token
 * return user devices 
 */
diy_tools.prototype.getDevices = function()  {
    	var subject = this;
	return $.ajax({
		type: "GET",
		url: this.https_url+'/api/devices',
		dataType: "json",
		data: {
			'access_token': this.access_token
		}
	});
}


/*
 * compile
 * required access_token
 * device
 * srcfile
 * filename
 * comp
 * writedevice
 * return user devices 
 * srclib optional
 */
diy_tools.prototype.compile = function()  {
    	var subject = this;
	return $.ajax({
		type: "POST",
		url: this.https_url+'/api/compile',
		dataType: "json",
		data: {
			'access_token': this.access_token,
			'device': this.device,
			'srcfile': this.srcfile,
			'srclib': this.srclib,
			'filename': this.filename,
			'comp': this.comp,
			'writedevice': this.writedevice
		}
	});
}

diy_tools.prototype.editor = function(str,nr,filename)  {
  var editordom=nr;
    this.diy_editor_properties['diy_code_'+editordom+'_'+this.editor_filemode]={};
    this.diy_editor_properties['diy_code_'+editordom+'_'+this.editor_filemode]["name"]=filename;
  $("#"+editordom).append('<div id="diy_div_'+editordom+'"><textarea id="diy_code_'+editordom+'" name="'+this.editor_filemode+'" class="diy_code"  cols="150" rows="50"></textarea></div>');
    this.diy_editor['diy_code_'+editordom+'_'+this.editor_filemode] = CodeMirror.fromTextArea(document.getElementById("diy_code_"+editordom), {
	mode: { 
		name: "javascript", 
		globalVars: true
	},
	lint: true,
	lineNumbers: true,
	theme: "default",
	tabMode: "indent",
	gutters: ["CodeMirror-lint-markers"],
	matchBrackets: true,
	onBlur: function(){
		editor.save();
	},
	onChange: function(){
		$("#changeimg").show();
	}, 
	extraKeys: {
		'Cmd-/' : 'toggleComment',
		'Ctrl-/' : 'toggleComment',
		"Ctrl-Space": "autocomplete",
		"F11": function(cm) {
			cm.setOption("fullScreen", !cm.getOption("fullScreen"));
		},
		"Esc": function(cm) {
			if (cm.getOption("fullScreen")) 
				cm.setOption("fullScreen", false);
			}
		},
	path: 'js/', 
	searchMode: 'inline',
	onCursorActivity: function () {
		editor.setLineClass(hlLine, null);
		hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
	}
    });
    this.diy_editor['diy_code_'+editordom+'_'+this.editor_filemode].setValue(str);
}
