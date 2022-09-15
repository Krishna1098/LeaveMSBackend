using System;
using System.Collections.Generic;

#nullable disable

namespace LeaveMS.Models
{
    public partial class Leave
    {
        public int Leaveid { get; set; }
        public int EmpId { get; set; }
        public int ManagerId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string LeaveType { get; set; }
        public string LeaveDescription { get; set; }
        public int? NoOfDays { get; set; }
        public string Status { get; set; }

        public virtual Employee Emp { get; set; }
        public virtual Manager Manager { get; set; }
    }
}
