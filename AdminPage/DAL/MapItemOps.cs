using AdminPage.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminPage.DAL
{
    public static class MapItemOps
    {
        public static void AddMapItem(MapItem input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                MapItem target = db.MapItems.Where(i => i.Id == input.Id).FirstOrDefault() ?? null;
                if (target == null)
                {
                    db.MapItems.Add(input);
                    db.SaveChanges();
                }
                else
                {
                    target.Name = input.Name;
                    target.Description = input.Description;
                    target.Type = input.Type;
                    if(input.Long != null)
                       target.Long = input.Long;
                    if (input.Lat != null)
                        target.Lat = input.Lat;
                    target.Active = input.Active;
                    db.SaveChanges();
                }
            }
        }

        public static List<MapItem> GetMapItems()
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                return db.MapItems.ToList();
            }
        }
    }
}