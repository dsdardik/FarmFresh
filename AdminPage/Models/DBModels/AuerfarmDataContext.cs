using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Configuration;

namespace AdminPage.Models.DBModels
{
    public class AuerfarmDataContext : DbContext
    {
        public AuerfarmDataContext() : base("AuerfarmDataContext")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<AuerfarmDataContext, Migrations.Configuration>("AuerfarmDataContext"));
        }
        public DbSet<FarmInfoItem> InfoItems { get; set; }
        public DbSet<MapItem> MapItems { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}