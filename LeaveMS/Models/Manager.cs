using System;
using System.Collections.Generic;

#nullable disable

namespace LeaveMS.Models
{
    public partial class Manager
    {
        public Manager()
        {
            Leaves = new HashSet<Leave>();
        }

        public int ManagerId { get; set; }
        public string MName { get; set; }

        public virtual ICollection<Leave> Leaves { get; set; }
    }
}
