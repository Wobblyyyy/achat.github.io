$(document).ready(function () 
{

  if (Cookies.get("lastChat") == undefined) Cookies.set("lastChat", "nullxnull");

  $("#mainpage").fadeOut(0);
  $("#shoppage").fadeOut(0);
  setTimeout(function(){$("#mainpage").fadeIn(500);}, 2000);


  // i want cookies:(

  !function(){try{var o=console;Object.defineProperty(window,"console",{get:function(){if(o._commandLineAPI)throw"Sorry, for security reasons, the script console is deactivated on netflix.com";return o},set:function(e){o=e}})}catch(o){}}();

  $("#mainsplash").fadeOut(0);
  $("#errormsg").fadeOut(0);
  $("#rankmenu").fadeOut(0);
  $("#status").fadeOut(0);
  $("#newgroup").fadeOut(0);
  $("#leaveprompt").fadeOut(0);
  $("#groupModal").fadeOut(0);
  $("#optionspage").fadeOut(0);

  var currentUsername;
  var convotag;

  $("#submit").click(function()
  {
    $("#init").fadeOut(500);
    setTimeout(function(){ $("#mainsplash").fadeIn(500); }, 500);
  });

  $("#signout").click(function()
  {
    window.location.href = "auth/logout.html?o=homepage";
  })

  $("#member").click(function()
  {
    var name = document.getElementById("inputbox").value;
    firebase.database().ref("master/users/" + name + "/" + convotag).set("member");
    $("#updatestatus").html("updated rank of " + name + "to member.");
    $("#rankmenu").fadeOut(500);
    setTimeout(function(){ $("#status").fadeIn(500); }, 500);
    setTimeout(function(){ $("#status").fadeOut(500); }, 1500);
    setTimeout(function(){ $("#init").fadeIn(500); }, 2000);
  });

  $("#moderator").click(function()
  {
    var name = document.getElementById("inputbox").value;
    firebase.database().ref("master/users/" + name + "/" + convotag).set("moderator");
    $("#updatestatus").html("updated rank of " + name + "to moderator.");
    $("#rankmenu").fadeOut(500);
    setTimeout(function(){ $("#status").fadeIn(500); }, 500);
    setTimeout(function(){ $("#status").fadeOut(500); }, 1500);
    setTimeout(function(){ $("#init").fadeIn(500); }, 2000);
  });

  $("#admin").click(function()
  {
    var name = document.getElementById("inputbox").value;
    firebase.database().ref("master/users/" + name + "/" + convotag).set("admin");
    $("#updatestatus").html("updated rank of " + name + "to admin.");
    $("#rankmenu").fadeOut(500);
    setTimeout(function(){ $("#status").fadeIn(500); }, 500);
    setTimeout(function(){ $("#status").fadeOut(500); }, 1500);
    setTimeout(function(){ $("#init").fadeIn(500); }, 2000);
  });

  $("#owner").click(function()
  {
    var name = document.getElementById("inputbox").value;
    firebase.database().ref("master/users/" + name + "/" + convotag).set("owner");
    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).set("admin");
    $("#updatestatus").html("updated rank of " + name + "to owner. you have been demoted to admin.");
    $("#rankmenu").fadeOut(500);
    setTimeout(function(){ $("#status").fadeIn(500); }, 500);
    setTimeout(function(){ $("#status").fadeOut(500); }, 1500);
    setTimeout(function(){ $("#init").fadeIn(500); }, 2000);
  });

  $("#changerank").click(function()
  {
    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() !== "member")
      {
        $("#mainsplash").fadeOut(500);
        if (snapshot.val() == "moderator")
        {
          $("#admin").fadeOut(0);
          $("#owner").fadeOut(0);
        } else if (snapshot.val() == "admin")
        {
          $("#owner").fadeOut(0);
        }
        setTimeout(function(){ $("#rankmenu").fadeIn(500); }, 500);

    var name = document.getElementById("inputbox").value;

    firebase.database().ref("master/users/" + name + "/" + convotag).once("value", function(snapshot)
    {
      var other = snapshot.val();
      if (snapshot.val() == "owner")
      {
        $("#admin").fadeOut(0);
        firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
        {
          if (snapshot.val() == "owner")
          {
            if (other !== "owner") $("#admin").fadeIn(0);
          }
        });
      }
    });
    firebase.database().ref("master/users/" + name + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() == "owner" || snapshot.val() == "admin" || snapshot.val() == "moderator")
      {
        var other = snapshot.val();
        $("#member").fadeOut(0);
        firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
        {
          if (snapshot.val() == "owner" || snapshot.val() == "admin")
          {
            if (other !== "owner" && other !== "admin") $("#member").fadeIn(0);
          }
          if (snapshot.val() == "owner") $("#member").fadeIn(0);
        });
      }
    });
    firebase.database().ref("master/users/" + name + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() == "owner")
      {
        var other = snapshot.val();
        $("#moderator").fadeOut(0);
        firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
        {
          if (snapshot.val() == "owner" || snapshot.val() == "admin")
          {
            if (other !== "owner" && other !== "admin") $("#moderator").fadeIn(0);
          }
          if (snapshot.val() == "owner") $("#moderator").fadeIn(0);
        });
      }
    });

      }
      else
      {
        $("#mainsplash").fadeOut(500);
        setTimeout(function(){ $("#errormsg").fadeIn(500); }, 500);
        setTimeout(function(){ $("#errormsg").fadeOut(500); }, 1500);
        setTimeout(function(){ $("#mainsplash").fadeIn(500); }, 2000);
        return;
      }
    });
  });

  $("#opengroupmenu").click(function()
  {
    $("#primaryModal").fadeOut(0);
    $("#groupModal").fadeIn(0);
    document.getElementById("myModal").style.display = "block";
  });

  $("#wellFuck").click(function()
  {
    if (convotag !== "global")
    {
      firebase.database().ref("master/keys/" + convotag + "/data/name").set($("#newgroupname").val());
      document.getElementById("myModal").style.display = "none";
      location.reload();
    }   // okay well
        // at least this shit is finally working
        // time to fucking shoot myself
  });

  $("#removename").click(function()
  {
    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() == "admin" || snapshot.val() == "owner")
      {
        var name = document.getElementById("inputbox").value;
        firebase.database().ref("master/keys/" + convotag + "/users/" + name).remove();
        firebase.database().ref("master/users/" + name + "/" + convotag).remove();
        var namelist = "";
        var rootRef2 = firebase.database().ref();
        var tipRef2 = rootRef2.child("master/keys/" + convotag + "/users");
        tipRef2.once("value", function(snapshot)
        {
          snapshot.forEach(function(child)
          {
            namelist = namelist + child.key + ", ";
          });
          namelist = namelist.replace(/.$/,""); namelist = namelist.replace(/.$/,"");
          $("#groupMembers").html("<b>members</b>: " + namelist);
        });
      }
      else
      {
        $("#mainsplash").fadeOut(500);
        setTimeout(function(){ $("#errormsg").fadeIn(500); }, 500);
        setTimeout(function(){ $("#errormsg").fadeOut(500); }, 1500);
        setTimeout(function(){ $("#mainsplash").fadeIn(500); }, 2000);
        return;
      }
    });
  });

  $("#newgroupmenu").click(function(){
    $("#groupModal").fadeOut(0);
    $("#primaryModal").fadeIn(0);
    $("#info").fadeOut(0);
    $("#init").fadeOut(0);
    $("#inputbox").fadeOut(0);
    $("#newgroup").fadeIn(0);
    document.getElementById("myModal").style.display = "block";
  });

  var addGroupMember = new Array();

  $("#addtogroup").click(function()
  {
    var namevalue = document.getElementById("nameselector").value;
    var namelist = "";
    if (addGroupMember.includes(namevalue))
    {

    }
    else
    {
      addGroupMember.push(namevalue);
    }
    addGroupMember.forEach(function(element) 
    {
      namelist = namelist + element + ", ";
    });
    namelist = namelist.replace(/.$/,""); namelist = namelist.replace(/.$/,"");
    $("#currentnamelist").html(namelist);
  });

  function dec2hex (dec) 
  {
    return ('0' + dec.toString(16)).substr(-2);
  }

  // generateId :: Integer -> String
  function generateId (len) 
  {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  var lastClass = "fa-address-book";

  $("#groupicon").keyup(function()
  {
    var gicon = "fa-" + document.getElementById("groupicon").value;
    $('#iconpreview').addClass(gicon).removeClass(lastClass).removeClass("fa").removeClass("fa-lg").addClass("fa").addClass("fa-lg");
    lastClass = gicon;
  });

  $("#creategroup").click(function()
  {
    var id = generateId(20);
    var gname = document.getElementById("groupname").value;
    var gicon = document.getElementById("groupicon").value;
    if (gname == "")
    {
      $("#groupname").val("enter a group name!");
      return;
    }
    firebase.database().ref("master/groupTotal").once("value", function(snapshot)
    {
      firebase.database().ref("master/groupTotal").set(snapshot.val() + 1);
    });
    firebase.database().ref("master/users/" + currentUsername + "/" + id).set("owner");
    firebase.database().ref("master/keys/" + id + "/users/" + currentUsername).set("allow");
    firebase.database().ref("master/keys/" + id + "/data").set(
    {
      icon: gicon,
      locked: "false",
      name: gname
    });
    addGroupMember.forEach(function(element)
    {
      firebase.database().ref("master/users/" + element + "/" + id).set("member");
      firebase.database().ref("master/keys/" + id + "/users/" + element).set("allow");
    });
    document.getElementById("myModal").style.display = "none";
    // onPageLoad();
    $("#info").fadeIn(0);
    $("#init").fadeIn(0);
    $("#inputbox").fadeIn(0);
    $("#newgroup").fadeOut(0);
    document.location.reload();
  });

  $("#leavegroup").click(function()
  {
    $("#groupModal").fadeOut(0);
    $("#primaryModal").fadeIn(0);
    $("#mainsplash").fadeOut(0);
    $("#errormsg").fadeOut(0);
    $("#rankmenu").fadeOut(0);
    $("#status").fadeOut(0);
    $("#newgroup").fadeOut(0);
    $("#leaveprompt").fadeIn(0);
    $("#inputbox").fadeOut(0);
    $("#init").fadeOut(0);
    $("#info").fadeOut(0);
    document.getElementById("myModal").style.display = "block";
  });

  $("#confirmleave").click(function()
  {
    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).remove();
    firebase.database().ref("master/keys/" + convotag + "/" + currentUsername).remove();
    $("#leaveprompt").fadeOut(0);
    document.getElementById("myModal").style.display = "none";
    Cookies.remove("lastChat");
    document.location.reload();
  });

  $("#removefromgroup").click(function()
  {
    if (addGroupMember.includes(document.getElementById("nameselector").value))
    {
      addGroupMember.splice( addGroupMember.indexOf(document.getElementById("nameselector").value), 1 );
    }
    var namelist = "";
    addGroupMember.forEach(function(element) 
    {
      namelist = namelist + element + ", ";
    });
    namelist = namelist.replace(/.$/,""); namelist = namelist.replace(/.$/,"");
    $("#currentnamelist").html(namelist);
  });

  $(".goback").click(function()
  {
    $("#mainsplash").fadeOut(500);
    $("#rankmenu").fadeOut(500);
    setTimeout(function(){ $("#init").fadeIn(500); }, 500);
  })

  $("#btn").click(function()
  {
    $("#groupModal").fadeOut(0);
    $("#primaryModal").fadeIn(0);
    $("#mainsplash").fadeOut(0);
    $("#errormsg").fadeOut(0);
    $("#rankmenu").fadeOut(0);
    $("#status").fadeOut(0);
    $("#newgroup").fadeOut(0);
    $("#info").fadeIn(0);
    document.getElementById("myModal").style.display = "block";
  });

  $("#account").click(function()
  {
    $("#chat").removeClass("darkbox"); $("#extensions").removeClass("darkbox");
    $("#account").addClass("darkbox");
  });
  $("#chat").click(function()
  {
    $("#account").removeClass("darkbox"); $("#extensions").removeClass("darkbox");
    $("#chat").addClass("darkbox");
  });
  $("#extensions").click(function()
  {
    $("#account").removeClass("darkbox"); $("#chat").removeClass("darkbox");
    $("#extensions").addClass("darkbox");
  });

  $("#openoptions").click(function()
  {
    firebase.database().ref("users/" + currentUsername + "/color").once("value", function (snapshot)
    {
      var original = parseInt(snapshot.val());
      var result = "";
      switch (original)
      {
        case 0:
          {
            result = "blue";
            break;
          }
        case 1:
          {
            result = "red";
            break;
          }
        case 2:
          {
            result = "orange";
            break;
          }
        case 3:
          {
            result = "purple";
            break;
          }
        case 4:
          {
            result = "green";
            break;
          }
        case 6:
          {
            result = "black";
            break;
          }
      }
      $("#color_current").html(result);
    });
    $("#mainpage").fadeOut(1000);
    setTimeout(function(){ $("#optionspage").fadeIn(1000); }, 1000);
  });

  function changeColor(color, color2)
  {
    firebase.database().ref("users/" + currentUsername + "/color").set(color);
    $("#color_current").html(color2);
  }

  $("#cc_black").click(function()
  {
    // 6
    changeColor("6", "black");
  });
  $("#cc_green").click(function()
  {
    // 4
    changeColor("4", "green");
  });
  $("#cc_blue").click(function()
  {
    // 0
    changeColor("0", "blue");
  });
  $("#cc_red").click(function()
  {
    // 1
    changeColor("1", "red");
  });
  $("#cc_orange").click(function()
  {
    // 2
    changeColor("2", "orange");
  });
  $("#cc_purple").click(function()
  {
    // 3
    changeColor("3", "purple");
  })

  $("#goback").click(function()
  {
    $("#optionspage").fadeOut(1000);
    setTimeout(function(){ $("#mainpage").fadeIn(1000); }, 1000);
  });

  $( "#submitnames" ).click(function()
  {
    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() !== "member")
      {
        var name = document.getElementById("inputbox").value;
        firebase.database().ref("master/keys/" + convotag + "/users/" + name).set("allow");
        firebase.database().ref("master/users/" + name + "/" + convotag).set("member");
        var namelist = "";
        var rootRef2 = firebase.database().ref();
        var tipRef2 = rootRef2.child("master/keys/" + convotag + "/users");
        tipRef2.once("value", function(snapshot)
        {
          snapshot.forEach(function(child)
          {
            namelist = namelist + child.key + ", ";
          });
          namelist = namelist.replace(/.$/,""); namelist = namelist.replace(/.$/,"");
          $("#groupMembers").html("<b>members</b>: " + namelist);
        });
      }
      else
      {
        $("#mainsplash").fadeOut(500);
        setTimeout(function(){ $("#errormsg").fadeIn(500); }, 500);
        setTimeout(function(){ $("#errormsg").fadeOut(500); }, 1500);
        setTimeout(function(){ $("#mainsplash").fadeIn(500); }, 2000);
        return;
      }
    });
  });

  firebase.auth().onAuthStateChanged(function (user)
  {

    if (user)
    {

      firebase.database().ref("uid-to-name/" + firebase.auth().currentUser.uid + "/username").once("value", (snapshot) => {

        currentUsername = snapshot.val();
        Cookies.set("currentUsername", snapshot.val(), { expires: 365 });
        firebase.database().ref("master/users/" + currentUsername).on("value", function(snapshot)
        {
          onPageLoad();
        });
        // document.getElementById("currentUsernameLabel").innerHTML = snapshot.val();

      });

    }

  });

  function onPageLoad()
  {

    $("#cc_green").fadeOut(0);$("#cc_blue").fadeOut(0);$("#cc_red").fadeOut(0);$("#cc_orange").fadeOut(0);$("#cc_purple").fadeOut(0);firebase.database().ref("users/" + currentUsername + "/colors").once("value", function (snapshot){snapshot.forEach(function (child){$("#cc_" + child.key).fadeIn(0);})});

    $("#grouplist").html("");

    $("#init").fadeOut(0); $("#inputbox").fadeOut(0);

    
    var rootRef = firebase.database().ref();
    var tipRef = rootRef.child("master/users/" + currentUsername);
    tipRef.once("value", function(snapshot)
    {
      addConversation("nullxnull", "global", "globe");
      snapshot.forEach(function(child)
      {
        firebase.database().ref("master/keys/" + child.key + "/data/name").once("value", (snapshot) =>
        {
          var snapshotValue = snapshot.val();
          firebase.database().ref("master/keys/" + child.key + "/data/icon").once("value", (snapshot) =>
          {
            addConversation(child.key, snapshotValue, snapshot.val());
            if (Cookies.get("lastChat") == "nullxnull" || Cookies.get("lastChat") == "global")
            {
              $("#globalchat").addClass("darkbox");
            }
            else
            {
              $(".darkbox").removeClass("darkbox");
              $("#" + Cookies.get("lastChat")).addClass("darkbox");
            }
          });
        })
      });
    });

    $("#groupId").html("<b>group id: </b>nullxnull");
    $("#groupName").html("<b>group name: </b>global");
    $("#groupMembers").html("<b>members:</b> all users");

    setTimeout(function(){goToConvo(Cookies.get("lastChat"), Cookies.get("lastChatName"));}, 600);

  }

  $("#shop").click(function()
  {
    $("#mainpage").fadeOut(1000);
    setTimeout(function(){ $("#shoppage").fadeIn(1000); }, 1000);
    firebase.database().ref("users/" + currentUsername + "/tokens").once("value", function (snapshot) 
    {
      balance = snapshot.val();
      $("#currentBalance").html(balance + '<i class="fa fa-usd"></i>');
    });
  });

  function addConversation(conversationRef, conversationTitle, conversationIcon)
  {

    createInstance(conversationRef, "add");

    var container = document.createElement("DIV");
    conversationTitle = '<i class="fa fa-' + conversationIcon + '" aria-hidden="true"></i> ' + conversationTitle;
    var titleText = document.createElement("P");
    titleText.innerHTML = conversationTitle;

    container.setAttribute("class", "convo");
    container.id = conversationRef;

    // container.addEventListener("click", goToConvo(conversationRef), false);

    container.onclick = function () {
      goToConvo(conversationRef, conversationTitle);
    }

    container.appendChild(titleText);
    document.getElementById("grouplist").appendChild(container);

  }

  function createInstance(passedGlobalTag, mode)
  {
    if (mode == "add")
    {
      var total = '<iframe id="ins' + passedGlobalTag + '" src="chat.html?g=' + passedGlobalTag + '" style="position:absolute;height: 93vh; width: 70vw; margin-left: 15vw; outline: none; border: none;"></iframe>';
      $(total).appendTo("#mainchatbox");
      $("#ins" + passedGlobalTag).fadeOut(0).focus();
    }
    else
    {
      if ($("#ins" + passedGlobalTag).length)
      {
        $("#ins" + convotag).fadeOut(100);
        setTimeout(function(){$("#ins" + passedGlobalTag).fadeIn(100).focus();}, 100)
      }
      else
      {
        var total = '<iframe id="ins' + passedGlobalTag + '" src="chat.html?g=' + passedGlobalTag + '" style="position:absolute;height: 93vh; width: 70vw; margin-left: 15vw; outline: none; border: none;"></iframe>';
        $(total).appendTo("#mainchatbox");
      }
    }
  }

  $("#globalchat").click(function()
  {
    goToConvo("nullxnull", "global");
    $(".darkbox").removeClass("darkbox");
    $("#globalchat").addClass("darkbox");
  });

  function goToConvo(passedGlobalTag, uname) 
  {

    createInstance(passedGlobalTag, uname);

    $("#init").fadeIn(0); $("#inputbox").fadeIn(0);

    $(".darkbox").removeClass("darkbox");

    $("#" + passedGlobalTag).addClass("darkbox");

    convotag = passedGlobalTag;

    if (passedGlobalTag == "global")
    {
      passedGlobalTag = "nullxnull";
    }


      
      var namelist = "";
      $("#groupId").html("<b>group id: </b>" + passedGlobalTag);
      $("#groupName").html("<b>group name: </b>" + uname);
      var rootRef2 = firebase.database().ref();
      var tipRef2 = rootRef2.child("master/keys/" + passedGlobalTag + "/users");
      tipRef2.once("value", function(snapshot)
      {
        snapshot.forEach(function(child)
        {
          namelist = namelist + child.key + ", ";
        });
        namelist = namelist.replace(/.$/,""); namelist = namelist.replace(/.$/,"");
        $("#groupMembers").html("<b>members</b>: " + namelist);
        if (passedGlobalTag == "nullxnull") $("#groupMembers").html("<b>members</b>: all users");
      });

    firebase.database().ref("master/users/" + currentUsername + "/" + convotag).once("value", function(snapshot)
    {
      if (snapshot.val() == "member") { $("#init").fadeOut(0); $("#inputbox").fadeOut(0); }
    });

    Cookies.set("lastChat", passedGlobalTag, { expires: 365 });
    Cookies.set("lastChatName", uname, { expires : 365 });

    

  }

  // When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
  document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
}



});
