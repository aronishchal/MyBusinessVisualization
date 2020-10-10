# MyBusinessVisualization
Simple Javascript webapp to visualize data points on a map 

<h2>Introduction</h2>
This is a simple Javascript webapp to visualize Business Entities on a map which with a name and address.<br/>
This was built using JQuery and Openlayers.<br><br>
The Business Entity Service is a prerequisite - https://github.com/aronishchal/MyBusinessService.<br>
Business Entities to be visualized can be added as per the README there.

<h2>Usage</h2>
Get a MapTiler API key at https://www.maptiler.com/cloud/ and replace "insert_your_key_here" in index.html with your own key (keep the single quotes intact):

`var apiKey = 'insert_your_key_here';`

Deploy to a webserver and open on a browser.