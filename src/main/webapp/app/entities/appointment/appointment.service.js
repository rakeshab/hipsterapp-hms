(function() {
    'use strict';
    angular
        .module('hospitalManagementApp')
        .factory('Appointment', Appointment);

    Appointment.$inject = ['$resource', 'DateUtils'];

    function Appointment ($resource, DateUtils) {
        var resourceUrl =  'api/appointments/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
