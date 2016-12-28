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

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_new_object_clicked(object sender, EventArgs e)
        {

            //Create connection string, grab data from page and store in local variables
            string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
            SqlConnection conn = new SqlConnection(connection_string);
            String label = map_label.Value;
            double x = Convert.ToDouble(string.IsNullOrEmpty(Hidden1.Value) ? "0" : Hidden1.Value);
            double y = Convert.ToDouble(string.IsNullOrEmpty(Hidden2.Value) ? "0" : Hidden2.Value);
            String objType = object_type_select.Value;
            String objDesc = object_desc.Value;

            //Check if there is already a label with the same name, 
            //if so don't execute insert statement
            int amt;
            using (var con = new SqlConnection(connection_string))
            {
                var sql = "SELECT COUNT(*) FROM marker_table WHERE marker_Label = @Label";
                using (var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@Label", label);
                    con.Open();
                    amt = (int)cmd.ExecuteScalar();
                }
            }

            //if no label on page, don't execute insert
            if (x == 0)
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "coordCheck", "alert('Please place a marker on the map');", true);
            }

            //if marker is not named, don't execute insert
            else if (String.IsNullOrEmpty(label))
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "labelCheck", "alert('Please give the marker a label');", true);
            }

            //if there is a marker with this name, don't execute insert
            else if (amt > 0)
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "labelUniqueCheck", "alert('Please give the marker a unique label');", true);
            }

            //finally, if passes stipulations, execute the insert statement
            else
            {
                string query = "INSERT INTO marker_table (marker_Label, x_coordinate, y_coordinate, marker_type, marker_image, marker_desc) VALUES (@marker_Label, @x_coordinate, @y_coordinate, @marker_type, @marker_image, @marker_desc)";
                SqlCommand myCommand = new SqlCommand(query, conn);
                myCommand.Parameters.AddWithValue("@marker_Label", label);
                myCommand.Parameters.AddWithValue("@x_coordinate", x);
                myCommand.Parameters.AddWithValue("@y_coordinate", y);
                myCommand.Parameters.AddWithValue("@marker_type", objType);
                myCommand.Parameters.AddWithValue("@marker_image", DBNull.Value);
                myCommand.Parameters.AddWithValue("@marker_desc", objDesc);
                try
                {
                    conn.Open();
                    myCommand.ExecuteNonQuery();
                }
                catch (Exception error)
                {
                    Console.WriteLine("Error: " + error.ToString());
                }
                Server.Transfer("map-objects.aspx");
            }
        }
    }
}