using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AdminPage.Models.DBModels
{
    [Table("MapItem")]
    public class MapItem
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Long { get; set; }
        public string Lat { get; set; }
        public string Image { get; set; }
        public bool Active { get; set; }
    }
}