using Backend.DTO;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<Supplier>> GetAllSuppliersAsync();
        Task<Supplier?> GetSupplierByIdAsync(int id);
        Task<Supplier> AddSupplierAsync(SupplierDTO model);
        Task<Supplier?> UpdateSupplierAsync(int id, SupplierDTO model);
        Task<Supplier?> DeleteSupplierAsync(int id);
    }
}
