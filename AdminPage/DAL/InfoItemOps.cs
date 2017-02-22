using AdminPage.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminPage.DAL
{
    public static class InfoItemOps
    {
        public static void AddInfoItem(FarmInfoItem input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                db.InfoItems.Add(input);
                db.SaveChanges();
            }
        }

        public static void UpdateInfoItem(FarmInfoItem input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                FarmInfoItem itemToChange = db.InfoItems.Where(i => i.Id == input.Id).FirstOrDefault();
                itemToChange.Title = input.Title;
                itemToChange.Date = input.Date;
                itemToChange.Description = input.Description;
                itemToChange.StartDate = input.StartDate;
                itemToChange.EndDate = input.EndDate;
                db.SaveChanges();
            }
        }

        public static List<FarmInfoItem> GetInfoItems(string type)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                List<FarmInfoItem> items = db.InfoItems.Where(i => i.Type == type).OrderByDescending(i => i.Id).ToList();
                return items;
            }
        }
    }
}