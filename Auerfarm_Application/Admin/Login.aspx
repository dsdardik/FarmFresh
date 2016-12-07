<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Auerfarm_Application.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="../Content/login.css" rel="stylesheet" />
    <title></title>
</head>
<body class="main-body">
    <div class="login">
        <form id="form1" runat="server">
        <div>
        <asp:Login ID = "Login1" runat = "server" OnAuthenticate= "ValidateUser"></asp:Login>
        </div>
        </form>
    </div>
</body>
</html>
