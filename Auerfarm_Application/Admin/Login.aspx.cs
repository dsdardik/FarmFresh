using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Configuration;

namespace Auerfarm_Application
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ValidateUser(object sender, EventArgs e)
        {
            if(Login1.UserName == "Aueradmin" && Login1.Password == "Trump2016")
            {
                FormsAuthentication.RedirectFromLoginPage(Login1.UserName, Login1.RememberMeSet);
            }
            else
            {
                Login1.FailureText = "Invalid Administration Account";
            }
        }
    }
}