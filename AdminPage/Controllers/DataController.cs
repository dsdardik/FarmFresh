using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Net.Http;

namespace AdminPage.Controllers
{
    public class DataController : ApiController
    {
        [EnableCors(origins: "http://localhost:52770", headers: "*", methods: "*")]
        public HttpResponseMessage Post()
        {
            return new HttpResponseMessage()
            {
                Content = new StringContent("POST: Test message")
            };
        }
    }
}