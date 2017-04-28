using AdminPage.DAL;
using AdminPage.Models.DBModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminPage.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult LoadNews()
        {
            List<FarmInfoItem> model = InfoItemOps.GetInfoItems("news");
            return PartialView("NewsPartial", model);
        }

        public ActionResult LoadCalendar()
        {
            List<FarmInfoItem> model = InfoItemOps.GetInfoItems("calendar").OrderBy(i => i.Date).ToList();
            return PartialView("CalendarPartial", model);
        }

        public ActionResult LoadMap()
        {
            return PartialView("MapPartial");
        }

        public ActionResult LoadMapList(string filter)
        {
            List<MapItem> model = MapItemOps.GetMapItems(filter);
            return PartialView("MapListPartial", model);
        }

        [HttpPost]
        public string GetMapObjects(string filter)
        {
            try
            {
                List<MapItem> items = MapItemOps.GetMapItems(filter);
                return JsonConvert.SerializeObject(items);
            }
            catch(Exception e)
            {
                return "error";
            }
        }

        public ActionResult LoadShop()
        {
            List<Product> model = ProductOps.GetProducts();
            return PartialView("ShopPartial", model);
        }

        public ActionResult LoadItem()
        {
            return PartialView("ItemPartial");
        }

        public ActionResult LoadEditItem(int id)
        {
            List<FarmInfoItem> model = new List<FarmInfoItem>();
            FarmInfoItem item = InfoItemOps.FindInfoItem(id);
            model.Add(item);
            return PartialView("EditItemPartial", model);
        }

        public ActionResult LoadProduct()
        {
            return PartialView("ProductPartial");
        }

        public ActionResult LoadEditProduct(int id)
        {
            List<Product> model = new List<Product>();
            Product item = ProductOps.FindProduct(id);
            model.Add(item);
            return PartialView("EditProductPartial", model);
        }

    }
}