using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AdminPage.Startup))]
namespace AdminPage
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
