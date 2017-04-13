using AdminPage.DAL;
using AdminPage.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminPage.Controllers
{
    public class FarmInfoController : Controller
    {
        // GET: FarmInfo
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddInfoItem(FarmInfoItem item)
        {
            try
            {
                InfoItemOps.AddInfoItem(item);
                return Json("success");
            }
            catch (Exception e)
            {
                return Json("error");
            }
        }

        [HttpPost]
        public ActionResult UpdateInfoItem(FarmInfoItem item)
        {
            try
            {
                InfoItemOps.UpdateInfoItem(item);
                return Json(item.Id.ToString());
            }
            catch (Exception e)
            {
                return Json("error");
            }
        }

        [HttpPost]
        public ActionResult RemoveInfoItem(int id)
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult LoadInfoItems(string type)
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult AddMapObject(MapItem item)
        {
            try
            {
                MapItemOps.AddMapItem(item);
                return Json("Success");
            }
            catch(Exception e)
            {
                return Json("error");
            }
        }
    }
}