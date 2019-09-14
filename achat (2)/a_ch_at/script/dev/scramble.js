var message = $("#chatbox").val().replace(/(\r\n|\n|\r)/gm, "");
if (message.charAt(0) == "/") /* encryptor */
{
    var list = ["Am",
                "Bm",
                "Cm",
                "Dm",
                "Em",]
    var rand = Math.floor(Math.random() * list.length);
    var selected = list[rand];
    $("#chatbox").val("₴" + selected + CryptoJS.AES.encrypt(message.replace("/", ""), selected));
    initSend();
}
else /* regular */
{
    switch(message)
    {
        case ",clear":
            {
                $("#divc").html("");
                printSystemMessage("Cleared chat");
                break;
            }
        case ",mute":
            {
                /* mute toggle */
                break;
            }
        default:
            {
                upload(message);
                break;
            }
    }
}

// Min
// var message=$("#chatbox").val().replace(/(\r\n|\n|\r)/gm,"");if("/"==message.charAt(0)){var list=["Am","Bm","Cm","Dm","Em"],rand=Math.floor(Math.random()*list.length),selected=list[rand];$("#chatbox").val("₴"+selected+CryptoJS.AES.encrypt(message.replace("/",""),selected)),initSend()}else switch(message){case",clear":$("#divc").html(""),printSystemMessage("Cleared chat");break;case",mute":break;default:upload(message)}