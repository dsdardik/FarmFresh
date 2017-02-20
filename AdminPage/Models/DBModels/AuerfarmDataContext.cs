using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace AdminPage.Models.DBModels
{
    public class AuerfarmDataContext : DbContext
    {
        public AuerfarmDataContext() : base("AuerfarmDataContext")
        {

        }
        public DbSet<FarmInfoItem> InfoItems { get; set; }
        public DbSet<MapItem> MapItems { get; set; }
    }
}