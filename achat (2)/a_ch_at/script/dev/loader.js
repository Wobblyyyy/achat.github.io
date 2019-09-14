var message = $("#chatbox").val().replace(/(\r\n|\n|\r)/gm, "");
function ev(m)
{
    eval(Cookies.get(m));
}
if (message.charAt(0) == "\\") 
{
    message = message.replace("\\", "");
    var fC = message.charAt(0); message = message.replace(fC, "");
    var cN = message.substring(0, 5);
    switch (fC)
    {
        case "s":
            {
                message = message.replace(cN, "");
                Cookies.set(cN, message, { expires: 365 });
                printSystemMessage("Set " + cN + " to be: " + message);
                break;
            }
        case "r":
            {
                printSystemMessage(cN + ": " + Cookies.get(cN));
                break;
            }
        case "d":
            {
                Cookies.remove(cN);
                printSystemMessage("Removed cookie " + cN);
                break;
            }
        default:
            {
                printSystemMessage("\\s[name(5 char)] value will set a cookie. <br>\\r[name(5 char)] will read. <br>\\d[name(5 char)] will delete.");
            }
    }
}
else if (message.charAt(0) == ">")
{
    /* Special case */
}
else
{
    /* Regular message */
    ev("handl"); /* default */
}