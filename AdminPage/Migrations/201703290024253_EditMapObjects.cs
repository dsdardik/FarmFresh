namespace AdminPage.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditMapObjects : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.MapItems", "Long", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.MapItems", "Lat", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.MapItems", "Lat", c => c.Int(nullable: false));
            AlterColumn("dbo.MapItems", "Long", c => c.Int(nullable: false));
        }
    }
}
