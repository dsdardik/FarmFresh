using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Net.Http;
using AdminPage.Models.DBModels;
using AdminPage.DAL;
using System.Net;
using System.Web.Script.Serialization;

namespace AdminPage.Controllers
{
    public class DataController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Get(string type)
        {
            string items = "";
            switch (type)
            {
                case "Calendar":
                case "News":
                    List<FarmInfoItem> infoItems = InfoItemOps.GetInfoItems(type);
                    items = new JavaScriptSerializer().Serialize(infoItems);
                    break;
                case "Map":
                    List<MapItem> mapItems = MapItemOps.GetMapItems("none");
                    items = new JavaScriptSerializer().Serialize(mapItems);
                    break;
                case "Shop":
                    List<Product> products = ProductOps.GetProducts();
                    items = new JavaScriptSerializer().Serialize(products);
                    break;
            }

            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(items);

            return response;
        }
    }
}