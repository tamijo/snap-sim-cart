var app = angular.module("story", []);
app.controller("storyController",
    function($scope){

      window.s = $scope;

      // Keep the step number
      $scope.step = 0;

      // Store the cart
      $scope.cart = [];

      // Get the foods as json data
      $.getJSON("data/story_cart_2.json", function(data){
        // $scope.bio = data.bio;
        $scope.story = data["story"];
        console.log(data["shopping-cart-items"]);
        $scope.cart = data["shopping-cart-items"]
        $scope.cart.forEach(function(foodItem) {
          foodItem.deleted = false;
        });
        $scope.currentStep = $scope.story["intro"];
        $scope.showCart = false;
        $scope.showBudget = false;
        $scope.currentFood = null;
        // $scope.currentBalance = $scope.totalCost();
        $scope.$apply();

      });

      $scope.goToStep = function(stepName) {
        if ($scope.currentFood) {
          $scope.currentFood = null;
        }
        $scope.currentStep = $scope.story[stepName];
        $scope.showCart = (stepName === "shopping-cart");
        // only change once
        if (stepName === "shopping-cart") {
          $scope.showBudget = true;
        }
        console.log(stepName);
        console.log($scope.showCart);
        // $("body").animate({ scrollTop: $('body')[0].scrollHeight}, 1000);
      }

      $scope.goToFoodItem = function(foodItem) {
        $scope.currentFood = foodItem;
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
              return (item.price * item.quantity) && !item.deleted;
            })
            .reduce(function(prev, next){
              return prev + (next.price * next.quantity); // TODO add quantity
            }, 0)
      }

      $scope.budget = 86.2;

});

app.directive('animateOnChange', function($animate) {
  console.log($animate);
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {
        if (nv!== ov) {
          var c = "animated fadeIn";
          $animate.addClass(elem,c);
          window.setTimeout(function() {
            $(elem).removeClass(c);
          }, 1000);
        }
      })
  }
});
