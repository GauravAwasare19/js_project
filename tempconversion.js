
document.getElementById("submitbutton").onclick= function()
{
    let temp;

    if(document.getElementById("cbutton").checked)
    {
        temp = document.getElementById("textbox").value;
        temp = Number(temp);
        temp = tocelcius(temp);
        document.getElementById("templabel").innerHTML = temp + "C";
    }
    else if(document.getElementById("fbutton").checked)
    {
        temp = document.getElementById("textbox").value;
        temp = Number(temp);
        temp = tofahrenheit(temp);
        document.getElementById("templabel").innerHTML = temp + "F";
    }
    else
    {
        document.getElementById("templabel").innerHTML = "Select unit";
    }




function tocelcius()
{
    return (temp - 32) * (5/9);
}
function tofahrenheit()
{
    return temp* 9/5 +32;
}
}