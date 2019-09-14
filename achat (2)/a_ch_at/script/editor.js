function doShit(type, subtype)
{
  switch (type)
  {
    case 0:
      {
        if (subtype == 1)
        {
          Cookies.remove("save_download");
          Cookies.set("save_download", editor.getValue().toString(), { expires: 365 });
          alert("Save download" + editor.getValue());
          alert(Cookies.get("save_download"));
        }
        else
        {
          Cookies.set("save_upload", editor.getValue(), {expires: 365});
        }
        break;
      }
    case 1:
      {
        if (subtype == 1)
        {
          editor.setValue(Cookies.get("save_download"));
          alert("Open download" + Cookies.get("save_download"));
          alert();
        }
        else
        {
          editor.setValue(Cookies.get("save_upload"));
        }
        break;
      }
    case 2:
      {
        if (subtype == 1)
        {

        }
        else
        {

        }
        break;
      }
    case 3:
      {
        if (subtype == 1)
        {

        }
        else
        {

        }
        break;
      }
    case 4:
      {
        if (subtype == 1)
        {
          editor.setValue(document.getElementById("download").innerHTML);
        }
        else
        {
          editor.setValue(document.getElementById("upload").innerHTML);
        }
        break;
      }
  }
}