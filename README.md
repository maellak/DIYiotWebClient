# DIYiotWebClient

Web Interface για τη χρήση του Rest API και εργαλείων του DIYiotServer


## To DIYiotWebClient παρέχει

Web Interface για 
- Network-enabled Arduino
- Over-the-air/on-the-fly programming
- Online monitoring & real-time data streaming

## How to Use It

### Download
You can use the DIYiotWebClient code AS-IS!  No need to build or recompile--just clone this repo and use the files.  

### Config

Follow these steps:

1. install apache 

 1.1 creating a virtual host 

	DocumentRoot "path to web dir"   (step Download)
	ServerName [Your Server Name]

	<Directory "path to web dir">
		Options -Indexes
		AllowOverride All
		Require all granted
	</Directory>

 1.2 restart httpd

2. open in browser


Happy Coding :-)


# License
	See LICENSE
