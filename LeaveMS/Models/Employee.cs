using System;
using System.Collections.Generic;

#nullable disable

namespace LeaveMS.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Leaves = new HashSet<Leave>();
        }

        public int Empid { get; set; }
        public string EmpName { get; set; }
        public string Email { get; set; }
        public int LeavesInHand { get; set; }
        //public bool? Leavestatus { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string Location { get; set; }

        public virtual ICollection<Leave> Leaves { get; set; }
    }
}
