using Backend.DTO;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly AppDbContext _context;

        public SupplierRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier?> GetSupplierByIdAsync(int id)
        {
            return await _context.Suppliers.FindAsync(id);
        }

        public async Task<Supplier> AddSupplierAsync(SupplierDTO model)
        {
            var newSupplier = new Supplier
            {
                SupplierName = model.SupplierName,
                Address = model.Address,
                Email = model.Email,
                Phone = model.Phone,
                Note = model.Note
            };

            _context.Suppliers.Add(newSupplier);
            await _context.SaveChangesAsync();

            return newSupplier;
        }

        public async Task<Supplier?> UpdateSupplierAsync(int id, SupplierDTO model)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return null;
            }

            supplier.SupplierName = model.SupplierName;
            supplier.Address = model.Address;
            supplier.Email = model.Email;
            supplier.Phone = model.Phone;
            supplier.Note = model.Note;

            _context.Suppliers.Update(supplier);
            await _context.SaveChangesAsync();

            return supplier;
        }

        public async Task<Supplier?> DeleteSupplierAsync(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return null;
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return supplier;
        }

    }
}
