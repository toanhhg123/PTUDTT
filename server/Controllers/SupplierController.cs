using Backend.Config.Base;
using Backend.DTO;
using Backend.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("supplier")]
    [ApiController]
    public class SupplierController : ControllerProvider
    {
        private readonly ISupplierRepository _supplierRepo;

        public SupplierController(ISupplierRepository supplierRepo)
        {
            _supplierRepo = supplierRepo;
        }

        // Get all suppliers
        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            var suppliers = await _supplierRepo.GetAllSuppliersAsync();
            return this.OnSuccess(suppliers);
        }

        // Get supplier by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplierById(int id)
        {
            var supplier = await _supplierRepo.GetSupplierByIdAsync(id);
            if (supplier == null)
            {
                return this.OnError<string>("Supplier not found.");
            }

            return this.OnSuccess(supplier);
        }

        // Add a new supplier
        [HttpPost]
        public async Task<IActionResult> AddSupplier([FromBody] SupplierDTO model)
        {
            try
            {
                var newSupplier = await _supplierRepo.AddSupplierAsync(model);
                return this.OnSuccess(newSupplier);
            }
            catch (Exception ex)
            {
                return this.OnError<string>(ex.Message);
            }
        }

        // Update an existing supplier
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id, [FromBody] SupplierDTO model)
        {
            try
            {
                var updatedSupplier = await _supplierRepo.UpdateSupplierAsync(id, model);
                if (updatedSupplier == null)
                {
                    return this.OnError<string>("Supplier not found or unable to update.");
                }

                return this.OnSuccess(updatedSupplier);
            }
            catch (Exception ex)
            {
                return this.OnError<string>(ex.Message);
            }
        }

        // Delete a supplier
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var deletedSupplier = await _supplierRepo.DeleteSupplierAsync(id);
            if (deletedSupplier == null)
            {
                return this.OnError<string>("Supplier not found or unable to delete.");
            }

            return this.OnSuccess(deletedSupplier);
        }
    }
}
