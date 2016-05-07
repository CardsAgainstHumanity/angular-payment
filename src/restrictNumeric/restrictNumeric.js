angular.module('payment.restrictNumeric', [])
    .directive('restrictNumeric', function() {
        'use strict';
        var restrictNumeric = function(e) {
            var code = e.which || e.keyCode;
            if (e.metaKey || e.ctrlKey || code === 0 || code < 33) {return;}
            if (code === 32 || !!/[\d\s]/.test(String.fromCharCode(code)) === false) {e.preventDefault();} // jshint ignore:line
        };

        return {
            restrict: 'A',
            link: function postLink(scope, element) {
                element.bind('keypress', restrictNumeric);
            }
        };
    });