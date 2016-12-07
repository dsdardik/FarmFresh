using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(iOS.Startup))]
namespace iOS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}
