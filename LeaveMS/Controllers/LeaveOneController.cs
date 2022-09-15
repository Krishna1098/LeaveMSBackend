using LeaveMS.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LeaveMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveOneController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public LeaveOneController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
                            select LeaveId,EmpId,ManagerId,convert(varchar(10),FromDate,120) as FromDate,convert(varchar(10),ToDate,120) as ToDate,LeaveType,LeaveDescription,NoOfDays,Status 
                            from 
                            dbo.Leave 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Leave lms)
        {
            string query = @" 
                           insert into dbo.Leave 
                           (EmpId,ManagerId,FromDate,ToDate,LeaveType,LeaveDescription) 
                    values (@EmpId,@ManagerId,@FromDate,@ToDate,@LeaveType,@LeaveDescription) 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    // myCommand.Parameters.AddWithValue("@LeaveID", lms.Leaveid); 
                    myCommand.Parameters.AddWithValue("@EmpId", lms.EmpId);
                    myCommand.Parameters.AddWithValue("@ManagerId", lms.ManagerId);
                    myCommand.Parameters.AddWithValue("@FromDate", lms.FromDate);
                    myCommand.Parameters.AddWithValue("@ToDate", lms.ToDate);
                    myCommand.Parameters.AddWithValue("@LeaveType", lms.LeaveType);
                    myCommand.Parameters.AddWithValue("@LeaveDescription", lms.LeaveDescription);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Leave lms)
        {
            string query = @" 
                           update dbo.Leave 
                           set EmpId=@EmpId,ManagerId=@ManagerId,FromDate=@FromDate,ToDate=@ToDate,LeaveType=@LeaveType,LeaveDescription=@LeaveDescription 
                           where LeaveId=@LeaveID 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LeaveID", lms.Leaveid);
                    myCommand.Parameters.AddWithValue("@EmpId", lms.EmpId);
                    myCommand.Parameters.AddWithValue("@ManagerId", lms.ManagerId);
                    myCommand.Parameters.AddWithValue("@FromDate", lms.FromDate);
                    myCommand.Parameters.AddWithValue("@ToDate", lms.ToDate);
                    myCommand.Parameters.AddWithValue("@LeaveType", lms.LeaveType);
                    myCommand.Parameters.AddWithValue("@LeaveDescription", lms.LeaveDescription);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpPut("{ManId}")]
        public JsonResult PutByManId(Leave lms)
        {
            string query = @" 
                           update dbo.Leave 
                           set EmpId=@EmpId,ManagerId=@ManagerId,LeaveType=@LeaveType,LeaveDescription=@LeaveDescription,Status=@Status 
                           where LeaveId=@LeaveID 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LeaveID", lms.Leaveid);
                    myCommand.Parameters.AddWithValue("@EmpId", lms.EmpId);
                    myCommand.Parameters.AddWithValue("@ManagerId", lms.ManagerId);
/*                    myCommand.Parameters.AddWithValue("@FromDate", lms.FromDate);
                    myCommand.Parameters.AddWithValue("@ToDate", lms.ToDate);*/
                    myCommand.Parameters.AddWithValue("@LeaveType", lms.LeaveType);
                    myCommand.Parameters.AddWithValue("@LeaveDescription", lms.LeaveDescription);
                    myCommand.Parameters.AddWithValue("@Status", lms.Status);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Acknowledgement Sent Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @" 
                            delete from dbo.Leave where LeaveId=@LeaveId 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LeaveID", id);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


    }
}
