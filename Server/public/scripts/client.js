let myApp = angular.module('myApp', []);

myApp.controller('MessagesController', function($http){
    vm = this;
    vm.messages = [];
    getMessages();

    function getMessages(){
        console.log('in getMessages');
        $http({
            method: 'GET',
            url: '/messages'
        }).then(function(response){
            console.log('back from server with', response.data);
            vm.messages = response.data;
        }).catch(function(error){
            console.log('GET Error:', error);
            alert('unable to get data from server');
        });
    };

    vm.addMessage = function(messageToAdd){
        console.log('adding message to server:', messageToAdd);
        $http({
            method: 'POST',
            url: '/messages',
            data: messageToAdd
        }). then(function(response){
            console.log('response from POST', response);
            clearInputs();
            getMessages();
        }).catch(function(error){
            console.log('POST error', error);
            alert('error with POST');
        });
    }

    function clearInputs(){
        vm.messageToAdd.name = '';
        vm.messageToAdd.message = '';
    };
})