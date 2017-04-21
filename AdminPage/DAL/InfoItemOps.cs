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
                input.Date = input.Date ?? DateTime.Now;
                input.StartDate = input.StartDate ?? DateTime.Now;
                input.EndDate = input.EndDate ?? DateTime.MaxValue;

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
                itemToChange.Date = input.Date ?? DateTime.Now;
                itemToChange.Description = input.Description;
                itemToChange.StartDate = input.StartDate ?? DateTime.Now;
                itemToChange.EndDate = input.EndDate ?? DateTime.MaxValue;
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