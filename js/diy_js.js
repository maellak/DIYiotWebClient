function diy_tools () {
	var diy__hostname = "your server";
     	this.https_url = "https://"+diy__hostname;
     	this.wss_url = "wss://"+diy__hostname;
     	this.client_id = "CLIENT_ID11";
     	this.client_secret = "CLIENT_SECRET11";
     	this.device = "kittensCategory";
}

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
diy_tools.prototype.getToken = function()  {
    var subject = this;
    var dfd = $.Deferred();
    var performAjaxRequest = function() {
        return $.ajax({
                type: "POST",
                url: subject.https_url+'/api/token',
                dataType: "json",
                data: {
                    'grant_type': 'client_credentials', 
                    'client_id': subject.client_id, 
                    'client_secret': subject.client_secret
                }
        });
    }
    // If no credentials are saved show a modal dialog
    var savedUsername = localStorage.getItem("username");
    var savedPassword = localStorage.getItem("password");
    if(savedUsername == null || savedPassword == null) {
        $("<div><div><input id='username' type='text' placeholder='Username' /></div><div><input id='password' type='password' placeholder='Password' /></div></div>").dialog({
            dialogClass: "no-close",
            buttons: [
                {
                    text: "Login",
                    click: function() {
                        subject.client_id = $(this).find('#username').val();
                        subject.client_secret = $(this).find('#password').val();
                        var $this = $(this);
                        performAjaxRequest().done(function(data) {
                            // Save them in storage
                            if(typeof data.access_token != 'undefined') {
                                $this.dialog( "close" );
                                localStorage.setItem("username", subject.client_id);
                                localStorage.setItem("password", subject.client_secret);
                                dfd.resolve(data);
                            } else {
                                alert('Invalid credentials');
                            }
                        });
                    }
                }
            ]
        });
    } else {
        subject.client_id = savedUsername;
        subject.client_secret = savedPassword;
        performAjaxRequest().done(function(data) {
            if(typeof data.access_token != 'undefined') {
                dfd.resolve(data);
            } else {
                subject.client_id = null;
                subject.client_secret = null;
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                var newdfd = subject.getToken();
                newdfd.done(function(data) { dfd.resolve(data); });
            }
        });
    }
    return dfd;
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
			conn.subscribe(subject.device, function(topic, data) {
				console.log('New device view"' + topic + '" : ' + data.category);
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




