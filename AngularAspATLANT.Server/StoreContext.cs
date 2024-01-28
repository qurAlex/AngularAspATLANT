using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AngularAspATLANT.Server;

public partial class StoreContext : DbContext
{
    public StoreContext()
    {
    }

    public StoreContext(DbContextOptions<StoreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Detail> Details { get; set; }

    public virtual DbSet<Storekeeper> Storekeepers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Atlant;Integrated Security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Detail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Details__3214EC279907EE8C");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.DateCreate).HasColumnName("dateCreate");
            entity.Property(e => e.DateDelete).HasColumnName("dateDelete");
            entity.Property(e => e.ItemCode)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("itemCode");
            entity.Property(e => e.ItemName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("itemName");
            entity.Property(e => e.StorekeeperId).HasColumnName("storekeeperId");

            entity.HasOne(d => d.Storekeeper).WithMany(p => p.Details)
                .HasForeignKey(d => d.StorekeeperId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_storekeeperId");
        });

        modelBuilder.Entity<Storekeeper>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Warehous__3214EC27462988A5");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.FullName)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("fullName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
