using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
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
                errorLabel.Text = "Please place a marker on the map";
                errorLabel.BackColor = Color.Red;
                errorLabel.Visible = true;
                return;
            }

            //if marker extension is not null and not jpg or png, alert user and don't execute insert
            else if ( !( (String.IsNullOrEmpty(ext)) || (String.Equals(ext, ".jpg") || String.Equals(ext, ".png")) ) )
            {
                errorLabel.Text = "Please only upload a .jpg or .png image file";
                errorLabel.BackColor = Color.Red;
                errorLabel.Visible = true;
                return;
            }
            //if marker is not named, don't execute insert
            else if (String.IsNullOrEmpty(label))
            {
                errorLabel.Text = "Please give the marker a label";
                errorLabel.BackColor = Color.Red;
                errorLabel.Visible = true;
                return;
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
                        myCommand.Parameters.AddWithValue("@marker_image", DBNull.Value);
                    }
                    else
                    {
                        try
                        {
                        String fileName = marker_image.FileName;
                        String path = Server.MapPath("~/Images/" + fileName);
                        string tempfileName = "";

                        // Check to see if a file already exists with the
                        // same name as the file to upload.        
                        if (System.IO.File.Exists(path))
                        {
                            int counter = 2;
                            while (System.IO.File.Exists(path))
                            {
                                // if a file with this name already exists,
                                // prefix the filename with a number.
                                tempfileName = counter.ToString() + fileName;
                                path = Server.MapPath("~/Images/") + tempfileName;
                                counter++;
                            }

                            fileName = tempfileName;
                        }

                        path = Server.MapPath("~/Images/" + fileName);
                        marker_image.PostedFile.SaveAs(path);
                        myCommand.Parameters.AddWithValue("@marker_image", fileName);
                    }
                        catch(Exception ex)
                        {
                            Console.Write(ex.Message);
                        }
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