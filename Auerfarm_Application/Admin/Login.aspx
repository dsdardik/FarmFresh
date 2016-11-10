<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Auerfarm_Application.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body style="background: url('/Content/barn_background.jpg') no-repeat center center">
    <form id="form1" runat="server">
    <div>
    <asp:Login ID = "Login1" runat = "server" OnAuthenticate= "ValidateUser"></asp:Login>
    </div>
    </form>
</body>
</html>
