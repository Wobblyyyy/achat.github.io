$(document).ready(function () 
{
  $("#errorscreen").fadeOut(0);
  $("#purchased").fadeOut(0);
  var balance = 0;
  var initValue;
  var currentUsername = Cookies.get("currentUsername");
  firebase.database().ref("users/" + currentUsername + "/tokens").on("value", function (snapshot)
  {
    balance = snapshot.val();
  });
  firebase.database().ref("users/" + currentUsername + "/colors").once("value", function(snapshot)
  {
    snapshot.forEach(function(child)
    {
      $("#" + child.key).html('<b style="color:green;">owned</b>').prop("disabled", true);
    });
  });
  function refreshBalance()
  {
    firebase.database().ref("users/" + currentUsername + "/tokens").once("value", function (snapshot) 
    {
      balance = snapshot.val();
      $("#currentBalance").html(balance + '<i class="fa fa-usd"></i>');
    });
  }
  refreshBalance();
  function subtract(number)
  {
    if (balance >= number)
    {
      alert("can buy");
      firebase.database().ref("users/" + currentUsername + "/tokens").set(balance - number);
      return true;
    }
    else
    {
      showErrorMessage((balance - number) * -1);
      $("#mainscreen").fadeOut(500);
      $("#errorscreen").fadeIn(700);
      return false;
    }
  }
  var permission = 
  {
    addColor: function(color)
    {
      var owned = "";
      firebase.database().ref("users/" + currentUsername + "/colors/" + color).once("value", function (snapshot)
      {

        $("#cc_" + color).fadeIn(0);

        owned = snapshot.val();
      
        if (owned !== "1")
        {
          firebase.database().ref("users/" + currentUsername + "/colors/" + color).set("1");
          $("#mainscreen").fadeOut(500);
          $("#purchased").fadeIn(700);
          refreshBalance();
        }
        else
        {
          firebase.database().ref("users/" + currentUsername + "/tokens").set(balance);
          $("#mainscreen").fadeOut(500);
          $("#errorscreen").fadeIn(700);
          $("#errormsg").html("you already own that item!");
          refreshBalance();
        }
      });
    }
  }
  function showErrorMessage(short)
  {
    $("#errormsg").html("you are " + short + " tokens short");
  }
  $("#hideerrorscreen").click(function ()
  {
    $("#errorscreen").fadeOut(500);
    setTimeout(function() { $("#mainscreen").fadeIn(500) }, 500);
  });
  $("#hidepurchasedscreen").click(function ()
  {
    $("#purchased").fadeOut(500);
    setTimeout(function() { $("#mainscreen").fadeIn(500) }, 500);
  });
  $("#blue").click(function () 
  {
    if (subtract(3000)) permission.addColor("blue");
  });
  $("#green").click(function () 
  {
    if (subtract(3500)) permission.addColor("green");
  });
  $("#red").click(function () 
  {
    if (subtract(5000)) permission.addColor("red");
  });
  $("#orange").click(function () 
  {
    if (subtract(9000)) permission.addColor("orange");
  });
  $("#closeshop").click(function ()
  {
    $("#shoppage").fadeOut(1000);
    setTimeout(function(){ $("#mainpage").fadeIn(1000); }, 1000);
  });
});