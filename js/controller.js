var app = angular.module('gridgmaeApp',['ui.bootstrap']);

app.controller('gridgameCtrl', function($scope, $interval , $uibModal) {

    $scope.shuffleArray =function(array){
        for (var i =0; i<array.length; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i].imageIndex;
            array[i].imageIndex = array[j].imageIndex;
            array[j].imageIndex = temp;
        }
        return array;
    }
    $scope.allcolors = [];
    $scope.timer;
    $scope.setup = function(){
        $scope.colors = ['grey', 'white', 'brown', 'blue'];
        for(var i=0; i<16;i++){
            $scope.allcolors.push({
                Visible: false,
                Matched: false,
                gridIndex: i,
                imageIndex: (i+1) % 4
            });
        }
        $scope.allcolors = $scope.shuffleArray($scope.allcolors);
        $scope.scoreMatch = 0;
        $scope.timeOut = 60;
    }
    $scope.updateTime =function(){
        console.log($scope.timeOut);
        if($scope.timeOut >0){
            $scope.timeOut--;
        }
        else{
            console.log("here");
            alert("Time Out! Please try again later.");
        }
    }
    $scope.addColor = function(grid){
        console.log(grid);
        console.log($scope.allcolors);
        var selectedGrids = $scope.allcolors.filter(function(x){
            return x.Visible && !x.Matched? true: false;
        });
        if(selectedGrids.length > 1){
            console.log("am here");
            selectedGrids.forEach(function(x){
                console.log(x);
                $scope.allcolors[x.gridIndex].Visible = false;
            });
            $scope.allcolors[grid.gridIndex].Visible = true;
        }
        else {
            $scope.allcolors[grid.gridIndex].Visible = true;
            if(selectedGrids.length === 1) {
                console.log("here");
                if(selectedGrids[0].imageIndex === grid.imageIndex) {
                    $scope.allcolors[selectedGrids[0].gridIndex].Matched = true;
                    $scope.allcolors[grid.gridIndex].Matched = true;  
                    $scope.scoreMatch ++;
                    if($scope.scoreMatch == 8){
                        $uibModal.open({
                            templateUrl: "winPopup",
                            size: "sm"
                        });
                        $interval.cancel($scope.timer);
                    }
                }
            }
            else{
                console.log("not matched"); 
            }
        }
    }
    $scope.startGmae = function(){
            $scope.hideDiv = true;
            $scope.timer = $interval($scope.updateTime, 1000);
    };
    $scope.tiles = $scope.setup($scope.colors);

});
	
