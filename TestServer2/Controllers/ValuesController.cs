using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;

namespace TestServer2.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {


        // GET api/values/5
        public string Get()
        {
            //string connectionString = "server=localhost;port=3306;database=auerfarm;user id=root;password=''";
            string connectionString = "server=auerfarmapp.uconn.edu;port=3306;database=db0a031481316382Database;user id=db0a031481316382Database; password=pajW+j+B1HavJ1bvoRw//lZtJIGUfdEOZenGcP0eweUdJfvWGX+tPtj4wbiTwEmx";


            using (MySqlConnection cn = new MySqlConnection(connectionString))
            {
                cn.Open();
                return "success";
            }

        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
