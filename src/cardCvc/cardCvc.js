/*global angular: false */
angular.module('payment.cardCvc', ['payment.service', 'payment.restrictNumeric'])
    .directive('cardCvcInput', function () {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'template/cardCvc/cardCvc.html',
            replace: true
        };
    })

    .directive('cardCvcFormatter', function () {
        'use strict';
        var restrictCvc = function (e) {
            var elm = angular.element(e.currentTarget || e.srcElement), digit, val;
            digit = String.fromCharCode(e.which || e.keyCode);
            if (!/^\d+$/.test(digit)) { return; }

            val = elm.val() + digit;
            if (val.length > 4) { e.preventDefault(); }
        };

        return {
            link: function postLink(scope, element) {
                element.bind('keypress', restrictCvc);
            }
        };
    })

    .directive('cardCvcValidator', ['payment', function (payment) {
        'use strict';
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                function validate(value) {
                    var valid = value ? payment.validateCardCvc(value) : false;
                    ngModelCtrl.$setValidity('cardCvc', valid);
                    return valid;
                }

                ngModelCtrl.$parsers.unshift(function (value) {
                    return validate(value) ? value : undefined;
                });

                ngModelCtrl.$formatters.unshift(function (value) {
                    validate(value);
                });
            }
        };
    }]);