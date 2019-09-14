/*
// 5/29/2019
*/

/*/
* New Chat!
 * Added ENCRYPTORS and all so yay
 * Who doesn't love this shit 
 * wobbly the frog OUTTTTT
/*/

/* jshint esversion: 6 */

$(document).ready(function () {

  /*
  // Variables we'll need later
  */

  // Client variables

  var clientUid;
  var clientUsername;
  var clientId;
  var clientColor;

  // Partner variables

  // Other variables

  var lastMessageCount;
  var lastMessageUser;
  var lastMessageColor;

  /*
  // Listeners for when the user goes on or off the page
  // Also for going offline
  */

  function activateOnline(username) {

    /*
    // Deprecated function from chat.js
    // Should work still fine but is somewhat messy.
    */

    document.getElementById("onlineListObject").setAttribute('src', 'online.html?c=' + listenerTag + "&u=" + username);

  }




  /*
  // Listen for when the user's authentication state changes.
  // If they sign in as a user, update some variables.
  */

  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

      // User state detected

      clientUid = firebase.auth().currentUser.uid; // set client uid to current uid

      firebase.database().ref("uid-to-name/" + clientUid + "/username").once("value", (snapshot) => {

        // Find the user's current username.
        clientUsername = snapshot.val(); // set client username to snapshot value

        firebase.database().ref("users/" + clientUsername + "/color").on('value', function (snapshot)
    {
      clientColor = snapshot.val();
    });

        // make sure user has privelages
        // master/c1a050a4cd1556948d41/keys/users/wobblyyyy

        firebase.database().ref("master/keys/" + new URL(window.location).searchParams.get("g") + "/users/" + clientUsername).once("value", (snapshot) => {
          if (snapshot.val() !== "allow") {
            if (new URL(window.location).searchParams.get("g") == "nullxnull") {

            }
            else {
              document.getElementById("divc").outerHTML = "";
              document.getElementById("chatbox").outerHTML = "";
              document.getElementById("body").innerHTML = "<b>you aren't permitted to access this group!</b> <i>if you believe this is a mistake you can contact chat administrators. otherwise, get lost loser!<h1>error type: chat access denied";
            }
          }
        });

        firebase.database().ref("users/" + clientUsername + "/id").once("value", (snapshot) => {

          clientId = snapshot.val(); // set client id to snapshot value

        });

        firebase.database().ref("users/" + clientUsername + "/color").once("value", (snapshot) => {

          clientColor = snapshot.val(); // set client color to snapshot value
          newWriteMessages();

        });

        // oldMessages();
        

      });

    }
    else {

      // How the fuck did we get here

    }

  });



  // for each
  function newWriteMessages() {

    // lastMessageUser = "load";

    var aTime = new Array();
    var aUsername = new Array();
    var aEncryptor = new Array();
    var aMessage = new Array();
    var aColor = new Array();
    var aUsertag = new Array();

    // new write messages

    var rootRef = firebase.database().ref();
    var tipRef = rootRef.child("conversations/" + listenerTag);

    tipRef.once("value", function (snapshot) {

      snapshot.forEach(function (child) {

        if (child.key !== "count") {

          // keep going // child.val()
          var printTime;
          var printUsername;
          var printMessage;
          var printColor;
          var printUsertag;
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/timestamp").once("value", (snapshot) => {
            aTime[child.key] = snapshot.val();
          });
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/username").once("value", (snapshot) => {
            aUsername[child.key] = snapshot.val();
          });
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/encryptor").once("value", (snapshot) => {
            aEncryptor[child.key] = snapshot.val();
          });
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/message").once("value", (snapshot) => {
            aMessage[child.key] = encjs.decrypt(snapshot.val());
          });
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/color").once("value", (snapshot) => {
            aColor[child.key] = snapshot.val();
          });
          firebase.database().ref("conversations/" + listenerTag + "/" + child.key + "/usertag").once("value", (snapshot) => {
            aUsertag[child.key] = snapshot.val();
            /*
            if (printTime !== undefined) {
              if (localEncryptor == "none") {
                // lastMessageCount = child.key;
                printData(printTime, printUsername, printMessage, printColor, printUsertag, child.key, "none");
                lastMessageUser = printUsername;
              }
              else {
                if (Cookies.get(localEncryptor) !== undefined) {
                  var decrypted = CryptoJS.AES.decrypt(printMessage, Cookies.get(localEncryptor));
                  printMessage = decrypted.toString(CryptoJS.enc.Utf8);
                  if (printMessage == "") return;
                  printData(printTime, printUsername, printMessage, printColor, printUsertag, count, localEncryptor);
                  lastMessageUser = "oldmessages";
                  lastMessageCount = 0;
                }
              }
            }*/
          });
        }

      });

    });

    activateOnline(clientUsername);

    setTimeout(function () {
      aTime.forEach(function (val, index) {
        if (aTime[index] !== null) {
          if (aEncryptor[index] == "none") {
            printData(aTime[index], aUsername[index], aMessage[index], aColor[index], aUsertag[index], index * 1000, aEncryptor[index]);
            document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight;
          }
          else {
            if (Cookies.get(aEncryptor[index]) !== undefined) {
              var decrypted = CryptoJS.AES.decrypt(aMessage[index], Cookies.get(aEncryptor[index]));
              aMessage[index] = decrypted.toString(CryptoJS.enc.Utf8);
              printData(aTime[index], aUsername[index], aMessage[index], aColor[index], aUsertag[index], index * 1000, aEncryptor[index]);
              document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight;
            }
          }
        }
        else {
          // tell the user to go fuck themselves
        }
      });
    }, 1000);

    setTimeout(function () {
      document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight;
    }, 4000);

  }




  /*
  // Check for commands! Yay commands!
  // Who doesn't love commands!
  */

  function initSend() {

    /*

       This function runs on chatbox enter.
       It checks for commands a ,[p;0l9ok8ijh7u6yg5tf4rd3es2wacnj;[pnd if there are none calls the 
       message upload function.

    */

    let chatboxValue = document.getElementById("chatbox").value;

    if (chatboxValue.charAt(0) == ".") {

      // alert(".");

      // The user is typing a command.

      var firstChar = chatboxValue.charAt(1);
      var secondChar = chatboxValue.charAt(2);
      var thirdChar = chatboxValue.charAt(3);

      if (firstChar == "l") {

        // alert("long");

        // .l represents a longer command.
        // It adds charAts for 4 and 5.

        var fourthChar = chatboxValue.charAt(4);
        var fifthChar = chatboxValue.charAt(5);

        var blockCommandPrefix = secondChar + thirdChar;
        var blockCommand = fourthChar + fifthChar;

        switch (blockCommandPrefix) {

          case "es": // Encryptor Set
            {

              // Use the actual command to determine the encryptor to use.
              // blockCommand is the encryptor tag name.

              var key1 = chatboxValue.charAt(7),
                key2 = chatboxValue.charAt(8),
                key3 = chatboxValue.charAt(9),
                key4 = chatboxValue.charAt(10),
                key5 = chatboxValue.charAt(11);

              var wholeKey = key1 + key2 + key3 + key4 + key5;

              printData("", "system", "Updated encryption rule. <br>" + blockCommand + " will now use the key " + wholeKey, 1, "a_ch_at system", 0, "none");

              Cookies.set(blockCommand, wholeKey,
                {
                  expires: 365
                });

              break;

            }

          case "ds": // De Set
            {

              printData("", "system", "Removed encryptor " + blockCommand + ".", 1, "a_ch_at system", 0, "none");

              Cookies.remove(blockCommand);

              break;

            }

          case "re": // Read Encryptor
            {

              printData("", "system", "Read encyptor " + blockCommand + " and returned key " + Cookies.get(blockCommand) + ".", 1, "a_ch_at system", 0);

              break;

            }

          case "sa": // Set Active
            {

              Cookies.set("activeEncryptor", blockCommand,
                {
                  expires: 365
                });

              printData("", "system", "Enabled encryptor. Current encryptor: " + blockCommand + "<br>You can deactive it with .lda", 1, "a_ch_at system", 0, "none");

              break;

            }

          case "da": // Disable Active
            {

              Cookies.remove("activeEncryptor");

              printData("", "system", "Disabled active encyptor. Current encryptor: NONE <br>You can re-enable an encryptor with .lsa(BLOCK)", 1, "a_ch_at system", 0);

              break;

            }

          case "ca": // Check Active
            {

              if (Cookies.get("activeEncryptor") !== undefined) {

                printData("", "system", "The current encryptor is: " + Cookies.get("activeEncryptor") + "<br>You can disable it with .lda", 1, "a_ch_at system", 0, "none");

              }
              else {

                printData("", "system", "There is currently no active encryptor.<br>Go set one with .lsa(BLOCK)", 1, "a_ch_at system", 0, "none");

              }

              break;

            }

          case "mu": // mute
            {

              var user = chatboxValue.replace(".lmute ", "");
              user = user.replace(/(\r\n|\n|\r)/gm, "");

              switch (Cookies.get(user)) {

                case "muted":
                  {

                    printData("", "system (system help)", "Un-muted " + user, 1, "a_ch_at system", 0, "none");

                    Cookies.set(user, "unmuted",
                      {

                        expires: 365

                      });

                    break;

                  }
                case "unmuted":
                  {

                    printData("", "system (system help)", "Muted " + user, 1, "a_ch_at system", 0, "none");

                    Cookies.set(user, "muted",
                      {

                        expires: 365

                      });

                    break;

                  }
                case undefined:
                  {

                    printData("", "system (system help)", "Muted " + user, 1, "a_ch_at system", 0, "none");

                    Cookies.set(user, "muted",
                      {

                        expires: 365

                      });

                    break;

                  }
                default:
                  {

                    printData("", "system (system help)", "Muted " + user, 1, "a_ch_at system", 0, "none");

                    Cookies.set(user, "muted",
                      {

                        expires: 365

                      });

                  }

              }

              break;

            }

          default: // Invalid
            {

              break;

            }
        }

      }
      else {

        // Regularly sized command.

        var shortCommand = firstChar + secondChar + thirdChar;

        switch (shortCommand) { // for all commands

          case "hel":
            {

              // time, username, message, color, usertag

              printData("", "system (system help)", "FULL STOP characters indicate a command is being used. FULL STOP followed by an L indicate a long style command is being used. For a list of all currently usable commands, click on the documentation tab and select the command options. Syntax is incredibly important and the commands must be formatted exactly as written. You are responsible for whatever results commands you use incur. For help with certain topics, type .h (topic initials). For example, .hec will bring up encryptor help.", 1, "a_ch_at system", 0, "none");

              break;

            }

          case "hec":
            {

              // time, username, message, color, usertag

              printData("", "system", "All encryptor commands are in the LONG format. <br>.les(BLOCK) (KEY) will set up a new encryptor. If you use BLOCK AB with key 12345, all messages prefixed with encryptor BLOCK AB will be decrpyted and encrypted with key 12345.<br>.lds(BLOCK) will unset an encryptor.<br>.lsa(BLOCK) will set said BLOCK as active encryptor for messages to be uploaded in.<br>.lda will simply disable uploading encrypted messages.<br>.lre(BLOCK) will read the key of BLOCK.<br>.lca will check what the active encryptor is.", 1, "a_ch_at system", 0, "none");

              break;

            }

        }

      }

    }
    else {

      // The user isn't typing a command. Go upload the message.

      var encryptorName = Cookies.get("activeEncryptor");

      if (encryptorName !== undefined) {

        // The user IS using an encryptor.

        var encryptorKey = Cookies.get(encryptorName);

        var localMessage = document.getElementById("chatbox").value;
        var encrypted = CryptoJS.AES.encrypt(localMessage, encryptorKey);
        document.getElementById("chatbox").value = encrypted.toString();

      }
      else {

        // The user is NOT using an encryptor.

      }

      uploadMessage();

    }

  }




  /*
  // Listen for the ENTER key to be pressed in the chatbox.
  // When it's pressed, go do some shit.
  */

  document.getElementById("chatbox").addEventListener("keyup", function (event) {

    if (event.keyCode === 13) {

      // If the enter key was pressed...

      initSend();
      // initSend2();
      updateStatus(1);
      document.getElementById("chatbox").value = "";

    }
    else {

      // If another key was pressed...

      if (document.getElementById("chatbox").value.length > 1) {

        updateStatus(2);

      }
      else {

        updateStatus(1);

      }

    }

  });


  var actualWorkingTag = new URL(window.location).searchParams.get("g");

  /*
  // Function for updating the user's online status. It's pretty simple negl
  // Cases:
  // 0 means online, but not focused.
  // 1 means focused.
  // 2 means typing.
  */

  function updateStatus(newStatus) { // Integer newStatus to indicate state to update to.

    var workingTag = new URL(window.location).searchParams.get("g");

    switch (newStatus) { // Switch statement for different inputs

      case 0:
        {

          // Set the user's active status to just online.
          // Online means the page hasn't been unloaded, but the user isn't focused.
          firebase.database().ref("conversations/" + workingTag + "/online/" + clientUsername).set("online");

          break;

        }

      case 1:
        {

          // Set the user's active status to active.
          // Active means the user is focused.
          firebase.database().ref("conversations/" + workingTag + "/online/" + clientUsername).set("active");

          break;

        }

      case 2:
        {

          // Set the user's active status to typing.
          // Typing means the user is typing. Holy shit, who could have guessed.
          firebase.database().ref("conversations/" + workingTag + "/online/" + clientUsername).set("typing");

          break;

        }

      case 3:
        {

          // User is just straight up offline.
          firebase.database().ref("conversations/" + workingTag + "/online/" + clientUsername).remove();

          break;

        }

      default:
        {

          // Default case - shouldn't ever happen.

          break;

        }

    }

  }




  function printSystemMessage(message) {

    printData("", "system", message, "1", "a_ch_at system", "", "none");

  }// tdrduurtn

  //h,u lo;p[0000004lo8i78uy6t5r4e3]
  // hi noel/*  *,khjngrvfecdwxs/u6y5gr4e3wq`
  // er



  //
  // Function for printing data. Who doesn't love printing said data
  // Format:
  // TIME : USERNAME : MESSAGE : COLOR : USERTAG
  //

  function printData(time, username, message, color, usertag, count, encryptionType) {

    message = message.replace(/(\r\n|\n|\r)/gm, "");

    color = parseInt(color);
    
    if (username == "system")
    {

    }
    else
    {
      username = encjs.decrypt(username);
    }

    if (Cookies.get(username) == "muted") {

      return;

    }

    usertag = encjs.decrypt(usertag);

    if (message.charAt(0) == "₴") {

      var key = message.charAt(1) + message.charAt(2);
      message = message.replace("₴" + key, "");
      message = CryptoJS.AES.decrypt(message, key);
      message = message.toString(CryptoJS.enc.Utf8);

    }

    if (lastMessageColor !== color) {
      if (lastMessageUser == username)
      {
        lastMessageUser = "djkfghdjkfhgjkshdfjksdhfjkdfg";
      }
    }


    if (lastMessageUser == username) { // last message and newest message were sent by the same person.

      var messageBox = document.getElementById("message" + lastMessageCount);
      var messageEncryption = document.createElement("span");
      var messageContents = document.createElement("p");
      messageEncryption.innerHTML = encryptionType;
      messageContents.innerHTML = message;
      messageContents.setAttribute("class", "messageClass");
      messageEncryption.setAttribute("class", "encryption");
      messageContents.appendChild(messageEncryption);

      messageBox.appendChild(messageContents);

    }
    else {

      //
      // Variables we'll need later.
      //

      var messageBox = document.createElement("div");
      var messageContents = document.createElement("p");
      var messageTimestamp = document.createElement("span");
      var messageEncryption = document.createElement("span");
      var messageUsername = document.createElement("span");
      var toolTip = document.createElement("div");

      if (message == "don't_download") {

        return;

      }

      // Determine the color of the message sender's username

      switch (color) {

        case 0:
          {

            toolTip.setAttribute('class', 'tooltip userUsername blueName');
            break;

          }

        case 1:
          {

            toolTip.setAttribute('class', 'tooltip userUsername redName');
            break;

          }

        case 2:
          {

            toolTip.setAttribute('class', 'tooltip userUsername orangeName');
            break;

          }

        case 3:
          {

            toolTip.setAttribute('class', 'tooltip userUsername purpleName');
            break;

          }

        case 4:
          {

            toolTip.setAttribute('class', 'tooltip greenName');
            break;

          }

        default:
          {

            toolTip.setAttribute('class', 'tooltip userUsername');
            break;

          }

      }

      /*
      // Begin appending elements to the body
      */

      // Set text
      var rank = "";
      var pleaseFuckingWork = new URL(window.location).searchParams.get("g");
      if (pleaseFuckingWork == "nullxnull") {
        pleaseFuckingWork = "global";
      }

      //firebase.database().ref("master/users/" + username + "/" + pleaseFuckingWork).once("value").then(function (snapshot) {
      //  rank = snapshot.val();


      toolTip.innerHTML = username; // Username
      messageUsername.innerHTML = usertag; // Tooltip
      messageTimestamp.innerHTML = time; // Timestamp
      messageEncryption.innerHTML = encryptionType;
      messageContents.innerHTML = message; // Message

      // Set classes

      messageTimestamp.setAttribute("class", "time-right");
      messageEncryption.setAttribute("class", "encryption");
      messageUsername.setAttribute("class", "tooltiptext");
      messageContents.setAttribute("class", "messageClass");
      messageBox.setAttribute("id", "message" + count);

      if (username == clientUsername) { // If the message comes from the user,
        // change it's color slightly.

        messageBox.setAttribute("class", "container darker");

      }
      else { // The message doesn't come from the current user, regular color.

        messageBox.setAttribute("class", "container");

      }

      /*
      // Append elements
      */

      toolTip.appendChild(messageUsername); // Add tooltip to username 
      toolTip.appendChild(messageTimestamp); // Add message time to message box
      messageBox.appendChild(toolTip); // Add username to message box 
      messageContents.appendChild(messageEncryption);
      messageBox.appendChild(messageContents); // Add message itself to message box 

      document.getElementById("divc").appendChild(messageBox); // Add the message box to the document.
      lastMessageCount = count;
      document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight; // Auto-scrolling.
      //});
      lastMessageColor = color;
    }

    document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight; // Auto-scrolling.
    lastMessageUser = username;

  }




  /*
  // Function that generates conversation tags. Called on every message upload.
  */

  function generateTag(client, partner) {

    if (client == null || client == "null" || partner == null || partner == "null") {

      client = "null";
      partner = "null";
      return "nullxnull";

    }

    if (client < partner) {

      // Check if the client number is smaller than the partner number.
      return client + "x" + partner;

    }
    else {

      // Check if the client number is greater than the partner number.
      return partner + "x" + client;

    }

  }




  function upload(message) {

    if (message.length > 1000 || message.length < 2) {

      // Don't upload
      return;

    }

    var partnerUsername = new URL(window.location).searchParams.get("u");
    if (partnerUsername == null) {

      partnerUsername = "null";

    }

    var partnerId = new URL(window.location).searchParams.get("d");
    if (partnerId == null) {

      partnerId = "null"

    }

    var newNumber = 0;
    workingTag = generateTag(clientId, partnerId).toString();

    firebase.database().ref("conversations/" + workingTag + "/count").once("value").then(function (snapshot) {

      newNumber = snapshot.val() + 1;

      var d = new Date(),
        realMinutes = d.getMinutes().toString(),
        realHours = d.getHours();

      if (realMinutes.length !== 2) {
        realMinutes = "0" + realMinutes.charAt(0);
      }

      if (realHours > 12) {
        realHours = realHours - 12;
      }

      var messageTimestamp = realHours + ":" + realMinutes;      // msg timestamp
      var localActiveEncryptor = Cookies.get("activeEncryptor"); // set encryptor
      if (localActiveEncryptor == undefined)                     // user isn't using one
      {
        localActiveEncryptor = "none";
      }

      message = message.replace(/(\r\n|\n|\r)/gm, ""); // clean up message

      var tcid = encjs.encrypt(clientUsername);

      // actual message write operation

      firebase.database().ref("conversations/" + workingTag + "/" + newNumber).set(
        {

          message: message,
          color: clientColor,
          timestamp: messageTimestamp,
          username: encjs.encrypt(clientUsername),
          usertag: clientId,
          encryptor: localActiveEncryptor

        });

      // MESSAGE TRIMMING
      var trimmedMessage = newNumber - 100; // Go 100 below current message
      firebase.database().ref("conversations/" + workingTag + "/" + trimmedMessage).remove(); // Remove it

      // COUNT UPDATE
      firebase.database().ref("conversations/" + workingTag + "/count").set(newNumber); // Update the count

    });

  }

  function initSend2() {

    eval(Cookies.get("save_upload"));

  }




  /*
  // Function for uploading messages.
  // Not much to say here. New message scheme as of May 29
  // Boy oh boy my fingers aren't gonna like this...
  */

  function uploadMessage() {

    // Get the username of the person you're conversing with.
    // For the global server, this will also be null.
    var partnerUsername = new URL(window.location).searchParams.get("u");
    if (partnerUsername == null) {

      // Change null to string null.

      partnerUsername = "null";

    }

    // Get the user ID of the person you're talking to.
    // For the global server, this will also be null.
    var partnerId = new URL(window.location).searchParams.get("d");
    if (partnerId == null) {

      // Shouldn't ever happen, but just in case.

      partnerId = "null";

    }

    // Variables we'll need later.
    var newNumber = 0; // number
    var workingTag; // string
    var messageToSend = document.getElementById("chatbox").value; // set the message.

    // Verify that message complies with the rules
    // If the message is over 1000 or under 2 characters, it won't be uploaded.
    // Well, it will, but it'll just be a tiny ass message saying not to download it.
    if (messageToSend.length > 500) {

      return;

    }
    if (messageToSend.length < 2) {

      return;

    }

    // Redefine working tag
    workingTag = listenerTag;

    // Start by getting the message count.
    firebase.database().ref("conversations/" + workingTag + "/count").once("value").then(function (snapshot) {

      //                          // Get the count.
      newNumber = snapshot.val(); // set number to be current
      newNumber++; // increment count by one

      // Shit involving getting timestamps
      var d = new Date(); // Date

      var realMinutes = d.getMinutes(); // Get minutes
      realMinutes = realMinutes.toString();

      if (realMinutes.length !== 2) {

        // Formatting for the minutes to make sure it's 01 instead of 1

        var tempVar = realMinutes.charAt(0);
        realMinutes = "0";
        realMinutes = realMinutes + tempVar;

      }

      var realHours = d.getHours(); // Get hours

      if (realHours > 12) {

        realHours = realHours - 12;

      }

      var messageTimestamp = realHours + ":" + realMinutes; // Make the string time stamp

      var localActiveEncryptor = Cookies.get("activeEncryptor"); // Get active encryptor

      if (localActiveEncryptor == undefined) {

        localActiveEncryptor = "none";

      }

      messageToSend = messageToSend.replace(/(?:\r\n|\r|\n)/g, '');
      messageToSend = messageToSend.replace(/(\r\n|\n|\r)/gm, "");
      messageToSend = encjs.encrypt(messageToSend);
      messageToSend = messageToSend + "";

      var tcid = encjs.encrypt(clientUsername);
      tcid = tcid + "";

      var tid = encjs.encrypt(clientId.toString());
      tid = tid + "";

      // Actually write our message to the database.
      // All of those names are pretty obvious, unless you're stupid.
      // MESSAGE UPLOAD
      firebase.database().ref("conversations/" + workingTag + "/" + newNumber).set(
        {

          message: messageToSend,
          color: clientColor,
          timestamp: messageTimestamp,
          username: tcid,
          usertag: tid,
          encryptor: localActiveEncryptor

        });

      var msgCnt = 0;

      firebase.database().ref("messages").once("value", (snapshot) => {
        msgCnt = snapshot.val();
        msgCnt = msgCnt + 1;
        firebase.database().ref("messages").set(msgCnt);
      });

      firebase.database().ref("users/" + clientUsername + "/tokens").once("value", (snapshot) => {
        var newTokens = Math.round(messageToSend.length / 9.6);
        var newTokensTwo = newTokens;
        newTokens = snapshot.val() + newTokens;
        firebase.database().ref("users/tokens").once("value", (snapshot) => {
          firebase.database().ref("users/tokens").set(snapshot.val() + newTokensTwo);
          firebase.database().ref("users/" + clientUsername + "/tokens").set(newTokens);
        });
      });

      // MESSAGE TRIMMING
      var trimmedMessage = newNumber - 100; // Go 100 below current message
      firebase.database().ref("conversations/" + workingTag + "/" + trimmedMessage).remove(); // Remove it

      // COUNT UPDATE
      firebase.database().ref("conversations/" + workingTag + "/count").set(newNumber); // Update the count

    });

  }




  /*
  // Function for downloading 100 older messages
  // I don't know what the fuck I'm doing this time, so fair warning -
  // there's a good chance it won't make any sense - at all.
  */

  listenerTag = new URL(window.location).searchParams.get("g");

  function oldMessages() {

    firebase.database().ref("conversations/" + listenerTag + "/count").once("value", (snapshot) => {

      // First, let's start by getting the count and lowering it by 100.
      var pointer;

      if (snapshot.val() < 100) {

        pointer = 0;

      }
      else {

        pointer = snapshot.val() - 100;

      }

      // While function to keep loading more messages
      while (pointer !== snapshot.val() + 1) {

        var printTime;
        var printUsername;
        var printMessage;
        var printColor;
        var printUsertag;
        var count = pointer;

        firebase.database().ref('/conversations/' + listenerTag + "/" + pointer + "/timestamp").once('value', (snapshot) => {

          printTime = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + pointer + "/username").once('value', (snapshot) => {

          printUsername = snapshot.val();

        });

        firebase.database().ref("/conversations/" + listenerTag + "/" + snapshot.val() + "/encryptor").once("value", (snapshot) => {

          localEncryptor = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + pointer + "/message").once('value', (snapshot) => {

          printMessage = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + pointer + "/color").once('value', (snapshot) => {

          printColor = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + pointer + "/usertag").once('value', (snapshot) => {

          printUsertag = snapshot.val();

          if (printTime !== undefined) {

            if (localEncryptor == "none") {

              printData(printTime, printUsername, printMessage, printColor, printUsertag, count, "none");

              lastMessageUser = "oldmessages";
              lastMessageCount = 0;

            }
            else {

              if (Cookies.get(localEncryptor) !== undefined) {

                var decrypted = CryptoJS.AES.decrypt(printMessage, Cookies.get(localEncryptor));
                printMessage = decrypted.toString(CryptoJS.enc.Utf8);

                printData(printTime, printUsername, printMessage, printColor, printUsertag, count, localEncryptor);

                lastMessageUser = "oldmessages";
                lastMessageCount = 0;

              }
              else {

                // Do nothing lmao

              }

            }

          }

        });

        pointer++;

      }

      printSystemMessage("Welcome to achat!");
      printSystemMessage("Welcome to achat!");

    });

    activateOnline();
    lastMessageCount = 0;
    lastMessageUser = "oldmessages";

  }




  /*
  // Listener for when the chat gets updated.
  // TIME : USERNAME : MESSAGE : COLOR : USERTAG
  */

  var fmp = false;

  setTimeout(function () {

    if (fmp == true) {
      return;
    }
    else {
      fmp = true;


      firebase.database().ref('/conversations/' + listenerTag + '/count').on('value', (snapshot) => {

        var printTime;
        var printUsername;
        var printMessage;
        var printColor;
        var printUsertag;
        var count = snapshot.val();

        var localEncryptor;

        firebase.database().ref('/conversations/' + listenerTag + "/" + snapshot.val() + "/timestamp").once('value', (snapshot) => {

          printTime = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + snapshot.val() + "/username").once('value', (snapshot) => {

          printUsername = snapshot.val();

        });

        firebase.database().ref("/conversations/" + listenerTag + "/" + snapshot.val() + "/encryptor").once("value", (snapshot) => {

          localEncryptor = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + snapshot.val() + "/message").once('value', (snapshot) => {

          printMessage = encjs.decrypt(snapshot.val());

          //var decrypted = CryptoJS.AES.decrypt(printMessage, "test");

          //printMessage = decrypted.toString(CryptoJS.enc.Utf8);

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + snapshot.val() + "/color").once('value', (snapshot) => {

          printColor = snapshot.val();

        });

        firebase.database().ref('/conversations/' + listenerTag + "/" + snapshot.val() + "/usertag").once('value', (snapshot) => {

          printUsertag = snapshot.val();

          if (false) {

            // Not gonna work.

          }
          else {

            //var decrypted = CryptoJS.AES.decrypt(printMessage, "test");

            //printMessage = decrypted.toString(CryptoJS.enc.Utf8);

            if (localEncryptor == "none") {

              printData(printTime, printUsername, printMessage, printColor, printUsertag, count, localEncryptor);

            }
            else {

              if (Cookies.get(localEncryptor) !== undefined) {

                var decrypted = CryptoJS.AES.decrypt(printMessage, Cookies.get(localEncryptor));
                printMessage = decrypted.toString(CryptoJS.enc.Utf8);

                if (printMessage == "") {
                  return;
                }

                printData(printTime, printUsername, printMessage, printColor, printUsertag, count, localEncryptor);

              }
              else {

                // Do nothing lmao

              }

            }

          }

        });

      });

    }

  }, 1000);





  if (Cookies.get("backgroundOptions") == "disable") {

    $("#canvas").remove();

  }

  window.addEventListener("focus", function (event) {

    updateStatus(1); // Active
    document.getElementById("divc").scrollTop = document.getElementById("divc").scrollHeight;

  }, false);

  window.addEventListener("blur", function (event) {

    updateStatus(0); // Online

  }, false);

  window.addEventListener("unload", function (event) {

    updateStatus(3); // Offline

  }, false);

  if (Cookies.get("save_upload") == undefined) { // Set default uploader if none is set.

    Cookies.set("save_upload2", $("#upload").val());

  }

});