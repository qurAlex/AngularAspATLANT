using AngularAspATLANT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularAspATLANT.Server
{
    public class StoreContext:DbContext
    {
        public DbSet<Storekeeper> Storekeepers { get; set; }
        public DbSet<Detail> Details { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Atlant;Integrated Security=True");
        }
    }
}
