using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace LeaveMS.Models
{
    public partial class LMSoneContext : DbContext
    {
        public LMSoneContext()
        {
        }

        public LMSoneContext(DbContextOptions<LMSoneContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Leave> Leaves { get; set; }
        public virtual DbSet<Login> Logins { get; set; }
        public virtual DbSet<Manager> Managers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
   //             optionsBuilder.UseSqlServer("Server=10.3.117.39;Database=LMSone;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Empid);

                entity.ToTable("Employee");

                entity.Property(e => e.Empid).HasColumnName("empid");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("department");

                entity.Property(e => e.Designation)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("designation");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EmpName)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("empName");

                entity.Property(e => e.LeavesInHand).HasColumnName("leavesInHand");

                entity.Property(e => e.Location)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("location");
            });

            modelBuilder.Entity<Leave>(entity =>
            {
                entity.ToTable("Leave");

                entity.Property(e => e.Leaveid).HasColumnName("leaveid");

                entity.Property(e => e.EmpId).HasColumnName("empId");

                entity.Property(e => e.FromDate)
                    .HasColumnType("date")
                    .HasColumnName("fromDate");

                entity.Property(e => e.LeaveDescription)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("leaveDescription");

                entity.Property(e => e.LeaveType)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("leaveType");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.NoOfDays).HasComputedColumnSql("((((datediff(day,[fromDate],[toDate])-datediff(week,[fromDate],[toDate])*(2))-case when datepart(weekday,[fromDate])=(1) then (1) else (0) end)+case when datepart(weekday,[toDate])=(1) then (1) else (0) end)+(1))", false);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .HasDefaultValueSql("('pending')");

                entity.Property(e => e.ToDate)
                    .HasColumnType("date")
                    .HasColumnName("toDate");

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.Leaves)
                    .HasForeignKey(d => d.EmpId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_Employee_1");

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.Leaves)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_manager_1");
            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.ToTable("Login");

                entity.Property(e => e.LoginId).ValueGeneratedNever();

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Manager>(entity =>
            {
                entity.ToTable("Manager");

                entity.Property(e => e.ManagerId).HasColumnName("managerId");

                entity.Property(e => e.MName)
                    .IsRequired()
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .HasColumnName("mName");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
