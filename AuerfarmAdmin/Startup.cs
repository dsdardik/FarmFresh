using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AuerfarmAdmin.Startup))]
namespace AuerfarmAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
