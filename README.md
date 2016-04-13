#ng-device
##Angular module to detect OS / Browser / Device

Uses user-agent to set css classes or directly usable via JS.

### Install
* Run $ bower install ng-device --save
* Add script load to HTML:`<script type="text/javascript" src=".../re-tree.js"></script>`
* Add script load to HTML:`<script type="text/javascript" src=".../ng-device.js"></script>`
* Add module to your app dependencies: `...angular.module("...", [..."ng.device"...])...`
* To add classes - add directive like so- `<div ... device-detector ...>`
* To use directly add `"device"` service to your injectors...

### device service
Holds the following properties:
* raw : object : contains the raw values... for internal use mostly.
* os : string : name of current OS
* browser : string : name of current browser
* device : string : name of current device
 
### Support
At first I added just major browser, OS, device support.
With help from mariendries,javierprovecho and crisandretta more support was added.
[The current list of supported browser,OS, device can be easily viewed in here] (https://github.com/dqmmpb/ng-device/blob/master/ng-device.js).

Pull-requests with new stuff will be highly appreciated :)

### Example

### License

[MIT License](//github.com/dqmmpb/ng-device/blob/master/license.txt)
