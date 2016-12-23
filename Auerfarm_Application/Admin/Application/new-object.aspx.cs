using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auerfarm_Application.Admin.Anders
{
    public partial class new_object : System.Web.UI.Page
    {
        float x;
        float y;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_new_object_clicked(object sender, EventArgs e)
        {
            string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
            SqlConnection conn = new SqlConnection(connection_string);
            
                string query = "INSERT INTO marker_table (marker_Label, x_coordinate, y_coordinate, marker_type, marker_image, marker_desc) VALUES (@marker_Label, @x_coordinate, @y_coordinate, @marker_type, @marker_image, @marker_desc)";
                SqlCommand myCommand = new SqlCommand(query, conn);
                myCommand.Parameters.AddWithValue("@marker_Label", map_label.Value);
                myCommand.Parameters.AddWithValue("@x_coordinate", Hidden1.Value);
                myCommand.Parameters.AddWithValue("@y_coordinate", Hidden2.Value);
                myCommand.Parameters.AddWithValue("@marker_type", object_type_select.Value);
                myCommand.Parameters.AddWithValue("@marker_image", DBNull.Value);
                myCommand.Parameters.AddWithValue("@marker_desc", object_desc.Value);
            try
            {
                conn.Open();
                myCommand.ExecuteNonQuery();
            }
            catch(Exception error)
            {
                Console.WriteLine("Error: " + error.ToString());
            }
            Server.Transfer("map-objects.aspx");
        }
    }
}