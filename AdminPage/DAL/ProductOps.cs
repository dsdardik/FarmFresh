using AdminPage.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminPage.DAL
{
    public static class ProductOps
    {
        public static void AddProduct(Product input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                input.Date = input.Date ?? DateTime.Now;
                input.Image = input.Image ?? "rafi-filler-pic.jpg";
                db.Products.Add(input);
                db.SaveChanges();
            }
        }

        public static void UpdateProduct(Product input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                Product item = db.Products.Where(i => i.Id == input.Id).FirstOrDefault();
                item.Name = input.Name;
                item.Description = input.Description;
                item.Date = input.Date ?? DateTime.Now;
                item.Price = input.Price;
                input.Image = input.Image ?? "rafi-filler-pic.jpg";
                db.SaveChanges();
            }
        }

        public static List<Product> GetProducts()
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                return db.Products.OrderBy(i => i.Name).ToList();
            }
        }

        public static bool DeleteProduct(Product input)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                Product item = db.Products.Where(i => i.Id == input.Id).FirstOrDefault();
                db.Products.Remove(item);
                db.SaveChanges();
                return true;
            }
        }

        public static Product FindProduct(int Id)
        {
            using (AuerfarmDataContext db = new AuerfarmDataContext())
            {
                return db.Products.Where(i => i.Id == Id).FirstOrDefault();
            }
        }
    }
}