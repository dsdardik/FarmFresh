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
                item.Price = input.Price;
                item.Image = input.Image;
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
    }
}