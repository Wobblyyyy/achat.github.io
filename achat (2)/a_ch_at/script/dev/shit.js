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
    message = message.replace(">", "");
    var fc = message.charAt(0); message = message.replace(fc);
    var p = 0; var m = "";
    while (p !== message.length)
    {
        if (message.charAt(p) == "x")
        {
            break;
        }
        else
        {
            m = m + message.charAt(p);
        }
        p++;
    }
    m = m.replace("undefined", ""); /* # to use */
    alert(m);
    message = message.replace(m + "x", "");
    switch (fc)
    {
        case "s":
            {
                break;
            }
        case "l":
            {
                break;
            }
        case "r":
            {
                break;
            }
        default:
            {
                break;
            }
    }
}
else if (message.charAt(0) == "<")
{
    alert("yay");
    printSystemMessage("jfddddddddd");
    message = message.replace("<", "");
    eval(message);
}
else
{
    /* Regular message */
    ev("handl"); /* default */
}