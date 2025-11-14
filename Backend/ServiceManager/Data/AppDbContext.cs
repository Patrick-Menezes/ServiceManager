using Microsoft.EntityFrameworkCore;
using ServiceManager.Model;
using System.Security.Cryptography.X509Certificates;

namespace ServiceManager.Data;

    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions options) : base(options) { }

        

            public DbSet<OrderService> orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Salvar Enum como string
        modelBuilder
            .Entity<OrderService>()
            .Property(o => o.Status)
            .HasConversion<string>();

        base.OnModelCreating(modelBuilder);
    }


}


    

