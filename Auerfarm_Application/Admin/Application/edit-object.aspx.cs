using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auerfarm_Application.Admin.Anders
{
    public partial class edit_object : System.Web.UI.Page
    {
        String imageCheck;
        protected void Page_Load(object sender, EventArgs e)
        {
            marker_image.Visible = false;

            if (!IsPostBack)
            {
                //int markerID = Convert.ToInt32(Request.QueryString["markerID"]);
                DataTable dt = new DataTable();
                string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
                SqlConnection conn = new SqlConnection(connection_string);
                using (SqlCommand cmd = new SqlCommand("SELECT id=marker_id, title=marker_label," +
                    "lat=x_coordinate,lng=y_coordinate, iconimg=marker_type, description=marker_desc," +
                    "mimg=marker_image FROM marker_table WHERE marker_id=" + Request.QueryString["markerID"], conn))
                {
                    conn.Open();
                    SqlDataReader reader;
                    reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        map_label.Value = reader[1].ToString();
                        Hidden1.Value = reader[2].ToString();
                        Hidden2.Value = reader[3].ToString();
                        object_type_select.Value = reader[4].ToString();
                        object_desc.Value = reader[5].ToString();
                        imageCheck = reader[6].ToString();
                    }
                }
            }
        }

        protected void EditImg_CheckedChanged(object sender, EventArgs e)
        {
            if (EditImg.Checked)
            {
                DeleteImg.Checked = false;
                SameImg.Checked = false;
                marker_image.Visible = true;
            }

            if (!EditImg.Checked)
            {
                marker_image.Visible = false;
            }
        }

        protected void DeleteImg_CheckedChanged(object sender, EventArgs e)
        {
            if (DeleteImg.Checked)
            {
                EditImg.Checked = false;
                SameImg.Checked = false;
                marker_image.Visible = false;
            }
        }

        protected void SameImg_CheckedChanged(object sender, EventArgs e)
        {
            if (SameImg.Checked)
            {
                EditImg.Checked = false;
                DeleteImg.Checked = false;
                marker_image.Visible = false;
            }
        }

        protected void update_object_clicked(object sender, EventArgs e)
        {
            //Create connection string, grab data from page and store in local variables
            string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
            SqlConnection conn = new SqlConnection(connection_string);
            String label = map_label.Value;
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

            //if marker is not named, don't execute insert
            else if (String.IsNullOrEmpty(label))
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(), "labelCheck",
                    "alert('Please give the marker a label');", true);
            }

            else
            {
                string query = "UPDATE marker_table SET marker_label = @marker_label, "
                    + "x_coordinate = @x_coordinate, " +
                    "y_coordinate = @y_coordinate, " +
                    "marker_type = @marker_type, " +
                    "marker_image = @marker_image, " +
                    "marker_desc = @marker_desc " +
                    "WHERE marker_id = @marker_id";

                SqlCommand myCommand = new SqlCommand(query, conn);
                myCommand.Parameters.AddWithValue("@marker_label", label);
                myCommand.Parameters.AddWithValue("@x_coordinate", x);
                myCommand.Parameters.AddWithValue("@y_coordinate", y);
                myCommand.Parameters.AddWithValue("@marker_type", objType);
                myCommand.Parameters.AddWithValue("@marker_id", Request.QueryString["markerID"]);
                myCommand.Parameters.AddWithValue("@marker_desc", objDesc);

                if (DeleteImg.Checked)
                {
                    myCommand.Parameters.AddWithValue("@marker_image", DBNull.Value);
                }
                else if (SameImg.Checked)
                {
                    myCommand.Parameters.AddWithValue("@marker_image", imageCheck);
                }
                else if (EditImg.Checked)
                {
                    String imgPath = marker_image.PostedFile.FileName;
                    String imgName = Path.GetFileName(imgPath);
                    String ext = Path.GetExtension(imgName);
                    //if marker extension is not null and not jpg or png, alert user and don't execute insert
                    if (!((String.IsNullOrEmpty(ext)) || (String.Equals(ext, ".jpg") || String.Equals(ext, ".png"))))
                    {
                        Page.ClientScript.RegisterStartupScript(this.GetType(),
                            "imgCheck", "alert('Please only upload a .jpg or .png image file');", true);
                        return;
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
                        catch (Exception ex)
                        {
                            Console.Write(ex.Message);
                        }
                    }
                }
                else
                {
                    Page.ClientScript.RegisterStartupScript(this.GetType(),
    "imgCheck2", "alert('Please select one of the checkboxes to decide what to do with the current image');", true);
                    return;
                }

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

        protected void delete_object_clicked(object sender, EventArgs e)
        {
            string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
            SqlConnection conn = new SqlConnection(connection_string);
            string query = "DELETE FROM marker_table WHERE marker_id= @marker_id";
            SqlCommand myCommand = new SqlCommand(query, conn);
            myCommand.Parameters.AddWithValue("@marker_id", Request.QueryString["markerID"]);
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