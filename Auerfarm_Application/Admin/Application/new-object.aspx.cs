using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
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
            String imgPath = marker_image.PostedFile.FileName;
            String imgName = Path.GetFileName(imgPath);
            String ext = Path.GetExtension(imgName);
            double x = Convert.ToDouble(string.IsNullOrEmpty(Hidden1.Value) ? "0" : Hidden1.Value);
            double y = Convert.ToDouble(string.IsNullOrEmpty(Hidden2.Value) ? "0" : Hidden2.Value);
            String objType = object_type_select.Value;
            String objDesc = object_desc.Value;

            //if no label on page, don't execute insert
            if (x == 0)
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), 
                    "coordCheck", "alert('Please place a marker on the map');", true);
            }

            //if marker extension is not null and not jpg or png, alert user and don't execute insert
            else if ( !( (String.IsNullOrEmpty(ext)) || (String.Equals(ext, ".jpg") || String.Equals(ext, ".png")) ) )
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(),
                    "imgCheck", "alert('Please only upload a .jpg or .png image file');", true);
            }
            //if marker is not named, don't execute insert
            else if (String.IsNullOrEmpty(label))
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "labelCheck", 
                    "alert('Please give the marker a label');", true);
            }

            else
            {
                string query = "INSERT INTO marker_table (marker_label, x_coordinate, y_coordinate, marker_type, marker_image, marker_desc) VALUES (@marker_label, @x_coordinate, @y_coordinate, @marker_type, @marker_image, @marker_desc)";
                SqlCommand myCommand = new SqlCommand(query, conn);
                myCommand.Parameters.AddWithValue("@marker_label", label);
                myCommand.Parameters.AddWithValue("@x_coordinate", x);
                myCommand.Parameters.AddWithValue("@y_coordinate", y);
                myCommand.Parameters.AddWithValue("@marker_type", objType);
                    if (String.IsNullOrEmpty(ext))
                    {
                    byte[] nullBin = new byte[0];
                        myCommand.Parameters.AddWithValue("@marker_image", nullBin);
                    }
                    else
                    {
                    Stream fs = marker_image.PostedFile.InputStream;
                    BinaryReader br = new BinaryReader(fs);
                    Byte[] bytes = br.ReadBytes((Int32)fs.Length);
                    myCommand.Parameters.AddWithValue("@marker_image", bytes);
                    }
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