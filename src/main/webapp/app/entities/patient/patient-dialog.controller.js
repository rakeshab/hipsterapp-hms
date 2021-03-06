(function() {
    'use strict';

    angular
        .module('hospitalManagementApp')
        .controller('PatientDialogController', PatientDialogController);

    PatientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Patient', 'District', 'State', 'Country'];

    function PatientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Patient, District, State, Country) {
        var vm = this;

        vm.patient = entity;
        vm.clear = clear;
        vm.save = save;
        vm.districts = District.query();
        vm.states = State.query();
        vm.countries = Country.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.patient.id !== null) {
                Patient.update(vm.patient, onSaveSuccess, onSaveError);
            } else {
                Patient.save(vm.patient, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('hospitalManagementApp:patientUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
