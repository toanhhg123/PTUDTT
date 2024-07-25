using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class AppDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<UserAddress> UserAddress { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>()
                .HasKey(od => new { od.OrderId, od.ProductId });

            modelBuilder.Entity<OrderDetail>()
           .HasOne(od => od.Order)
           .WithMany(o => o.OrderDetails)
           .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany(p => p.OrderDetails)
                .HasForeignKey(od => od.ProductId);

            modelBuilder.Entity<PurchaseOrderDetail>()
               .HasKey(od => new { od.PurchaseOrderId, od.ProductId });

            modelBuilder.Entity<PurchaseOrderDetail>()
           .HasOne(od => od.PurchaseOrder)
           .WithMany(o => o.PurchaseOrderDetails)
           .HasForeignKey(od => od.PurchaseOrderId);

            modelBuilder.Entity<PurchaseOrderDetail>()
                .HasOne(od => od.Product)
                .WithMany(p => p.PurchaseOrderDetails)
                .HasForeignKey(od => od.ProductId);


            base.OnModelCreating(modelBuilder);
        }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }


    }
}
