angular.module("story", [])
  .controller("storyController",
    function($scope){

      window.s = $scope;

      // Keep the step number
      $scope.step = 0;

      // Store the cart
      $scope.cart = [];

      // Get the foods as json data
      $.getJSON("js/story.json", function(data){
        // $scope.bio = data.bio;
        $scope.story = data["story"];
        console.log(data["shopping-cart-items"]);
        $scope.cart = data["shopping-cart-items"]
        $scope.cart.forEach(function(foodItem) {
          foodItem.deleted = false;
        });
        $scope.currentStep = $scope.story["intro"];
        $scope.showCart = false;
        $scope.currentFood = null;
        $scope.$apply();
      });

      $scope.goToStep = function(stepName) {
        if ($scope.currentFood) {
          $scope.currentFood = null;
        }
        $scope.currentStep = $scope.story[stepName];
        $scope.showCart = (stepName === "shopping-cart");
        console.log(stepName);
        console.log($scope.showCart);
        $("body").animate({ scrollTop: $('body')[0].scrollHeight}, 1000);
      }

      $scope.goToFoodItem = function(foodItem) {
        $scope.currentFood = foodItem;
        // console.log(foodItem);
      }

      $scope.goToCart = function() {
        $scope.goToStep("shopping-cart");
      }

      $scope.removeFoodItem = function(foodItem) {
        var index = $scope.cart.indexOf(foodItem);
        $scope.cart[index].deleted = true;
        $scope.goToStep("shopping-cart");
      }

      $scope.addFoodItem = function(foodItem) {
        var index = $scope.cart.indexOf(foodItem);
        $scope.cart[index].deleted = false;
        $scope.goToStep("shopping-cart");
      }

      // Calculate the total
      $scope.totalCost = function(){
        return $scope.cart
            .filter(function(item){
              return item.price && !item.deleted;
            })
            .reduce(function(prev, next){
              prev + (next.price ); // TODO add quantity
            }, 0)
      }

    });
