using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Auerfarm_Application.Admin.Anders
{
    public partial class map_objects : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        // This method is used to convert datatable to json string
        public string ConvertDataTabletoString()
        {
            DataTable dt = new DataTable();
            string connection_string = "Server=OWNERPC;Database=Auerfarm;Trusted_Connection=true";
            SqlConnection conn = new SqlConnection(connection_string);
            using (SqlCommand cmd = new SqlCommand("SELECT id=marker_id, title=marker_label,lat=x_coordinate," +
                "lng=y_coordinate, iconimg=marker_type, description=marker_desc," +
                "mimg = marker_image FROM marker_table", conn))
            {
                conn.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
                return serializer.Serialize(rows);
            }
        }
        protected void edit_marker_clicked(object sender, EventArgs e)
        {
            if (String.IsNullOrEmpty(Hidden1.Value))
            {
                Page.ClientScript.RegisterStartupScript(this.GetType(),
                    "selectCheck", "alert('You must select a marker by clicking on it to edit it's contents');", true);
            }
            else
            {
                Response.Redirect("edit-object.aspx?markerID=" + Hidden1.Value);
            }
        }
    }
}